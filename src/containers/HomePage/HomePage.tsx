import { jobSuitabilitySchema } from '@/schemas/schemas';
import { experimental_useObject as useObject } from '@ai-sdk/react';
import { Container, Grid, Transition } from '@mantine/core';
import { useState } from 'react';
import { CvUploadForm } from './CvUploadForm';
import { SuitabilityResult } from './SuitabilityResult';

export const HomePage = () => {
  const [jobDescription, setJobDescription] = useState('');

  const customFetch: typeof fetch = async (input, init) => {
    const response = await fetch(input, init);
    const encoded = response.headers.get('X-Job-Description');
    if (encoded !== null) {
      setJobDescription(decodeURIComponent(atob(encoded)));
    }
    return response;
  };

  const {
    error,
    isLoading,
    object: resultData,
    submit: submitToApi,
  } = useObject({ api: '/api/ast-scorer', schema: jobSuitabilitySchema, fetch: customFetch });
  const showResults = resultData !== undefined && Object.keys(resultData).length > 0;

  if (error) {
    return (
      <Container size='xl' py='xl'>
        <Grid justify='center'>
          <Grid.Col span={6}>
            <CvUploadForm onSubmit={submitToApi} isLoading={isLoading} />
            <div style={{ marginTop: '1rem', color: 'red', textAlign: 'center' }}>{error.message}</div>
          </Grid.Col>
        </Grid>
      </Container>
    );
  }

  const submit = (props: { linkedInUrl: string; jobDescription?: string; aiModel: string }) => {
    submitToApi({
      linkedInUrl: props.linkedInUrl,
      ...(props.jobDescription !== '' && { jobDescription: props.jobDescription }),
      aiModel: props.aiModel,
    });
  };

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
                  <SuitabilityResult data={resultData} jobDescription={jobDescription} />
                </div>
              )}
            </Transition>
          </Grid.Col>
        )}
      </Grid>
    </Container>
  );
};
