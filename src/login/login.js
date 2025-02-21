export function saveUser(username) {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
  }
  
  export function getUser() {
    return localStorage.getItem("username");
  }
  
  export function validateLogin(username, password) {
    if (!username.trim() || !password.trim()) {
      return "Username and password are required.";
    }
    return null;
  }
  