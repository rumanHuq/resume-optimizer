import type { AiModel } from '@/constants/constants';
import { aiModels } from '@/constants/constants';
import { cvPdfSchema, linkedinJobUrlSchema } from '@/schemas/schemas';
import { isDev } from '@/utils/env-utils';
import {
  Button,
  FileInput,
  Group,
  Modal,
  Paper,
  SegmentedControl,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import { IconBrandLinkedin, IconFileCv, IconSparkles } from '@tabler/icons-react';
import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import { onPdfRemove, onPdfUpload } from './utils';

interface CvUploadFormProps {
  onSubmit: (props: { linkedInUrl: string; jobDescription?: string; aiModel: string }) => void;
  isLoading: boolean;
}

const availableAImodels = isDev
  ? aiModels
  : aiModels.filter((m) => m !== 'ministral-3:3b-instruct-2512-q4_K_M');

export const CvUploadForm: React.FC<CvUploadFormProps> = ({ onSubmit, isLoading }) => {
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [jobInputMode, setJobInputMode] = useState<'url' | 'description'>('url');
  const [urlError, setUrlError] = useState('');
  const [descError, setDescError] = useState('');
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [pendingMode, setPendingMode] = useState<'url' | 'description' | null>(null);
  const form = useForm({
    defaultValues: {
      cvPDF: undefined as unknown as undefined | File,
      linkedJobUrl: '',
      jobDescription: '',
      aiModel: availableAImodels[0],
    },
    onSubmit: ({ value }) => {
      const { linkedJobUrl, jobDescription, aiModel } = value;
      if (jobInputMode === 'url') {
        if (linkedJobUrl === '') {
          setUrlError('LinkedIn URL is required');
          return;
        }
        try {
          linkedinJobUrlSchema.parse(linkedJobUrl);
        } catch {
          setUrlError('Invalid LinkedIn job URL');
          return;
        }
        setUrlError('');
        setDescError('');
        void onSubmit({ aiModel, linkedInUrl: linkedJobUrl });
      } else {
        if (jobDescription === '' || jobDescription.trim() === '') {
          setDescError('Job description is required');
          return;
        }
        setUrlError('');
        setDescError('');
        void onSubmit({ aiModel, linkedInUrl: '', jobDescription });
      }
    },
  });

  return (
    <Paper shadow='sm' radius='md' p='xl' withBorder>
      <Stack gap='lg'>
        <div>
          <Title order={3}>AST Scorer</Title>
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
                  allowDeselect={false}
                />
              )}
            />
            <div>
              <Text size='sm' fw={500} mb={4}>
                Job Source
              </Text>
              <SegmentedControl
                value={jobInputMode}
                onChange={(val) => {
                  const newMode = val as 'url' | 'description';
                  const hasLinkedInUrl = form.getFieldValue('linkedJobUrl').trim() !== '';
                  const hasJobDescription = form.getFieldValue('jobDescription').trim() !== '';

                  const willLoseContent =
                    (jobInputMode === 'url' && newMode === 'description' && hasLinkedInUrl) ||
                    (jobInputMode === 'description' && newMode === 'url' && hasJobDescription);

                  if (willLoseContent) {
                    setPendingMode(newMode);
                    setConfirmModalOpen(true);
                  } else {
                    setJobInputMode(newMode);
                    setUrlError('');
                    setDescError('');
                    if (newMode === 'url') form.setFieldValue('linkedJobUrl', '');
                    else form.setFieldValue('jobDescription', '');
                  }
                }}
                data={[
                  { label: 'LinkedIn URL', value: 'url' },
                  { label: 'Job Description', value: 'description' },
                ]}
                fullWidth
                disabled={isLoading}
              />
            </div>
            {jobInputMode === 'url' ? (
              <form.Field
                name='linkedJobUrl'
                children={(field) => (
                  <TextInput
                    label='LinkedIn Job URL'
                    placeholder='https://www.linkedin.com/jobs/...'
                    leftSection={<IconBrandLinkedin size={16} />}
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                      setUrlError('');
                    }}
                    disabled={isLoading}
                    onBlur={field.handleBlur}
                    error={urlError}
                  />
                )}
              />
            ) : (
              <form.Field
                name='jobDescription'
                children={(field) => (
                  <Textarea
                    label='Job Description'
                    placeholder='Paste the job description here...'
                    rows={6}
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                      setDescError('');
                    }}
                    disabled={isLoading}
                    onBlur={field.handleBlur}
                    error={descError}
                  />
                )}
              />
            )}

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

      <Modal
        opened={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        title='Switch Job Source?'
        centered
        withCloseButton={false}
      >
        <Text mb='lg'>
          {pendingMode === 'description'
            ? 'Your LinkedIn URL will be cleared if you switch to Job Description.'
            : 'Your Job Description will be cleared if you switch to LinkedIn URL.'}
        </Text>
        <Group justify='flex-end'>
          <Button variant='default' onClick={() => setConfirmModalOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (pendingMode !== null) {
                setJobInputMode(pendingMode);
                setUrlError('');
                setDescError('');
                if (pendingMode === 'url') form.setFieldValue('linkedJobUrl', '');
                else form.setFieldValue('jobDescription', '');
              }
              setConfirmModalOpen(false);
              setPendingMode(null);
            }}
          >
            Confirm
          </Button>
        </Group>
      </Modal>
    </Paper>
  );
};
