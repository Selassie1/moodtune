import React, { useState } from 'react';

const AiChat = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendPrompt = async () => {
    if (!message.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5001/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      const data = await res.json();
      setResponse(data.response || data.error || 'No response');
    } catch (error) {
      console.error(error);
      setResponse('Error connecting to server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>AI Chat</h2>
      <textarea
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        style={styles.textarea}
      />
      <button onClick={sendPrompt} style={styles.button} disabled={loading}>
        {loading ? 'Thinking...' : 'Send'}
      </button>
      <div style={styles.responseBox}>
        <strong>AI:</strong> {response}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '500px',
    margin: '40px auto',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
  },
  textarea: {
    width: '100%',
    fontSize: '1rem',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px'
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  responseBox: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    minHeight: '40px'
  }
};

export default AiChat;
