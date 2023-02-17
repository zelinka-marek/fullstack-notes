const baseUrl = "/api/notes";
const headers = new Headers();
headers.set("Content-Type", "application/json");

function toJSON(response) {
  return response.then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
  });
}

export function getNotes() {
  const response = fetch(baseUrl);

  return toJSON(response);
}

export function updateNote(id, data) {
  const response = fetch(`${baseUrl}/${id}`, {
    method: "put",
    headers,
    body: JSON.stringify(data),
  });

  return toJSON(response);
}

export function createNote(data) {
  const response = fetch(baseUrl, {
    method: "post",
    headers,
    body: JSON.stringify(data),
  });

  return toJSON(response);
}
