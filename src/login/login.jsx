import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

export function Login() {
  return (
    <main className='container-fluid bg-secondary text-center'>
    <div className="container-fluid vh-100">
        <div className="row h-100">
            <div className="left-side d-flex flex-column justify-content-center align-items-center text-white bg-black p-5">
                <h1 className="mb-4">Create an Account</h1>
                <form className="w-75">
                    <div className="mb-3">
                        <label for="new-username" className="form-label">Email or Username</label>
                        <input type="text" id="new-username" name="new-username" className="form-control" placeholder="Enter username"> </input>
                    </div>
                    <div className="mb-3">
                        <label for="new-password" className="form-label">Password</label>
                        <input type="password" id="new-password" name="new-password" className="form-control" placeholder="Enter password"> </input>
                    </div> 
                    <div className="mb-3">
                        <label for="confirm-password" className="form-label">Confirm Password</label>
                        <input type="password" id="confirm-password" name="confirm-password" className="form-control" placeholder="Confirm password"> </input>
                    </div>
                    <button type="submit" className="btn btn-light w-100">Create Account</button>
                </form>
                <a href="user.html" className="btn btn-outline-light mt-3">Skip Login</a>
            </div>

            <div className="right-side d-flex flex-column justify-content-center align-items-center p-5 bg-white text-black">
                <h1 className="mb-4">Login to GameLog</h1>
                <form className="w-75">
                    <div className="mb-3">
                        <label for="username" className="form-label">Email or Username</label>
                        <input type="text" id="username" name="username" className="form-control" placeholder="Enter username"> </input>
                    </div>
                    <div className="mb-3">
                        <label for="password" className="form-label">Password</label>
                        <input type="password" id="password" name="password" className="form-control" placeholder="Enter password"> </input>
                    </div>
                    <button type="submit" className="btn btn-dark w-100">Login</button>
                    <p className="mt-3"><a href="#" className="text-dark">Forgot password?</a></p>
                </form>
                <a href="user.html" className="btn btn-outline-dark mt-3">Skip Login</a>
            </div>
        </div>
    </div>
    </main>
  );
}