import { createServerFn } from "@tanstack/react-start"
import { resumeAnalyzerformSchema, ResumeAnalyzerformSchema } from "./schemas/schemas"
import z from "zod";


export const analyzeResumeServerFn = createServerFn({ method: "POST" })
  .inputValidator(r => {
    const formData = z.instanceof(FormData).parse(r)
    return resumeAnalyzerformSchema.parse({
      resumePDF: formData.get('resumePDF'),
      linkedJobUrl: formData.get('linkedJobUrl')
    })
  })
  .handler(async ({ data }) => {
    try {
      console.log({ resumePDF: data.resumePDF.name })
      return "poop"
    } catch (error) {
      return "nooo"
    }
  })
