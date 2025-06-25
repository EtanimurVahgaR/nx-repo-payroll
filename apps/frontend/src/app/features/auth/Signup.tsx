import React, { useState } from 'react';

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    companyName: '',
    password: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.companyName || !form.password) {
      setError('Name, Email, Company Name, and Password are required.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/auth/client-signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json();
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return <div className="p-4 text-green-600">Signup successful!</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Client Signup</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          type="text"
          name="name"
          placeholder="Name*"
          value={form.name}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 border rounded"
          type="email"
          name="email"
          placeholder="Email*"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 border rounded"
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 border rounded"
          type="text"
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 border rounded"
          type="text"
          name="companyName"
          placeholder="Company Name*"
          value={form.companyName}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 border rounded"
          type="password"
          name="password"
          placeholder="Password*"
          value={form.password}
          onChange={handleChange}
        />
        {error && <div className="text-red-600">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Signup;
