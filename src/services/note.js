import axios from "axios";
import { getUserToken } from "../utils/auth";

const baseUrl = "/api/notes";

export function getNotes() {
  return axios.get(baseUrl).then((response) => response.data);
}

export function updateNote(id, data) {
  return axios.put(`${baseUrl}/${id}`, data).then((response) => response.data);
}

export async function createNote(data) {
  const token = getUserToken();
  const response = await axios.post(baseUrl, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
}
