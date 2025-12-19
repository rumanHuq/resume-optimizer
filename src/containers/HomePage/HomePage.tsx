import { jobSuitabilitySchema } from '@/schemas/schemas';
import { experimental_useObject as useObject } from '@ai-sdk/react';
import { Container, Grid, Transition } from '@mantine/core';
import { CvUploadForm } from './CvUploadForm';
import { SuitabilityResult } from './SuitabilityResult';

export const HomePage = ({ env }: { env: string }) => {
  const {
    isLoading,
    object: resultData,
    submit,
  } = useObject({ api: '/api/cv-improv', schema: jobSuitabilitySchema });
  const showResults = !!resultData && Object.keys(resultData).length > 0;
  console.log(env);
  return (
    <Container size='xl' py='xl'>
      <Grid gutter='xl'>
        {/* Left Column: Form */}
        {/* Moves to side (span 4) when streaming starts, otherwise centered (span 6) */}
        <Grid.Col span={{ base: 12, md: showResults ? 4 : 6 }} offset={{ md: showResults ? 0 : 3 }}>
          <CvUploadForm onSubmit={submit} isLoading={isLoading} />
        </Grid.Col>

        {showResults && (
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Transition mounted={showResults} transition='slide-left' duration={400} timingFunction='ease'>
              {(styles) => (
                <div style={styles}>
                  {/* @ts-expect-error */}
                  <SuitabilityResult data={resultData} />
                </div>
              )}
            </Transition>
          </Grid.Col>
        )}
      </Grid>
    </Container>
  );
};
