import type { JobSuitabilitySchema } from '@/schemas/schemas';
import { Box } from '@mantine/core';

export const StreamResponse = ({ jobSuitability }: { jobSuitability: JobSuitabilitySchema }) => {
  return (
    <Box>
      {Object.entries(jobSuitability).map(([key, value], idx) => {
        return (
          <Box key={idx} style={{ maxWidth: '800px', marginBottom: '1rem' }}>
            {<b>{key}: </b>}
            {(typeof value === 'string' || typeof value === 'number') && <span>{value}</span>}
          </Box>
        );
      })}
    </Box>
  );
};
