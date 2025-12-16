import { createFileRoute } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form';
import { analyzeResumeServerFn } from '../resumeLoaders'
import { FileInput, TextInput } from '@mantine/core'
import { IconFileCv, IconLink, IconSparkles } from '@tabler/icons-react';
import { Center, Button } from '@mantine/core';
import { FormEvent } from 'react';
import { resumeAnalyzerformSchema, ResumeAnalyzerformSchema } from '../schemas/schemas';

export const Route = createFileRoute('/')({
  component: Home,
})


const defaultFormValues: ResumeAnalyzerformSchema = {
  resumePDF: new File([], ""),
  linkedJobUrl: ""
}


function Home() {
  const cvForm = useForm({
    defaultValues: defaultFormValues,
    async onSubmit({ value }) {
      const { linkedJobUrl, resumePDF } = resumeAnalyzerformSchema.parse(value)
      const formData = new FormData();
      formData.append('resumePDF', value.resumePDF);
      formData.append('linkedJobUrl', value.linkedJobUrl);

      const result = await analyzeResumeServerFn({ data: formData })
      console.log(result)
      // cvForm.reset(defaultFormValues);
    },
  })

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    cvForm.handleSubmit();
  }

  return (
    <Center h={"100vh"}>
      <form onSubmit={onFormSubmit}>
        <cvForm.Field name="resumePDF" children={(field) => (
          <FileInput
            accept="application/pdf"
            label="Attach your CV"
            placeholder="my-resume.pdf"
            rightSection={<IconFileCv size={18} stroke={1.5} />}
            rightSectionPointerEvents="none"
            onChange={file => file && field.handleChange(file)}
          />
        )} />
        <cvForm.Field name='linkedJobUrl' children={field => (
          <TextInput
            mt="md"
            rightSectionPointerEvents="none"
            rightSection={<IconLink size={16} />}
            label="LinkedIn Job URI"
            placeholder='http://linkedin.com/...'
            onChange={link => {
              field.handleChange(link.currentTarget.value)
            }}
          />
        )} />
        <Button type="submit" variant="gradient"
          gradient={{ from: 'red', to: 'blue', deg: 90 }}
          disabled={cvForm.state.isSubmitting}
          mt={16}
          w={'100%'}
          rightSection={<IconSparkles size={18} stroke={1.5} />}
        >
          {cvForm.state.isSubmitting ? 'Analyzing...' : 'Get ATS Score'}
        </Button>
      </form>
    </Center>
  )
}
