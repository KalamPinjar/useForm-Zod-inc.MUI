import { TextField, TextFieldProps } from "@mui/material";
import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";

type Props<T extends FieldValues> = {
  name: Path<T>;
} & Pick<TextFieldProps, "label">;
function RHFTextField<T extends FieldValues>({ name, ...props }: Props<T>) {
  const { control } = useFormContext<T>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
}

export default RHFTextField;
