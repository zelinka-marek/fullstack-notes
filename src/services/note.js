const baseUrl = "http://localhost:3001/notes";
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
  return toJSON(fetch(baseUrl));
}

export function updateNote(id, data) {
  return toJSON(
    fetch(`${baseUrl}/${id}`, {
      method: "put",
      headers,
      body: JSON.stringify(data),
    })
  );
}

export function createNote(data) {
  return toJSON(
    fetch(baseUrl, {
      method: "post",
      headers,
      body: JSON.stringify(data),
    })
  );
}
