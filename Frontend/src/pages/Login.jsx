import React, { useState } from 'react';
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("")

  const navigate = useNavigate();


  const handleemailChange = (e) => {
    setemail(e.target.value);
  };

  const handlepasswordChange = (e) => {
    setpassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    setError("");
    setSuccess('');
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/auth/login", {
        email,
        password
      }
      )
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setSuccess(res.data.message || "Logged in succesfully");
      setemail("");
      setpassword("");
      navigate('/');
    }
    catch (err) {
      if (err.response) {
        if (err.response.data.errors) {
          setError(err.response.data.errors[0].msg);
        } else if (err.response.data.message) {
          setError(err.response.data.message);
        } else if (err.response.data.error) {
          setError(err.response.data.error);
        } else {
          setError("Login failed.");
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
          Welcome back! Please log in to your account.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleemailChange}
            placeholder="Email"
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={handlepasswordChange}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md py-2 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {error && (
            <div className='rounded-md bg-red-100 border border-red-300 px-4 py-2 text-sm text-red-700'>
              {error}
            </div>
          )
          }
          {success && (
            <div className='rounded-md bg-green-100 border border-green-300 px-4 py-2 text-sm text-green-700'>
              {success}
            </div>
          )
          }
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log In
          </button>
          <p className="text-sm text-gray-600">
            Doesn't have an account yet? <Link to="/signup" className="text-blue-500 underline">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
