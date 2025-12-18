import { resumeAnalyzerformSchema } from '@/schemas/schemas';
import { Button, FileInput, Group, Paper, Stack, Text, TextInput, Title } from '@mantine/core';
import { IconBrandLinkedin, IconFileCv, IconSparkles } from '@tabler/icons-react';
import { useForm } from '@tanstack/react-form';
import { onPdfUpload } from './utils';

interface ResumeUploadFormProps {
  onSubmit: (props: { linkedInUrl: string }) => void;
  isLoading: boolean;
}

export const ResumeUploadForm: React.FC<ResumeUploadFormProps> = ({ onSubmit, isLoading }) => {
  const form = useForm({
    defaultValues: { resumePDF: undefined as unknown as File, linkedJobUrl: '' },

    validators: { onChange: resumeAnalyzerformSchema },
    onSubmit: ({ value }) => {
      const { linkedJobUrl } = resumeAnalyzerformSchema.parse(value);
      void onSubmit({ linkedInUrl: linkedJobUrl });
    },
  });

  return (
    <Paper shadow='sm' radius='md' p='xl' withBorder>
      <Stack gap='lg'>
        <div>
          <Title order={3}>Resume Optimizer</Title>
          <Text c='dimmed' size='sm'>
            Upload your CV and the Job URL to get started.
          </Text>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <Stack gap='md'>
            {/* LinkedIn URL Field */}
            <form.Field
              name='linkedJobUrl'
              children={(field) => (
                <TextInput
                  label='LinkedIn Job URL'
                  placeholder='https://www.linkedin.com/jobs/...'
                  leftSection={<IconBrandLinkedin size={16} />}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  error={field.state.meta.errors[0]?.message}
                />
              )}
            />

            {/* File Upload Field */}
            <form.Field
              name='resumePDF'
              children={(field) => (
                <FileInput
                  label='Upload Resume (PDF)'
                  placeholder='Select your resume'
                  leftSection={<IconFileCv size={16} />}
                  accept='application/pdf'
                  onChange={(file) => {
                    if (!file) return;
                    field.handleChange(file);
                    const formData = new FormData();
                    formData.append('resumePDF', file);
                    void onPdfUpload({ data: formData });
                    console.log(field.state.meta.errors);
                  }}
                  onBlur={field.handleBlur}
                  error={field.state.meta.errors.length > 0 && field.state.meta.errors[0]?.message}
                  clearable
                />
              )}
            />
            <Group justify='flex-end' mt='md'>
              <Button
                type='submit'
                variant='gradient'
                gradient={{ from: 'red', to: 'blue', deg: 90 }}
                disabled={form.state.isSubmitting || isLoading}
                mt={16}
                w={'100%'}
                rightSection={<IconSparkles size={18} stroke={1.5} />}
              >
                {form.state.isSubmitting || isLoading ? 'Analyzing...' : 'Get ATS Score'}
              </Button>
            </Group>
          </Stack>
        </form>
      </Stack>
    </Paper>
  );
};
