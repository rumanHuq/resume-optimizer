import { Button, Center, FileInput, TextInput } from '@mantine/core';
import { IconFileCv, IconLink, IconSparkles } from '@tabler/icons-react';
import { useForm } from '@tanstack/react-form';
import type { FormEvent } from 'react';
import { useState } from 'react';

import { analyzeResumeServerFn } from '@/containers/HomePage/resumeLoaders';
import type { ResumeAnalyzerformSchema } from '@/schemas/schemas';
import { resumeAnalyzerformSchema } from '@/schemas/schemas';

const defaultFormValues: ResumeAnalyzerformSchema = { resumePDF: new File([], ''), linkedJobUrl: '' };

export const HomePage = () => {
  const [stream, setStream] = useState('');
  const cvForm = useForm({
    defaultValues: defaultFormValues,
    async onSubmit({ value }) {
      const { linkedJobUrl, resumePDF } = resumeAnalyzerformSchema.parse(value);
      const formData = new FormData();
      formData.append('resumePDF', resumePDF);
      formData.append('linkedJobUrl', linkedJobUrl);

      const result = await analyzeResumeServerFn({ data: formData });
      setStream(result);
    },
  });

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    void cvForm.handleSubmit();
  };

  return (
    <Center h={'100vh'}>
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
              onChange={(file) => file && field.handleChange(file)}
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
          disabled={cvForm.state.isSubmitting}
          mt={16}
          w={'100%'}
          rightSection={<IconSparkles size={18} stroke={1.5} />}
        >
          {cvForm.state.isSubmitting ? 'Analyzing...' : 'Get ATS Score'}
        </Button>
        {stream.length > 0 && <div>{JSON.stringify(stream, null, 2)}</div>}
      </form>
    </Center>
  );
};
