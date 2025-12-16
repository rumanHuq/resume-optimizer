import { z } from 'zod';

export const resumeAnalyzerformSchema = z.object({ resumePDF: z.file(), linkedJobUrl: z.url() });

export type ResumeAnalyzerformSchema = z.infer<typeof resumeAnalyzerformSchema>;
