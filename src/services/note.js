import axios from "axios";

const baseUrl = "/api/notes";

export function getNotes() {
  return axios.get(baseUrl).then((response) => response.data);
}

export function updateNote(id, data) {
  return axios.put(`${baseUrl}/${id}`, data).then((response) => response.data);
}

export function createNote(data) {
  return axios.post(baseUrl, data).then((response) => response.data);
}
