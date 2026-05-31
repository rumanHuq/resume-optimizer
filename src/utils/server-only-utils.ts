'use server';

import type { AiModel } from '@/constants/constants';
import { SYSTEM_PROMPT, aiModels } from '@/constants/constants';
import { jobSuitabilitySchema } from '@/schemas/schemas';
import { createOpenRouter } from '@openrouter/ai-sdk-provider';
import { streamObject } from 'ai';
import { ollama } from 'ollama-ai-provider-v2';

const openrouter = createOpenRouter({ apiKey: process.env.OPEN_ROUTER_SDK_KEY });

export function aiResponse(aiModel: AiModel, linkedInJobPageMarkdown: string, cvMarkDown: string) {
  const userPrompt = `Job Advertisement: ${linkedInJobPageMarkdown}.
Candidate CV: ${cvMarkDown}.`;
  const resp = streamObject({
    model:
      aiModel === 'ministral-3:3b-instruct-2512-q4_K_M'
        ? ollama('ministral-3:3b-instruct-2512-q4_K_M')
        : openrouter(aiModel),
    schema: jobSuitabilitySchema,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: userPrompt },
    ],
    onError(event) {
      console.log(event.error);
      new Response('AI response got some error', { status: 500 });
    },
    providerOptions: { gateway: { models: [...aiModels] } },
  });

  return resp.toTextStreamResponse();
}
