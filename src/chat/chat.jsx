import React, { useState, useEffect } from 'react';

export function Chat() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:4000');

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = (event) => {
      console.log("Received message:", event.data);
      setMessages(prev => [...prev, event.data]);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(input);
      setInput("");
    } else {
      console.error("WebSocket is not open. Ready state:", socket.readyState);
    }
  };

  return (
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
        {messages.map((msg, idx) => (
          <div key={idx} className="chat-message" style={{ marginBottom: '0.5rem' }}>
            {msg}
          </div>
        ))}
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
  );
}
