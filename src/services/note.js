import axios from "axios";

const baseUrl = "/api/notes";
let token = null;

export function setToken(newToken) {
  token = `Bearer ${newToken}`;
}

export function getNotes() {
  return axios.get(baseUrl).then((response) => response.data);
}

export function updateNote(id, data) {
  return axios.put(`${baseUrl}/${id}`, data).then((response) => response.data);
}

export async function createNote(data) {
  const response = await axios.post(baseUrl, data, {
    headers: { Authorization: token },
  });

  return response.data;
}
