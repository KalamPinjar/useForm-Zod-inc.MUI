import {
  SubmitHandler,
  useFieldArray,
  useFormContext,
  useWatch,
} from "react-hook-form";
import {
  Button,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Stack,
  Typography,
} from "@mui/material";

import { defaultValues, Schema } from "../types/schema";
import RHFautocomplete from "../../components/RHFautocomplete";
import { Fragment, useEffect } from "react";
import {
  useGenders,
  useLanguages,
  useSkills,
  useStates,
  useUser,
  useUsers,
} from "../services/queries";
import RHFToggleButtonGroup from "../../components/RHFToggleButtonGroup";
import RHFradioGroup from "../../components/RHFradioGroup";
import RHFcheckboxGroup from "../../components/RHFcheckboxGroup";
import RHFDateAndTimePicker from "../../components/RHFDateTimePicker";
import RHFSlider from "../../components/RHFSlider";
import RHFSwitch from "../../components/RHFSwitch";
import RHFTextField from "../../components/RHFTextField";
import { Toaster } from "react-hot-toast";
import { useCreateUser, useEditUser } from "../services/mutation";

const Users = () => {
  const statesQuery = useStates();
  const languagesQuery = useLanguages();
  const genderQuery = useGenders();
  const skillsQuery = useSkills();

  const usersQuery = useUsers();
  const { control, unregister, reset, setValue, handleSubmit } =
    useFormContext<Schema>();

  const id = useWatch({ control, name: "id" });
  const variant = useWatch({ control, name: "variant" });
  const userQuery = useUser(id);

  const isTeacher = useWatch({ control, name: "isTeacher" });

  const { append, fields, remove, replace } = useFieldArray<Schema>({
    control,
    name: "students",
  });

  const handleReset = () => {
    reset(defaultValues);
  };

  useEffect(() => {
    if (!isTeacher) {
      replace([]);
      unregister("students");
    }
  }, [isTeacher, replace, unregister]);

  const handleUserClick = (id: string) => {
    setValue("id", id);
  };

  useEffect(() => {
    if (userQuery.data) {
      reset(userQuery.data);
    }
  }, [userQuery.data, reset]);

  const createUserMutation = useCreateUser();
  const editUserMumation = useEditUser();
  const onSubmit: SubmitHandler<Schema> = (data) => {
    if (variant === "create") {
      createUserMutation.mutate(data);
    } else {
      editUserMumation.mutate(data);
    }
  };
  return (
    <Container
      key={id}
      maxWidth="sm"
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Toaster position="top-center" reverseOrder={false} />
      <Stack sx={{ flexDirection: "row", gap: 2 }}>
        <List subheader={<ListSubheader>User</ListSubheader>}>
          {usersQuery.data?.map((user) => (
            <ListItem disablePadding key={user.id}>
              <ListItemButton
                onClick={() => handleUserClick(user.id)}
                selected={id === user.id}
              >
                <ListItemText primary={user.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Stack sx={{ gap: 2 }}>
          <RHFTextField<Schema> name="name" label="Name" />
          <RHFTextField<Schema> name="email" label="Email" />
          <RHFautocomplete<Schema>
            name="states"
            label="States"
            options={statesQuery.data}
          />
          <RHFToggleButtonGroup<Schema>
            name="languagesSpoken"
            options={languagesQuery.data}
          />
          <RHFradioGroup<Schema>
            name="gender"
            options={genderQuery.data}
            label="Gender"
          />
          <RHFcheckboxGroup<Schema>
            name="skills"
            options={skillsQuery.data}
            label="Skills"
          />
          <RHFDateAndTimePicker<Schema>
            name="registrationDateAndTime"
            label="Registration Date & Time"
          />
          <Typography>Former Employment Period:</Typography>
          <RHFSlider<Schema> name="salaryRange" label="Salary Range" />
          <RHFSwitch<Schema> name="isTeacher" label="Are you a Teacher" />

          {isTeacher && (
            <Button onClick={() => append({ name: "" })} type="button">
              Add new Student
            </Button>
          )}

          {fields.map((field, index) => (
            <Fragment key={field.id}>
              <RHFTextField<Schema>
                name={`students.${index}.name`}
                label={`Student ${index + 1}`}
              />
              <Button type="button" onClick={() => remove(index)}>
                Remove
              </Button>
            </Fragment>
          ))}

          <Stack
            sx={{
              gap: 1,
              mt: 2,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Button variant="contained" type="submit">
              {variant === "create" ? "Create" : "Edit"}
            </Button>
            <Button onClick={handleReset}>Reset</Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};

export default Users;
