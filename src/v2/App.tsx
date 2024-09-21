import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import Container from "./components/Container";
import {
  Controller,
  FieldErrors,
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import { formDefaultValues, formSchema, FormSchema } from "./types/formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

export default function App() {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<FormSchema>({
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: formDefaultValues,
  });

  const hasWorkExperience = useWatch({ control, name: "hasWorkExperience" });
  const knownLanguages = useWatch({ control, name: "knownLanguages" });
  const education = useWatch({ control, name: "education" });

  const fullErrors: FieldErrors<
    Extract<FormSchema, { hasWorkExperience: true }>
  > &
    FieldErrors<Extract<FormSchema, { education: "noFormalEducation" }>> &
    FieldErrors<Extract<FormSchema, { education: "highSchoolDiploma" }>> &
    FieldErrors<Extract<FormSchema, { education: "bachelorDegree" }>> &
    FieldErrors<Extract<FormSchema, { education: "masterDegree" }>> &
    FieldErrors<Extract<FormSchema, { knownLanguages: true }>> = errors;

  const {
    fields: languagesFields,
    replace: replaceLanguages,
    append: appendLanguages,
    remove: removeLanguages,
  } = useFieldArray({
    control,
    name: "languages",
  });

  useEffect(() => {
    if (knownLanguages) {
      replaceLanguages([{ name: "" }]);
    }
  }, [knownLanguages, replaceLanguages]);

  const onSubmit: SubmitHandler<FormSchema> = (data) => {
    console.log(data);
  };

  return (
    <Container>
      <TextField
        {...register("fullName")}
        label="Full Name"
        variant="outlined"
        helperText={fullErrors.fullName?.message}
        error={!!fullErrors.fullName}
      />
      <FormControlLabel
        {...register("hasWorkExperience")}
        label="Has Work Experience"
        control={<Checkbox />}
      />
      {hasWorkExperience && (
        <TextField
          {...register("companyName")}
          label="Company Name"
          variant="outlined"
          helperText={fullErrors.companyName?.message}
          error={!!fullErrors.companyName}
        />
      )}
      <FormControlLabel
        {...register("knownLanguages")}
        label="Known Languages"
        control={<Checkbox />}
      />
      {knownLanguages && (
        <>
          {languagesFields.map((field, index) => (
            <div key={field.id}>
              <TextField
                sx={{ width: "100%" }}
                {...register(`languages.${index}.name`)}
                label="Language Name"
                helperText={fullErrors.languages?.[index]?.name?.message}
                error={!!fullErrors.languages?.[index]?.name?.message}
              />
              <IconButton
                disabled={languagesFields.length === 1}
                onClick={() => removeLanguages(index)}
                color="error"
              >
                <DeleteForeverRoundedIcon />
              </IconButton>
            </div>
          ))}
          <IconButton
            sx={{ width: "fit-content" }}
            onClick={() => appendLanguages({ name: "" })}
            color="success"
          >
            <AddCircleRoundedIcon />
          </IconButton>
        </>
      )}
      <FormControl>
        <FormLabel>Education</FormLabel>
        <Controller
          control={control}
          name="education"
          render={({ field }) => (
            <RadioGroup {...field}>
              <FormControlLabel
                value="noFormalEducation"
                control={<Radio />}
                label="No Formal Education"
              />
              <FormControlLabel
                value="highSchoolDiploma"
                control={<Radio />}
                label="High School Diploma"
              />
              <FormControlLabel
                value="bachelorDegree"
                control={<Radio />}
                label="Bachelor Degree"
              />
              <FormControlLabel
                value="masterDegree"
                control={<Radio />}
                label="Master Degree"
              />
            </RadioGroup>
          )}
        />
      </FormControl>
      {education === "highSchoolDiploma" && (
        <TextField
          {...register("highSchool")}
          label="High School"
          variant="outlined"
          helperText={fullErrors.highSchool?.message}
          error={!!fullErrors.highSchool}
        />
      )}
      {education === "bachelorDegree" && (
        <TextField
          {...register("university")}
          label="University Name"
          variant="outlined"
          helperText={fullErrors.university?.message}
          error={!!fullErrors.university}
        />
      )}
      {education === "masterDegree" && (
        <TextField
          {...register("university")}
          label="University Name"
          variant="outlined"
          helperText={fullErrors.university?.message}
          error={!!fullErrors.university}
        />
      )}
      <Button variant="contained" onClick={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </Container>
  );
}
