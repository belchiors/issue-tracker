function isAuthenticated() {
    return localStorage.getItem('TOKEN_KEY') != null;
}

function getToken() {
    return localStorage.getItem('TOKEN_KEY');
}

function login(token) {
    localStorage.setItem('TOKEN_KEY', token);
}

function logout() {
    localStorage.removeItem('TOKEN_KEY');
};

export { isAuthenticated, getToken, login, logout };