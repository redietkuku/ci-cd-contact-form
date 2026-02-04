import React, { useState } from 'react';

function App() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Submission failed');
      }

      setStatus('Message sent successfully ✅');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', fontFamily: 'Arial' }}>
      <h2>Contact Us</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <br /><br />

        <textarea
          name="message"
          placeholder="Message"
          value={form.message}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button disabled={loading}>
          {loading ? 'Sending...' : 'Submit'}
        </button>
      </form>

      {status && <p>{status}</p>}
    </div>
  );
}

export default App;
