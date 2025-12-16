import { getJobId } from '@/utils/utils';
import { z } from 'zod';

export const linkedinJobUrlSchema = z.url().refine(
  (link) => {
    const jobId = getJobId(link);
    if (jobId === null || !/^\d+$/.test(jobId)) return false;

    return true;
  },
  { message: 'Invalid LinkedIn job URL' },
);
export type LinkedinJobUrlSchema = z.infer<typeof linkedinJobUrlSchema>;

export const resumeAnalyzerformSchema = z.object({
  resumePDF: z.file(),
  linkedJobUrl: linkedinJobUrlSchema,
});
export type ResumeAnalyzerformSchema = z.infer<typeof resumeAnalyzerformSchema>;
