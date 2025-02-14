import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../app.css';

export function Home() {
  const navigate = useNavigate();

  return (
    <main className="container-fluid bg-secondary text-center vh-100">
      <div className="left-side">
        <div className="col-md-6 d-flex flex-column justify-content-center bg-black text-white p-5">
          <h1>Welcome to GameLog</h1>
          <p>This is the best place for connecting with friends, tracking your favorite games, and more.</p>
        </div>
      <div className="right-side">
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center p-5">
          <button onClick={() => navigate('/login')} className="btn btn-dark btn-lg w-50 mb-3">
            Create an Account
          </button>
          <button onClick={() => navigate('/login')} className="btn btn-outline-dark btn-lg w-50">
            Login
          </button>
        </div>
      </div>
      </div>
      
    </main>
  );
}
