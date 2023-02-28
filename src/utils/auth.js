const KEY = "loggedInUser";

export function saveUser(user) {
  localStorage.setItem(KEY, JSON.stringify(user));
}

export function getSavedUser() {
  const loggedInUserJSON = localStorage.getItem(KEY);
  if (!loggedInUserJSON) {
    return null;
  }

  return JSON.parse(loggedInUserJSON);
}

export function getUserToken() {
  const user = getSavedUser(localStorage);
  if (!user) {
    throw new Error("user missing in localStorage");
  }

  return user.token;
}

export function removeUser() {
  localStorage.removeItem(KEY);
}
