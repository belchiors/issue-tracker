function isAuthenticated() {
  return localStorage.getItem("accessToken") != null;
}

function getCurrentUser() {
  const data = localStorage.getItem("user");
  return JSON.parse(data);
}

function getToken() {
  return localStorage.getItem("accessToken");
}

function login(jwt) {
  localStorage.setItem("accessToken", jwt.token);
  localStorage.setItem("user", JSON.stringify(jwt.user));
}

function logout() {
  localStorage.clear();
}

export { isAuthenticated, getCurrentUser, getToken, login, logout };
