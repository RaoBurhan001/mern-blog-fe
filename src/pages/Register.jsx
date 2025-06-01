// src/pages/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Register = () => {
  const { registerUser, error } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await registerUser(form);
    setLoading(false);
    if (success) navigate('/dashboard');
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="card bg-white rounded shadow"
        style={{ width: '100%', maxWidth: '600px', minWidth: '350px', padding: '2.5rem 2rem' }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Register
        </h2>

        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md w-full px-3 py-2 bg-gray-100 focus:border-indigo-500 focus:bg-white outline-none transition"
            placeholder="Your name"
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md w-full px-3 py-2 bg-gray-100 focus:border-indigo-500 focus:bg-white outline-none transition"
            placeholder="you@example.com"
          />
        </div>

        {/* Password Field */}
        <div className="mb-4">
          <label htmlFor="password" className="block font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md w-full px-3 py-2 bg-gray-100 focus:border-indigo-500 focus:bg-white outline-none transition"
            placeholder="********"
          />
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className={`btn w-full ${loading ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
