import type { AiModel } from '@/constants/constants';
import { aiModels } from '@/constants/constants';
import { cvAnalyzerformSchema, cvPdfSchema, linkedinJobUrlSchema } from '@/schemas/schemas';
import { isDev } from '@/utils/utils';
import { Button, FileInput, Group, Paper, Select, Stack, Text, TextInput, Title } from '@mantine/core';
import { IconBrandLinkedin, IconFileCv, IconSparkles } from '@tabler/icons-react';
import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import { onPdfRemove, onPdfUpload } from './utils';

interface CvUploadFormProps {
  onSubmit: (props: { linkedInUrl: string; aiModel: string }) => void;
  isLoading: boolean;
}

const availableAImodels = isDev ? aiModels : aiModels.filter((m) => m !== 'deepseek-r1:8b');

export const CvUploadForm: React.FC<CvUploadFormProps> = ({ onSubmit, isLoading }) => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const form = useForm({
    defaultValues: {
      cvPDF: undefined as unknown as undefined | File,
      linkedJobUrl: '',
      aiModel: availableAImodels[0],
    },
    onSubmit: ({ value }) => {
      const { linkedJobUrl, aiModel } = cvAnalyzerformSchema.parse(value);
      void onSubmit({ aiModel, linkedInUrl: linkedJobUrl });
    },
  });

  return (
    <Paper shadow='sm' radius='md' p='xl' withBorder>
      <Stack gap='lg'>
        <div>
          <Title order={3}>CV Improv</Title>
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
            <form.Field
              name='aiModel'
              children={(field) => (
                <Select
                  label='Select LLM'
                  placeholder='Pick a model'
                  data={availableAImodels}
                  value={field.state.value}
                  disabled={isLoading}
                  onChange={(val) => val !== null && field.handleChange(val as AiModel)}
                  onBlur={field.handleBlur}
                  comboboxProps={{ transitionProps: { transition: 'fade', duration: 100 } }}
                  allowDeselect={false} // Ensures the user can't select "null"
                />
              )}
            />
            {/* LinkedIn URL Field */}
            <form.Field
              name='linkedJobUrl'
              validators={{ onChange: linkedinJobUrlSchema }}
              children={(field) => (
                <TextInput
                  label='LinkedIn Job URL'
                  placeholder='https://www.linkedin.com/jobs/...'
                  leftSection={<IconBrandLinkedin size={16} />}
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                  disabled={isLoading}
                  onBlur={field.handleBlur}
                  error={
                    !field.state.meta.isValid && field.state.meta.errors.map((m) => m?.message).join(', ')
                  }
                />
              )}
            />

            {/* File Upload Field */}
            <form.Field
              name='cvPDF'
              validators={{ onChange: cvPdfSchema.shape.file }}
              children={(field) => (
                <FileInput
                  label='Upload CV (PDF)'
                  placeholder='Select your CV'
                  leftSection={<IconFileCv size={16} />}
                  accept='application/pdf'
                  onChange={(file) => {
                    if (!file) {
                      setIsFileUploaded(false);
                      void onPdfRemove();
                      return;
                    }
                    setIsFileUploaded(true);
                    field.handleChange(file);
                    const formData = new FormData();
                    formData.append('cvPDF', file);
                    void onPdfUpload({ data: formData });
                  }}
                  disabled={isLoading}
                  onBlur={field.handleBlur}
                  error={
                    !field.state.meta.isValid && field.state.meta.errors.map((m) => m?.message).join(', ')
                  }
                  clearable={!isLoading}
                />
              )}
            />
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Group justify='flex-end' mt='md'>
                  <Button
                    type='submit'
                    variant='gradient'
                    gradient={{ from: 'red', to: 'blue', deg: 90 }}
                    disabled={!canSubmit || isSubmitting || isLoading || !isFileUploaded}
                    mt={16}
                    w={'100%'}
                    rightSection={<IconSparkles size={18} stroke={1.5} />}
                  >
                    {isSubmitting || isLoading ? 'Analyzing...' : 'Get ATS Score'}
                  </Button>
                </Group>
              )}
            />
          </Stack>
        </form>
      </Stack>
    </Paper>
  );
};
