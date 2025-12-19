import { aiModels } from '@/constants/constants';
import { getJobId } from '@/utils/utils';
import { z } from 'zod';

export const cvPdfSchema = z.object({
  file: z.instanceof(File, { message: 'File is required' }).refine((f) => f.size > 0, 'File cannot be empty'),
});
export const linkedinJobUrlSchema = z.url().refine(
  (link) => {
    if (typeof link !== 'string') return false;
    const jobId = getJobId(link);
    if (jobId === null || !/^\d+$/.test(jobId)) return false;

    return true;
  },
  { message: 'Invalid LinkedIn job URL' },
);

export const cvAnalyzerformSchema = z.object({
  cvPDF: z.instanceof(File),
  linkedJobUrl: linkedinJobUrlSchema,
  aiModel: z.enum(aiModels),
});

const MatchingCriterionSchema = z.object({
  criterion: z.string(),
  matchLevel: z.enum(['Full', 'Partial', 'None']),
  evidenceFromCV: z.string(),
});

export const jobSuitabilitySchema = z.object({
  overallSuitabilityPercentage: z.number().min(0).max(100),
  overallSuitabilityReason: z.string(),
  matchingCriteria: z.array(MatchingCriterionSchema),
  missingCriteria: z.array(z.string().length(80)),
  atsCompatibilityPercentage: z.number().min(0).max(100),
  atsCompatibilityReason: z.string(),
  atsStrengths: z.array(z.string()),
  atsIssues: z.array(z.string()),
  pointerForRecruiter: z.string(),
  pointerForCandidate: z.string(),
});

// Extract the TypeScript type from the schema
export type LinkedinJobUrlSchema = z.infer<typeof linkedinJobUrlSchema>;
export type CvAnalyzerformSchema = z.infer<typeof cvAnalyzerformSchema>;
export type JobSuitabilitySchema = z.infer<typeof jobSuitabilitySchema>;
