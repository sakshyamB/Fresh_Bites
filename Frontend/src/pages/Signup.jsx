import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsANDconditions, setTermsANDconditions] = useState(false);
  const [role, setRole] = useState('');
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    setError("");
    setSuccess("");
    e.preventDefault();

    try {
      const res = await axios.post(
        `${API_URL}/auth/signup`,
        {
          username,
          email,
          password,
          confirmPassword,
          role,
          termsANDconditions,
        }
      );

      setSuccess(res.data.message || "Account created successfully!");

      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("");
      setTermsANDconditions(false);

      navigate('/login')

    } catch (err) {
      if (err.response) {
        if (err.response.data.errors) {
          setError(err.response.data.errors[0].msg);
        } else if (err.response.data.message) {
          setError(err.response.data.message);
        } else if (err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError("Signup failed.");
        }
      } else {
        setError("Server is not responding.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-rose-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-amber-600">Fresh Bites</h1>
        <p className="mt-2 text-sm text-amber-500">
          Create your account and start ordering right away.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Full Name"
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md py-2 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full border border-gray-300 rounded-md py-2 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              aria-label={showConfirmPassword ? 'Hide confirmation password' : 'Show confirmation password'}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div>
            <select
              value={role}
              id="role"
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <input
              type="checkbox"
              checked={termsANDconditions}
              onChange={(e) => setTermsANDconditions(e.target.checked)}
              id="terms"
              className="mr-2"
              required
            />
            <label htmlFor="terms">
              I agree to the <Link to="/terms" className="text-blue-500 underline">terms</Link> and <Link to="/conditions" className="text-blue-500 underline">conditions</Link>
            </label>
          </div>

          {error && (
            <div className="rounded-md bg-red-100 border border-red-300 px-4 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          {success && (
            <div className="rounded-md bg-green-100 border border-green-300 px-4 py-2 text-sm text-green-700">
              {success}
            </div>
          )}

          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>

          <p className="text-sm text-gray-600">
            Already have an account? <Link to="/login" className="text-blue-500 underline">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
