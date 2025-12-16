import pdf2md from '@opendocsg/pdf2md';
import { createServerFn } from "@tanstack/react-start";
import { Buffer } from "node:buffer";
import z from "zod";
import { resumeAnalyzerformSchema } from "./schemas/schemas";

async function fileToBase64(file: File){
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);

}

// async function generateResponse() {
//   const stream = chat({
//     adapter: ollama(),
//     messages: [
//       {
//         role: 'user',
//         content: [
//           // Text part 1: The job description and prompt
//           {
//             type: 'text',
//             text: `Analyze the attached CV/Resume against the following Job Description (JD).
//             Calculate a score from 0 to 100 based on keyword match, experience relevance, and structural alignment with the JD.
//             Job Description: ${jobDescription}`,
//           },
//           // Multimodal part: The PDF file data
//           // --- CRITICAL CORRECTION HERE: type: 'document' ---
//           {
//             type: 'document', // Correct type for documents in TanStack AI
//             mimeType: 'application/pdf',
//             source: {
//               type: 'data',
//               value: pdfBase64, // Base64 string passed to the AI SDK
//             },
//           },
//         ],
//       },
//     ],
//     model: "qwen3:8b"
//   })
// }

export const analyzeResumeServerFn = createServerFn({ method: "POST" })
  .inputValidator(r => {
    const formData = z.instanceof(FormData).parse(r)
    return resumeAnalyzerformSchema.parse({
      resumePDF: formData.get('resumePDF'),
      linkedJobUrl: formData.get('linkedJobUrl')
    })
  })
  .handler(async ({ data }) => {
    try {
      const pdfBase64 = await fileToBase64(data.resumePDF);
      // const promisedBuffer = promisify(new PdfReader().parseBuffer)
      // const pdf = await promisedBuffer(pdfBase64)
      const resumeMarkdown = await pdf2md(pdfBase64)
      return resumeMarkdown
    } catch (error) {
      console.log(error)
      return "nooo"
    }
  })
