import { apiFetch } from "./api";


export function getStudentEnrolledClasses(token: string) {
  return apiFetch("/classes/enrolled", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}


export function createClass(token: string, nombre: string) {
    return apiFetch("/classes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre }),
    });
}

export function getClassById(token: string, classId: string) {
    return apiFetch(`/classes/${classId}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
}


export function getTeacherClasses(token: string) {
    return apiFetch("/classes/mine", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });


}
