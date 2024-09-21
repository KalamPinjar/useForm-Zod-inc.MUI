import axios from "axios";

import { useQuery } from "@tanstack/react-query";

import { ApiGet } from "../types/apiTypes";
import { Schema } from "../types/schema";
import { Option } from "../../types/options";

export function useStates() {
  return useQuery({
    queryKey: ["states"],
    queryFn: () =>
      axios
        .get<Option[]>("http://localhost:8000/states")
        .then((res) => res.data),
  });
}

export function useLanguages() {
  return useQuery({
    queryKey: ["languages"],
    queryFn: () =>
      axios
        .get<Option[]>("http://localhost:8000/languages")
        .then((res) => res.data),
  });
}

export function useGenders() {
  return useQuery({
    queryKey: ["genders"],
    queryFn: () =>
      axios
        .get<Option[]>("http://localhost:8000/genders")
        .then((res) => res.data),
  });
}

export function useSkills() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: () =>
      axios
        .get<Option[]>("http://localhost:8000/skills")
        .then((res) => res.data),
  });
}

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: (): Promise<Option[]> =>
      axios.get<ApiGet[]>("http://localhost:8000/users").then((response) =>
        response.data.map((user) => ({
          id: user.id.toString(),
          label: user.name,
        }))
      ),
    refetchOnWindowFocus: true,
    refetchInterval: 2000,
    staleTime: 5000,
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: ["user", { id }],
    queryFn: async (): Promise<Schema> => {
      const { data } = await axios.get<ApiGet>(
        `http://localhost:8000/users/${id}`
      );

      return {
        variant: "edit",
        id: data.id.toString(), // Ensure id is string
        name: data.name,
        email: data.email,
        formerEmploymentPeriod: [
          new Date(data.formerEmploymentPeriod[0]),
          new Date(data.formerEmploymentPeriod[1]),
        ],
        gender: data.gender,
        languagesSpoken: data.languagesSpoken,
        registrationDateAndTime: new Date(data.registrationDateAndTime),
        salaryRange: [data.salaryRange[0], data.salaryRange[1]],
        skills: data.skills,
        states: data.states,
        students: data.students,
        isTeacher: data.isTeacher,
      };
    },
    enabled: !!id, // Only run the query if id is defined
  });
}
