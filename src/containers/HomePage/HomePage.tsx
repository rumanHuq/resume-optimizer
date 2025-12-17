import { jobSuitabilitySchema, resumeAnalyzerformSchema } from '@/schemas/schemas';
import { experimental_useObject as useObject } from '@ai-sdk/react';
import { Button, Center, FileInput, TextInput } from '@mantine/core';
import { IconFileCv, IconLink, IconSparkles } from '@tabler/icons-react';
import { useForm } from '@tanstack/react-form';
import type { FormEvent } from 'react';
import { StreamResponse } from './StreamResponse';
import { defaultFormValues, onPdfUpload } from './utils';

export const HomePage = () => {
  const {
    isLoading,
    object: resumeFeedback,
    submit,
  } = useObject({ api: '/api/resume-optimizer', schema: jobSuitabilitySchema });
  const cvForm = useForm({
    defaultValues: defaultFormValues,
    onSubmit({ value }) {
      const { linkedJobUrl } = resumeAnalyzerformSchema.parse(value);
      void submit({ linkedInUrl: linkedJobUrl });
    },
  });

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    void cvForm.handleSubmit();
  };

  return (
    <Center h={'100vh'} style={{ flexDirection: 'column' }}>
      {resumeFeedback && 'overallSuitabilityReason' in resumeFeedback && (
        /* @ts-expect-error */
        <StreamResponse jobSuitability={resumeFeedback} />
      )}
      <form onSubmit={onFormSubmit}>
        <cvForm.Field
          name='resumePDF'
          children={(field) => (
            <FileInput
              accept='application/pdf'
              label='Attach your CV'
              placeholder='my-resume.pdf'
              rightSection={<IconFileCv size={18} stroke={1.5} />}
              rightSectionPointerEvents='none'
              onChange={(file) => {
                if (!file) return;
                field.handleChange(file);
                const formData = new FormData();
                formData.append('resumePDF', file);
                void onPdfUpload({ data: formData });
              }}
            />
          )}
        />
        <cvForm.Field
          name='linkedJobUrl'
          children={(field) => (
            <TextInput
              mt='md'
              rightSectionPointerEvents='none'
              rightSection={<IconLink size={16} />}
              label='LinkedIn Job URI'
              placeholder='http://linkedin.com/...'
              onChange={(link) => {
                field.handleChange(link.currentTarget.value);
              }}
            />
          )}
        />
        <Button
          type='submit'
          variant='gradient'
          gradient={{ from: 'red', to: 'blue', deg: 90 }}
          disabled={cvForm.state.isSubmitting || isLoading}
          mt={16}
          w={'100%'}
          rightSection={<IconSparkles size={18} stroke={1.5} />}
        >
          {cvForm.state.isSubmitting || isLoading ? 'Analyzing...' : 'Get ATS Score'}
        </Button>
      </form>
    </Center>
  );
};
