import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login-styles.css";

export function Login() {
  const navigate = useNavigate();

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState("");

  async function handleLoginSubmit(event) {
    event.preventDefault();
    setLoginError("");

    try {
        const response = await fetch("/login", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user: loginUsername, password: loginPassword }),
            credentials: "include",
        });

        const data = await response.json();

        if (response.ok) {
            console.log("Login Successful!", data);
            localStorage.setItem("username", data.user);
            navigate("/user"); 
        } else {
            console.log("Login Error:", data.msg);
            setLoginError(data.msg);
        }
    } catch (error) {
        console.error("Login Failed:", error);
        setLoginError("Server error. Please try again.");
    }
}


async function handleSignupSubmit(event) {
  event.preventDefault();
  setSignupError("");

  if (signupPassword !== confirmPassword) {
      setSignupError("Passwords do not match.");
      return;
  }

  try {
      const response = await fetch("/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user: signupUsername, password: signupPassword }),
      });

      const data = await response.json();

      if (response.ok) {
          console.log("Signup Successful!", data);
          navigate("/user");
      } else {
          console.log("Signup Error:", data.msg);
          setSignupError(data.msg);
      }
  } catch (error) {
      console.error("Signup Failed:", error);
      setSignupError("Server error. Please try again.");
  }
}
async function handleLogout() {
  await fetch("/logout", { method: "POST", credentials: "include" });
  localStorage.removeItem("username");
  navigate("/login");
}


  return (
    <main className="container-fluid">
      <div className="container-fluid vh-100">
        <div className="row h-100">
          
          <div className="left-side-login">
            <div className="form-container">
              <h1 className="mb-4">Create an Account</h1>
              {signupError && <p className="text-danger">{signupError}</p>}
              <form onSubmit={handleSignupSubmit}>
                <div className="mb-3 w-100 text-center">
                  <label htmlFor="new-username" className="form-label">Email or Username</label>
                  <input
                    type="text"
                    id="new-username"
                    className="form-control"
                    placeholder="Enter username"
                    value={signupUsername}
                    onChange={(e) => setSignupUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3 w-100 text-center">
                  <label htmlFor="new-password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="new-password"
                    className="form-control"
                    placeholder="Enter password"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                  />
                </div>
                <div className="mb-3 w-100 text-center">
                  <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    id="confirm-password"
                    className="form-control"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="btn-container">
                  <button type="submit" className="btn btn-light">Create Account</button>
                  <button onClick={() => navigate('/user')} className="btn btn-outline-light skip-login">Skip Login</button>
                </div>
              </form>
            </div>
          </div>

          <div className="right-side-login">
            <div className="form-container">
              <h1 className="mb-4">Login to GameLog</h1>
              {loginError && <p className="text-danger">{loginError}</p>}
              <form onSubmit={handleLoginSubmit}>
                <div className="mb-3 w-100 text-center">
                  <label htmlFor="username" className="form-label">Email or Username</label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    placeholder="Enter username"
                    value={loginUsername}
                    onChange={(e) => setLoginUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3 w-100 text-center">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Enter password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <div className="btn-container">
                  <button type="submit" className="btn btn-dark">Login</button>
                  <button onClick={() => navigate('/user')} className="btn btn-outline-dark skip-login">Skip Login</button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
