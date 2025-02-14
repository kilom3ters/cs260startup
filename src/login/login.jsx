import React from 'react';
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './login-styles.css';

export function Login() {
  const navigate = useNavigate();

  return (
    <main className="container-fluid">
      <div className="container-fluid vh-100">
        <div className="row h-100">
          
          <div className="left-side-login">
            <div className="form-container">
              <h1 className="mb-4">Create an Account</h1>
              <form>
                <div className="mb-3 w-100 text-center">
                  <label htmlFor="new-username" className="form-label">Email or Username</label>
                  <input type="text" id="new-username" name="new-username" className="form-control" placeholder="Enter username" />
                </div>
                <div className="mb-3 w-100 text-center">
                  <label htmlFor="new-password" className="form-label">Password</label>
                  <input type="password" id="new-password" name="new-password" className="form-control" placeholder="Enter password" />
                </div>
                <div className="mb-3 w-100 text-center">
                  <label htmlFor="confirm-password" className="form-label">Confirm Password</label>
                  <input type="password" id="confirm-password" name="confirm-password" className="form-control" placeholder="Confirm password" />
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
              <form>
                <div className="mb-3 w-100 text-center">
                  <label htmlFor="username" className="form-label">Email or Username</label>
                  <input type="text" id="username" name="username" className="form-control" placeholder="Enter username" />
                </div>
                <div className="mb-3 w-100 text-center">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input type="password" id="password" name="password" className="form-control" placeholder="Enter password" />
                </div>
                <div className="btn-container">
                  <button type="submit" className="btn btn-dark">Login</button>
                  <p className="mt-3">
                    <a href="#" className="text-dark">Forgot password?</a>
                  </p>
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
