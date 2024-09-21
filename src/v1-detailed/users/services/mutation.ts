import { useMutation, QueryClient } from "@tanstack/react-query";
import { Schema } from "../types/schema";
import axios from "axios";
import { toast } from "react-hot-toast";
import { mapData } from "../utils/mapData";
import { omit } from "lodash";

export function useCreateUser() {
  const queryClient = new QueryClient();
  return useMutation({
    mutationFn: async (data: Schema) => {
      await axios.post("http://localhost:8000/users", omit(mapData(data)));
    },
    onSuccess: async (data, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.setQueryData(["user", { id: variables }], data);
      toast.success("User created successfully");
    },
    onError: () => {
      console.log("onError");
    },
  });
}

export function useEditUser() {
  const queryClient = new QueryClient();

  return useMutation({
    mutationFn: async (data: Schema) => {
      if (data.variant === "edit") {
        await axios.put(
          `http://localhost:8000/users/${data.id}`,
          omit(mapData(data), "variant")
        );
        toast.success("User edited successfully");
      }
    },
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: ["users"] });

      if (variables.variant === "edit") {
        await queryClient.invalidateQueries({
          queryKey: ["user", { id: variables.id }],
        });
      }
    },
    onError: () => {
      console.log("onError");
    },
  });
}
