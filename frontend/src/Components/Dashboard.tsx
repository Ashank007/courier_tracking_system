import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
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
          <nav role="navigation" className="flex items-center">
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-6 items-center">
              <Link
                to="/dashboard"
                className="relative text-xl font-medium text-white hover:text-[#BBF7D0] px-3 py-1 transition-all duration-300 text-shadow-sm hover:bg-[#22C55E]/20 rounded-md group"
                onClick={closeMenu}
              >
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#BBF7D0] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                to="/profile"
                className="relative text-xl font-medium text-white hover:text-[#BBF7D0] px-3 py-1 transition-all duration-300 text-shadow-sm hover:bg-[#22C55E]/20 rounded-md group"
                onClick={closeMenu}
              >
                Profile
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#BBF7D0] transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="inline-flex items-center bg-[#DC2626] text-white px-5 py-2 rounded-md font-medium text-sm hover:bg-[#B91C1C] transition-all duration-300 shadow-sm animate-pulse-hover"
              >
                Logout
              </button>
            </div>
            {/* Hamburger Icon for Mobile */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-white hover:text-[#BBF7D0] focus:outline-none focus:ring-2 focus:ring-[#22C55E] p-2 rounded-md animate-pulse-hover"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              )}
            </button>
          </nav>
        </div>
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-[#14532D] text-white flex flex-col items-center py-4 animate-slide-up">
            <Link
              to="/dashboard"
              className="text-lg font-medium text-white hover:text-[#BBF7D0] px-4 py-2 transition-all duration-300 text-shadow-sm hover:bg-[#22C55E]/20 rounded-md w-full text-center animate-slide-up delay-100"
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link
              to="/profile"
              className="text-lg font-medium text-white hover:text-[#BBF7D0] px-4 py-2 transition-all duration-300 text-shadow-sm hover:bg-[#22C55E]/20 rounded-md w-full text-center animate-slide-up delay-200"
              onClick={closeMenu}
            >
              Profile
            </Link>
            <button
              onClick={() => {
                handleLogout();
                closeMenu();
              }}
              className="inline-flex items-center justify-center bg-[#DC2626] text-white px-5 py-2 rounded-md font-medium text-sm hover:bg-[#B91C1C] transition-all duration-300 shadow-sm animate-pulse-hover animate-slide-up delay-300 w-full"
            >
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-10 text-center relative z-10">
        <h2 className="text-4xl font-bold text-[#1F2A44] mb-3 tracking-tight animate-fade-in">
          Track with Ease
        </h2>
        <p className="text-lg text-[#1F2A44] max-w-md mx-auto font-medium leading-relaxed animate-fade-in delay-100">
          Ship, track, and manage your deliveries seamlessly.
        </p>
      </section>

      {/* Action Grid */}
      <main className="container mx-auto px-6 pb-6 relative z-10 flex-grow">
        <h3 className="text-2xl font-bold text-[#1F2A44] mb-6 text-center animate-fade-in delay-200">
          Your Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Add Courier */}
          <div className="bg-gradient-to-br from-[#DCFCE7] to-[#BBF7D0] p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-102 animate-slide-up delay-100">
            <div className="flex items-center mb-3">
              <svg
                className="w-8 h-8 text-[#22C55E] mr-3"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2zm-3 10h-3v3a1 1 0 01-2 0v-3H8a1 1 0 010-2h3V8a1 1 0 012 0v3h3a1 1 0 010 2z" />
              </svg>
              <h4 className="text-xl font-bold text-[#1F2A44]">Add Courier</h4>
            </div>
            <p className="text-[#1F2A44] mb-4 text-sm font-medium">
              Create a new courier with a unique tracking ID.
            </p>
            <Link
              to="/add-courier"
              className="inline-flex items-center bg-[#22C55E] text-white px-5 py-2 rounded-md font-medium text-sm hover:bg-[#16A34A] transition-all duration-300 animate-pulse-hover"
            >
              Add Now
            </Link>
          </div>

          {/* Track Courier */}
          <div className="bg-gradient-to-br from-[#DCFCE7] to-[#BBF7D0] p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-102 animate-slide-up delay-200">
            <div className="flex items-center mb-3">
              <svg
                className="w-8 h-8 text-[#22C55E] mr-3"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l5.447-2.724A1 1 0 0021 13.382V2.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <h4 className="text-xl font-bold text-[#1F2A44]">Track Courier</h4>
            </div>
            <p className="text-[#1F2A44] mb-4 text-sm font-medium">
              Monitor your package’s journey in real-time.
            </p>
            <Link
              to="/track-courier"
              className="inline-flex items-center bg-[#22C55E] text-white px-5 py-2 rounded-md font-medium text-sm hover:bg-[#16A34A] transition-all duration-300 animate-pulse-hover"
            >
              Track Now
            </Link>
          </div>

          {/* Delete Courier */}
          <div className="bg-gradient-to-br from-[#DCFCE7] to-[#BBF7D0] p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-102 animate-slide-up delay-300">
            <div className="flex items-center mb-3">
              <svg
                className="w-8 h-8 text-[#22C55E] mr-3"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4a2 2 0 012 2v2H8V5a2 2 0 012-2z" />
              </svg>
              <h4 className="text-xl font-bold text-[#1F2A44]">Delete Courier</h4>
            </div>
            <p className="text-[#1F2A44] mb-4 text-sm font-medium">
              Remove a courier from your records.
            </p>
            <Link
              to="/delete-courier"
              className="inline-flex items-center bg-[#22C55E] text-white px-5 py-2 rounded-md font-medium text-sm hover:bg-[#16A34A] transition-all duration-300 animate-pulse-hover"
            >
              Delete Now
            </Link>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8">
          <h3 className="text-2xl font-bold text-[#1F2A44] mb-4 text-center animate-fade-in delay-400">
            Recent Activity
          </h3>
          <div className="bg-gradient-to-br from-[#DCFCE7] to-[#BBF7D0] p-5 rounded-lg shadow-sm animate-slide-up delay-400">
            <ul className="space-y-3">
              <li className="text-sm font-medium text-[#1F2A44]">
                Shipment #123 added on May 7, 2025
              </li>
              <li className="text-sm font-medium text-[#1F2A44]">
                Shipment #456 tracked on May 6, 2025
              </li>
              <li className="text-sm font-medium text-[#1F2A44]">
                Shipment #789 deleted on May 5, 2025
              </li>
            </ul>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#14532D] text-white py-4 text-center mt-auto animate-fade-in delay-500">
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
      `}</style>
    </div>
  );
};

export default Dashboard;

