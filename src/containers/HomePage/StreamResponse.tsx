import type { JobSuitabilitySchema } from '@/schemas/schemas';
import { Box } from '@mantine/core';
import { uuid } from '@tanstack/react-form';

export const StreamResponse = ({ jobSuitability }: { jobSuitability: JobSuitabilitySchema }) => {
  return (
    <Box>
      {Object.entries(jobSuitability).map(([key, value]) => {
        return (
          <Box key={uuid()} style={{ maxWidth: '800px', marginBottom: '1rem' }}>
            {<b>{key}: </b>}
            {(typeof value === 'string' || typeof value === 'number') && <span>{value}</span>}
          </Box>
        );
      })}
    </Box>
  );
};
