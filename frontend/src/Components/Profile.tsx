import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    total_couriers_added:0,
    total_couriers_deleted:0
  });
  const [token,setToken] = useState("");

  useEffect(() => {
  const fetchtoken = localStorage.getItem('token');
  setToken(fetchtoken || "");
  },[])

const HandleProfileData = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/info`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    const data = await response.json();
    console.log(data);
    
    setUser(data.message);
  } catch (error:any) {
    console.error('Error:', error.message);
  }
};

const HandleEditProfileData = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/user/edit`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body:JSON.stringify(form)
    });

    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    const data = await response.json();
    
    setUser(data.message);
  } catch (error:any) {
    console.error('Error:', error.message);
  }
};

  useEffect(() => {
      HandleProfileData();
  },[token])
  
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    username: user.username,
    email: user.email,
  });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setForm({ username: user.username, email: user.email });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ ...user, username: form.username, email: form.email });
    HandleEditProfileData();
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0FDF4] to-[#BBF7D0] text-[#1F2A44] relative overflow-hidden flex flex-col">
      {/* Background Wave Pattern */}
      <div className="absolute inset-0 opacity-10 bg-wave-pattern animate-wave-drift"></div>

      {/* Header */}
      <header className="bg-gradient-to-r from-[#14532D] to-[#22C55E] text-white shadow-md sticky top-0 z-20 border-b border-[#22C55E]/30">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <svg
              className="w-8 h-8 text-white animate-spin-slow"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c2.76 0 5.26-1.12 7.07-2.93L12 12v-2c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2v2l7.07-7.07C19.26 3.12 16.76 2 14 2z" />
            </svg>
            <h1 className="text-3xl font-bold tracking-tight text-shadow-sm">
              GreenTrack
            </h1>
          </div>
          <nav className="flex space-x-6">
            <Link
              to="/"
              className="relative text-xl font-medium text-white hover:text-[#BBF7D0] px-3 py-1 transition-all duration-300 text-shadow-sm hover:bg-[#22C55E]/20 rounded-md group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#BBF7D0] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Profile Section */}
      <div className="container mx-auto px-6 py-10">
        {/* Profile Card */}
        <div className="max-w-2xl mx-auto bg-gradient-to-br from-[#DCFCE7] to-[#BBF7D0] p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in border border-[#22C55E]/30">
          <h2 className="text-4xl font-bold text-[#1F2A44] mb-6 text-center text-shadow-sm animate-fade-in">
            Your Profile
          </h2>
          <div className="flex justify-center mb-6">
            <svg
              className="w-16 h-16 text-[#22C55E] animate-fade-in"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2a7.2 7.2 0 01-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 01-6 3.22z" />
            </svg>
          </div>
          {!isEditing ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="text-base font-medium text-[#1F2A44] animate-slide-up delay-100">
                <span className="font-bold">Username:</span> {user.username}
              </div>
              <div className="text-base font-medium text-[#1F2A44] animate-slide-up delay-200">
                <span className="font-bold">Email:</span> {user.email}
              </div>
              <div className="flex space-x-4 mt-6 col-span-2 animate-slide-up delay-400">
                <button
                  onClick={handleEditToggle}
                  className="flex-1 bg-[#22C55E] text-white py-2 rounded-md font-medium text-sm hover:bg-[#16A34A] transition-all duration-300 animate-pulse-hover"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex-1 bg-[#22C55E] text-white py-2 rounded-md font-medium text-sm hover:bg-[#16A34A] transition-all duration-300 animate-pulse-hover"
                >
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSave} className="space-y-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/80 border border-[#22C55E]/30 rounded-md text-[#1F2A44] placeholder:text-[#1F2A44]/60 focus:outline-none focus:ring-2 focus:ring-[#22C55E] text-base font-medium animate-slide-up delay-100"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white/80 border border-[#22C55E]/30 rounded-md text-[#1F2A44] placeholder:text-[#1F2A44]/60 focus:outline-none focus:ring-2 focus:ring-[#22C55E] text-base font-medium animate-slide-up delay-200"
              />
              <div className="flex space-x-4 mt-6 animate-slide-up delay-300">
                <button
                  type="submit"
                  className="flex-1 bg-[#22C55E] text-white py-2 rounded-md font-medium text-sm hover:bg-[#16A34A] transition-all duration-300 animate-pulse-hover"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={handleEditToggle}
                  className="flex-1 bg-[#22C55E] text-white py-2 rounded-md font-medium text-sm hover:bg-[#16A34A] transition-all duration-300 animate-pulse-hover"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>

        {/* User Stats Section */}
        <div className="mt-8 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-[#1F2A44] mb-4 text-center animate-fade-in delay-500">
            User Stats
          </h3>
          <div className="bg-gradient-to-br from-[#DCFCE7] to-[#BBF7D0] p-6 rounded-lg shadow-sm animate-slide-up delay-500 border border-[#22C55E]/30">
            <ul className="space-y-3">
              <li className="text-base font-medium text-[#1F2A44] bg-white/10 p-2 rounded-md hover:bg-[#22C55E]/10 transition-all duration-300">
                Couriers Added: {user.total_couriers_added}
              </li>
              <li className="text-base font-medium text-[#1F2A44] bg-white/10 p-2 rounded-md hover:bg-[#22C55E]/10 transition-all duration-300">
                Couriers Deleted: {user.total_couriers_deleted}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#14532D] text-white py-4 text-center mt-auto animate-fade-in delay-600">
        <p className="text-sm font-medium">
          All Rights Reserved for GreenTrack
        </p>
      </footer>

      {/* Custom Styles */}
      <style>{`
        .bg-wave-pattern {
          background-image: url('data:image/svg+xml,%3Csvg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23FFFFFF" fill-opacity="0.2"%3E%3Cpath d="M0 10c5 5 10-5 15 0s10 15 15 10 10-15 15-10v20H0z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');
        }
        @keyframes wave-drift {
          0% { background-position: 0 0; }
          100% { background-position: 40px 40px; }
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(15px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-hover {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-wave-drift {
          animation: wave-drift 25s linear infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        .animate-pulse-hover {
          animation: pulse-hover 1.5s infinite ease-in-out;
        }
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
        .text-shadow-sm {
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
        .delay-500 {
          animation-delay: 0.5s;
        }
        .delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </div>
  );
};

export default Profile;

