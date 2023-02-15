const baseUrl = "http://localhost:3001/notes";
const headers = new Headers();
headers.set("Content-Type", "application/json");

export function getNotes() {
  return fetch(baseUrl).then((response) => response.json());
}

export function updateNote(id, data) {
  return fetch(`${baseUrl}/${id}`, {
    method: "put",
    headers,
    body: JSON.stringify(data),
  }).then((response) => response.json());
}

export function createNote(data) {
  return fetch(baseUrl, {
    method: "post",
    headers,
    body: JSON.stringify(data),
  }).then((response) => response.json());
}
