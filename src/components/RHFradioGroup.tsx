import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../types/options";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

type Props<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
  label: string;
};
function RHFradioGroup<T extends FieldValues>({
  name,
  options,
  label,
}: Props<T>) {
  const { control } = useFormContext<T>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl {...field} error={!!error}>
          <FormLabel>{label}</FormLabel>
          <RadioGroup>
            {options?.map((option) => (
              <FormControlLabel
                key={option.id}
                value={option.id}
                control={<Radio checked={field.value === option.id} />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
    ></Controller>
  );
}

export default RHFradioGroup;
