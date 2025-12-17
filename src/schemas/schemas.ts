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

const MatchingCriterionSchema = z.object({
  criterion: z.string(),
  matchLevel: z.enum(['Full', 'Partial', 'None']),
  evidenceFromCV: z.string(),
});

export const jobSuitabilitySchema = z.object({
  overallSuitabilityPercentage: z.number().min(0).max(100),
  overallSuitabilityReason: z.string(),
  matchingCriteria: z.array(MatchingCriterionSchema),
  missingCriteria: z.array(z.string()),
  atsCompatibilityPercentage: z.number().min(0).max(100),
  atsCompatibilityReason: z.string(),
  atsStrengths: z.array(z.string()),
  atsIssues: z.array(z.string()),
  pointerForRecruiter: z.string(),
  pointerForCandidate: z.string(),
});

// Extract the TypeScript type from the schema
export type JobSuitabilitySchema = z.infer<typeof jobSuitabilitySchema>;
