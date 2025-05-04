import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface LoginData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const [loginData, setLoginData] = useState<LoginData>({ email: '', password: '' });
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = { email: '', password: '' };
    if (!loginData.email.includes('@')) tempErrors.email = 'Invalid email';
    if (loginData.password.length < 6) tempErrors.password = 'Password must be at least 6 characters';
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Logging in:', loginData);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-600 to-cyan-500 text-white items-center justify-center p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-50"></div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-md text-center space-y-6 relative z-10"
        >
          <h1 className="text-4xl font-bold">Courier Tracking System</h1>
          <p className="text-lg opacity-90">
            Log in to track packages, manage deliveries, and access your dashboard.
          </p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
            alt="Courier Icon"
            className="w-32 mx-auto hover:scale-110 transition-transform duration-300"
          />
        </motion.div>
      </div>

      <div className="md:w-1/2 flex items-center justify-center p-6 bg-gradient-to-b from-gray-50 to-gray-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-indigo-100 transform -translate-y-1"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-sm text-gray-500 mb-8">Login to your account</p>

          <form onSubmit={handleSubmit} className="space-y-6" aria-label="Login form">
            <div className={`flex items-center border rounded-lg ${errors.email ? 'border-red-500 animate-shake' : 'border-gray-300'} bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-400`}>
              <div className="px-3 text-gray-400">
                <FaEnvelope />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={loginData.email}
                onChange={handleChange}
                className="w-full px-2 py-3 bg-gray-50 outline-none"
                placeholder="you@example.com"
                required
                aria-required="true"
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
            </div>
            {errors.email && (
              <p id="email-error" className="text-red-500 text-xs mt-1 ml-1">
                {errors.email}
              </p>
            )}

            <div className={`flex items-center border rounded-lg ${errors.password ? 'border-red-500 animate-shake' : 'border-gray-300'} bg-gray-50 focus-within:ring-2 focus-within:ring-indigo-400`}>
              <div className="px-3 text-gray-400">
                <FaLock />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={loginData.password}
                onChange={handleChange}
                className="w-full px-2 py-3 bg-gray-50 outline-none"
                placeholder="••••••••"
                required
                aria-required="true"
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
            </div>
            {errors.password && (
              <p id="password-error" className="text-red-500 text-xs mt-1 ml-1">
                {errors.password}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white py-3 rounded-xl font-bold text-lg hover:from-indigo-700 hover:to-cyan-600 transition active:scale-95 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  </svg>
                  Logging in...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Login
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              )}
            </button>
          </form>

          <p className="text-sm text-gray-600 text-center mt-6">
            Don’t have an account?{' '}
            <Link to="/" className="text-indigo-600 hover:underline">
              Register
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;


