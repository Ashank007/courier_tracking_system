import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

import {jwtDecode} from "jwt-decode";
import { toast } from 'react-toastify';
const AddCourier: React.FC = () => {
  const [token,setToken] = useState("");
  const [decodeddata,setDecodedData] = useState();

  useEffect(() => {
  const fetchtoken = localStorage.getItem('token');
  setToken(fetchtoken || "");
  },[])

  useEffect(() => {
    decodedata();
  },[token])

  const decodedata = () => {
  if (token) {
  const decoded = jwtDecode(token);
  setDecodedData(decoded || "");
}
}

  const [form, setForm] = useState({
    receiver: '',
    origin: '',
    destination: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateTrackingId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = 'TRK-';
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result; // e.g., "TRK-X7P4Q2"
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trackingId = generateTrackingId();
    const data = {sender:decodeddata?.email,...form,trackingId};
    HandleAddCourier(data);
  };

  const HandleAddCourier = async (courierdata:any) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/courier/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body:JSON.stringify(courierdata)
    });


    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    const data = await response.json();
    console.log(data.status);
    
    if(data.status == true){
      toast.success(data.message);
      setForm({
        receiver: '',
        origin: '',
        destination: '',
      });
    }
  } catch (error:any) {
    console.error('Error:', error.message);
  }
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
              to="/dashboard"
              className="relative text-xl font-medium text-white hover:text-[#BBF7D0] px-3 py-1 transition-all duration-300 text-shadow-sm hover:bg-[#22C55E]/20 rounded-md group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#BBF7D0] transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>
        </div>
      </header>

      {/* Form Section */}
      <div className="flex-grow flex items-center justify-center py-10">
        <div className="max-w-md mx-auto bg-gradient-to-br from-[#DCFCE7] to-[#BBF7D0] p-6 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in">
          <h2 className="text-3xl font-bold text-[#1F2A44] mb-6 text-center text-shadow-sm animate-fade-in">
            Add a Courier
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              value={decodeddata?.email || ''}
              required
              disabled 
              className="w-full px-4 py-2 bg-white/80 border border-[#22C55E]/30 rounded-md text-[#1F2A44] placeholder:text-[#1F2A44]/60 focus:outline-none focus:ring-2 focus:ring-[#22C55E] text-sm font-medium animate-slide-up delay-100"
            />
            <input
              type="email"
              name="receiver"
              placeholder="Receiver Email"
              value={form.receiver}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white/80 border border-[#22C55E]/30 rounded-md text-[#1F2A44] placeholder:text-[#1F2A44]/60 focus:outline-none focus:ring-2 focus:ring-[#22C55E] text-sm font-medium animate-slide-up delay-200"
            />
            <input
              type="text"
              name="origin"
              placeholder="Origin"
              value={form.origin}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white/80 border border-[#22C55E]/30 rounded-md text-[#1F2A44] placeholder:text-[#1F2A44]/60 focus:outline-none focus:ring-2 focus:ring-[#22C55E] text-sm font-medium animate-slide-up delay-300"
            />
            <input
              type="text"
              name="destination"
              placeholder="Destination"
              value={form.destination}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-white/80 border border-[#22C55E]/30 rounded-md text-[#1F2A44] placeholder:text-[#1F2A44]/60 focus:outline-none focus:ring-2 focus:ring-[#22C55E] text-sm font-medium animate-slide-up delay-400"
            />
            <button
              type="submit"
              className="w-full bg-[#22C55E] text-white py-2 rounded-md font-medium text-sm hover:bg-[#16A34A] transition-all duration-300 animate-pulse-hover animate-slide-up delay-500"
            >
              Submit
            </button>
          </form>
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

export default AddCourier;

