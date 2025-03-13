import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../app.css';

export function Home() {
  const navigate = useNavigate();
  const [quote, setQuote] = useState("Loading...");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    async function fetchQuote() {
      try {
        const response = await fetch("/api/quote");
        const data = await response.json();

        if (data.quote) {  // ✅ Ensure quote is valid
          setQuote(data.quote);
          setAuthor(data.author);
        } else {
          setQuote("No quote available");
          setAuthor("Unknown");
        }
      } catch (error) {
        setQuote("Failed to fetch quote.");
        setAuthor("");
      }
    }

    fetchQuote();
  }, []);

  return (
    <main className="container-fluid bg-secondary text-center vh-100">
      <div className="left-side">
        <div className="col-md-6 d-flex flex-column justify-content-center bg-black text-white p-5">
          <h1>Welcome to GameLog</h1>
          <p>"{quote}"</p>
          <p>{author ? `- ${author}` : ""}</p>
        </div>
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

      <footer>
        <div className="footer">
          <div className="container">
            <p>Miles Johnson: <a href="https://github.com/kilom3ters/cs260startup/tree/main">GitHub Repository</a></p>
          </div>
        </div>
      </footer>
    </main>
  );
}
