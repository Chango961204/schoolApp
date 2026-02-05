import { apiFetch } from "./api";

export function joinClass(token: string, codigo: string) {
  return apiFetch("/enrollments/join", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ codigo }),
  });
}


export function getStudentEnrolledClasses(token: string) {
  return apiFetch("/enrollments/mine", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
