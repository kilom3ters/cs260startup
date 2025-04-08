import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function Chat() {
  const navigate = useNavigate();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4000');

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = (event) => {
        if (event.data instanceof Blob) {
          event.data.text().then((text) => {
            console.log("Converted message:", text);
            setMessages((prev) => [...prev, text]);
          }).catch((err) => {
            console.error("Error converting Blob to text:", err);
          });
        } else {
          console.log("Received message:", event.data);
          setMessages((prev) => [...prev, event.data]);
        }
      };      

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    console.log("Attempting to send message:", input);
    if (socket && socket.readyState === WebSocket.OPEN) {
      try {
        socket.send(input);
        setInput("");
      } catch (err) {
        console.error("Error while sending message:", err);
      }
    } else {
      console.error("WebSocket is not open. Ready state:", socket ? socket.readyState : 'No socket');
    }
  };

  return (
    <>
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
        <button 
          onClick={() => navigate("/user")} 
          className="btn btn-secondary mb-3"
        >
          Back to User Page
        </button>
      </div>
      <div className="chat-container" style={{ maxWidth: '600px', margin: '0 auto', padding: '1rem' }}>
        <h2>Chat</h2>
        <div 
          className="chat-messages"
          style={{
            border: '1px solid #ccc',
            borderRadius: '4px',
            height: '300px',
            overflowY: 'scroll',
            marginBottom: '1rem',
            padding: '0.5rem'
          }}
        >
          {messages && messages.length > 0 ? (
            messages.map((msg, idx) => (
              <div key={idx} className="chat-message" style={{ marginBottom: '0.5rem' }}>
                {msg}
              </div>
            ))
          ) : (
            <p>No messages yet.</p>
          )}
        </div>
        <div className="chat-input" style={{ display: 'flex' }}>
          <input 
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ flex: 1, padding: '0.5rem' }}
          />
          <button onClick={sendMessage} style={{ padding: '0.5rem 1rem', marginLeft: '0.5rem' }}>
            Send
          </button>
        </div>
      </div>
    </>
  );
}
