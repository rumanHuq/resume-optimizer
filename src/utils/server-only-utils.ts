'use server';
import type { AiModel } from '@/constants/constants';
import { SYSTEM_PROMPT, aiModels } from '@/constants/constants';
import { jobSuitabilitySchema } from '@/schemas/schemas';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamObject } from 'ai';
import { mkdir, rmdir } from 'node:fs/promises';
import { ollama } from 'ollama-ai-provider-v2';

const logsDir = 'logs';
export const isDev = process.env.NODE_ENV !== 'production';
const openrouter = createOpenRouter({ apiKey: process.env.OPEN_ROUTER_SDK_KEY });

async function writeLogFile(...args: Array<{ filename: string; data: string }>) {
  if (!isDev) return;

  try {
    await rmdir(logsDir, { recursive: true });
    await mkdir(logsDir, { recursive: true });
  } catch (error) {
    console.log(error);
  } finally {
    const promises = args.map(({ filename, data }) => Bun.write(`${logsDir}/${filename}`, data));
    await Promise.all(promises);
  }
}
export function aiResponse(aiModel: AiModel, linkedInJobPageMarkdown: string, cvMarkDown: string) {
  const userPrompt = `Job Advertisement: ${linkedInJobPageMarkdown}.
Candidate CV: ${cvMarkDown}.`;
  const resp = streamObject({
    model: aiModel === 'deepseek-r1:8b' ? ollama('deepseek-r1:8b') : openrouter(aiModel),
    schema: jobSuitabilitySchema,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ],
    async onFinish({ object }) {
      // create a local file with response and cvMarkDown
      if (isDev) {
        const now = Date.now();
        await writeLogFile(
          { filename: `ast_score-${now}.json`, data: JSON.stringify(object, null, 2) },
          { filename: `cvMarkDown-${now}.md`, data: cvMarkDown },
          { filename: `linkedInJobPageMarkdown-${now}.md`, data: linkedInJobPageMarkdown },
        );
      }
    },
    onError(event) {
      console.log(event.error);
      new Response('AI response got some error', { status: 500 });
    },
    providerOptions: { gateway: { models: [...aiModels] } },
  });

  return resp.toTextStreamResponse();
}
