import { FormProvider, useForm } from "react-hook-form";
import Users from "./Users";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema, defaultValues, Schema } from "../types/schema";

import { DevTool } from "@hookform/devtools";

const UserProvider = () => {
  const methods = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schema),
    defaultValues,
  });
  return (
    <FormProvider {...methods}>
      <Users />
      <DevTool control={methods.control} />
    </FormProvider>
  );
};

export default UserProvider;
