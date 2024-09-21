import { z } from "zod";

const hasWorkExperienceSchema = z.discriminatedUnion("hasWorkExperience", [
  z.object({
    hasWorkExperience: z.literal(true),
    companyName: z.string().min(1),
  }),
  z.object({ hasWorkExperience: z.literal(false) }),
]);
const knownLanguagesSchema = z.discriminatedUnion("knownLanguages", [
  z.object({
    knownLanguages: z.literal(true),
    languages: z
      .array(
        z.object({
          name: z.string().min(1),
        })
      )
      .min(1),
  }),
  z.object({ knownLanguages: z.literal(false) }),
]);
const educationSchema = z.discriminatedUnion("education", [
  z.object({
    education: z.literal("noFormalEducation"),
  }),
  z.object({
    education: z.literal("highSchoolDiploma"),
    highSchool: z.string().min(1),
  }),
  z.object({
    education: z.literal("bachelorDegree"),
    university: z.string().min(1),
  }),
  z.object({
    education: z.literal("masterDegree"),
    university: z.string().min(1),
  }),
]);
const formSchema = z
  .object({
    fullName: z.string().min(1),
  })
  .and(hasWorkExperienceSchema)
  .and(knownLanguagesSchema)
  .and(educationSchema);

type FormSchema = z.infer<typeof formSchema>;

const formDefaultValues: FormSchema = {
  fullName: "",
  hasWorkExperience: false,
  knownLanguages: false,
  education: "noFormalEducation",
};

export { formSchema, formDefaultValues, type FormSchema };
