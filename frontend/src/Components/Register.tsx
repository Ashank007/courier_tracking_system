import React, { useState,useEffect } from 'react';
import { Link ,useNavigate} from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

interface FormData {
  username: string;
  email: string;
  password: string;
  role: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
    role:'user'
  });
  const [errors, setErrors] = useState({ username: '', email: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    navigate("/dashboard");
  }
}, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let tempErrors = { username: '', email: '', password: '' };
    if (!formData.username) tempErrors.username = 'Username is required';
    if (!formData.email.includes('@')) tempErrors.email = 'Invalid email';
    if (formData.password.length < 6) tempErrors.password = 'Password must be at least 6 characters';
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (validate()) {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message);
      } 
      else if(data.status != true){
        toast.error(data.message);
      }
      else {
        toast.success(data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
    } finally {
      setIsSubmitting(false);
    }
  }
};

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Animated Left Side */}
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
            Keep track of your shipments, stay informed, and streamline your deliveries with ease.
          </p>
          <img
            src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
            alt="Courier Icon"
            className="w-32 mx-auto hover:scale-110 transition-transform duration-300"
          />
        </motion.div>
      </div>

      {/* Right Side Form */}
      <div className="md:w-1/2 flex items-center justify-center p-6 bg-gradient-to-b from-gray-50 to-gray-200">
        <motion.div
          className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-xl shadow-lg p-8 border border-indigo-100 transform -translate-y-1"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Create an account</h2>
          <p className="text-sm text-gray-500 mb-8">Join us and start tracking your couriers</p>

          <form onSubmit={handleSubmit} className="space-y-6" aria-label="Registration form">
            {/* Username */}
            <div className={`flex items-center border rounded-lg ${errors.username ? 'border-red-500' : 'border-gray-300'} bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400`}>
              <div className="px-3 text-gray-400">
                <FaUser />
              </div>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-2 py-2 bg-gray-50 outline-none"
                placeholder="john_doe"
                required
                aria-required="true"
                aria-describedby={errors.username ? 'username-error' : undefined}
              />
            </div>
            {errors.username && (
              <p id="username-error" className="text-red-500 text-xs mt-1 ml-1">
                {errors.username}
              </p>
            )}

            {/* Email */}
            <div className={`flex items-center border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'} bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400`}>
              <div className="px-3 text-gray-400">
                <FaEnvelope />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-2 py-2 bg-gray-50 outline-none"
                placeholder="john_doe@gmail.com"
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

            {/* Password */}
            <div className={`flex items-center border rounded-lg ${errors.password ? 'border-red-500' : 'border-gray-300'} bg-gray-50 focus-within:ring-2 focus-within:ring-blue-400`}>
              <div className="px-3 text-gray-400">
                <FaLock />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-2 py-2 bg-gray-50 outline-none"
                placeholder="john_doe@1234"
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

            {/* Submit Button */}
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
                  Registering...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  Register
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              )}
            </button>
          </form>

          <p className="text-sm text-gray-600 text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Login
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;


