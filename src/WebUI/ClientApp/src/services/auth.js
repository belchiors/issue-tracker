function isAuthenticated() {
  return localStorage.getItem("accessToken") != null;
}

function getCurrentUser() {
  return localStorage.getItem("userRole");
}

function getToken() {
  return localStorage.getItem("accessToken");
}

function login(jwt) {
  localStorage.setItem("accessToken", jwt.token);
  localStorage.setItem("userRole", jwt.role);
}

function logout() {
  localStorage.clear();
}

export { isAuthenticated, getCurrentUser, getToken, login, logout };
