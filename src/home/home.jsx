import React from 'react';

export function Home() {
  return (
    <main className='container-fluid bg-secondary text-center'>
      <div><div className="left-side d-flex flex-column justify-content-center bg-black text-white p-5">
                <h1>Welcome to GameLog</h1>
                <p>This is the best place for connecting with friends, tracking your favorite games, and more.</p>
            </div>
        
            <div className="right-side d-flex flex-column justify-content-center align-items-center p-5">
                <a href="login.html" className="btn btn-dark btn-lg w-50 mb-3">Create an Account</a>
                <a href="login.html" className="btn btn-outline-dark btn-lg w-50">Login</a>
            </div></div>
    </main>
  );
}