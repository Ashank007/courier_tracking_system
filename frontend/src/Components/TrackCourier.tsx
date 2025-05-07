import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Define interface for courier objects from API
interface Courier {
  id: number;
  tracking_id: string;
  sender: string;
  receiver: string;
  origin: string;
  destination: string;
  status: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

const TrackCourier: React.FC = () => {
  const [trackingId, setTrackingId] = useState('');
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [couriers, setCouriers] = useState<Courier[]>([]);
  const [couriersError, setCouriersError] = useState<string | null>(null);
  const [token, setToken] = useState<string>('');
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  // Fetch token from localStorage on mount
  useEffect(() => {
    const fetchToken = localStorage.getItem('token');
    if (fetchToken) {
      setToken(fetchToken);
    } else {
      setCouriersError('Please log in to view your couriers.');
      navigate('/login');
    }
  }, [navigate]);

  // Fetch courier list when token is available
  useEffect(() => {
    if (!token) return;

    const fetchCouriers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/courier/get`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
          },
        });

        if (response.status === 401 || response.status === 403) {
          setCouriersError('Session expired. Please log in again.');
          localStorage.removeItem('token');
          navigate('/login');
          return;
        }

        const data = await response.json();

        if (data.status && Array.isArray(data.message)) {
          setCouriers(data.message);
          if (data.message.length === 0) {
            setCouriersError('No couriers available.');
          }
        } else {
          setCouriersError('Failed to load couriers.');
        }
      } catch (err) {
        console.error('Fetch couriers error:', err);
        setCouriersError('Network error. Please try again later.');
      }
    };

    fetchCouriers();
  }, [token, navigate]);

  const handleCardClick = (courier: Courier, index: number) => {
    setTrackingId(courier.tracking_id);
    setSelectedCardIndex(index);
    setStatus(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId) {
      setError('Please select a courier.');
      return;
    }

    setStatus(null);
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/courier/${trackingId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setStatus(data.status);
      } else if (response.status === 401 || response.status === 403) {
        setError('Session expired. Please log in again.');
        localStorage.removeItem('token');
        navigate('/login');
      } else if (response.status === 404) {
        setError('Courier not found.');
      } else {
        setError(data.error || 'Failed to track courier.');
      }
    } catch (err) {
      console.error('Track courier error:', err);
      setError('Network error. Please try again later.');
    } finally {
      setIsLoading(false);
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

      {/* Main Content */}
      <div className="flex-grow py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1F2A44] mb-8 text-center text-shadow-sm animate-fade-in">
            All Couriers are Listed Below
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {couriers.map((courier, index) => (
                <div
                  key={courier.tracking_id}
                  onClick={() => handleCardClick(courier, index)}
                  className={`p-5 bg-white/80 border ${
                    selectedCardIndex === index ? 'border-[#22C55E] bg-[#DCFCE7]' : 'border-[#22C55E]/30'
                  } rounded-md cursor-pointer hover:bg-[#DCFCE7] hover:shadow-md transition-all duration-300 animate-slide-up delay-100 min-h-[180px] flex flex-col justify-between`}
                  style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                >
                  <div>
                    <div className="flex justify-between items-center mb-3 pb-2 border-b border-[#22C55E]/20">
                      <h3 className="text-lg font-semibold text-[#1F2A44] truncate" title={courier.tracking_id}>
                        {courier.tracking_id}
                      </h3>
                      <span
                        className={`text-sm font-medium px-2 py-1 rounded-full ${
                          courier.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : courier.status === 'In Transit'
                            ? 'bg-blue-100 text-blue-800'
                            : courier.status === 'Delivered'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {courier.status}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 text-sm">
                      <div className="flex justify-between">
                        <span className="font-medium">Sender:</span>
                        <span className="truncate max-w-[200px]" title={courier.sender}>
                          {courier.sender}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Receiver:</span>
                        <span className="truncate max-w-[200px]" title={courier.receiver}>
                          {courier.receiver}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Origin:</span>
                        <span>{courier.origin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Destination:</span>
                        <span>{courier.destination}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-xs text-[#1F2A44]/70">
                    <p>Created: {new Date(courier.created_at.replace(' ', 'T') + 'Z').toLocaleString()}</p>
                    <p>Updated: {new Date(courier.updated_at.replace(' ', 'T') + 'Z').toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
            {couriersError && (
              <div className="mt-6 p-2 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md text-sm font-medium animate-slide-up delay-200 max-w-md mx-auto">
                {couriersError}
              </div>
            )}
         </form>
          {isLoading && (
            <div className="mt-6 p-4 bg-[#DCFCE7] border-l-4 border-[#22C55E] text-[#1F2A44] rounded-md text-sm font-medium animate-slide-up delay-300 flex items-center max-w-md mx-auto">
              <svg
                className="animate-spin h-5 w-5 mr-3 text-[#22C55E]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Loading...
            </div>
          )}
          {error && (
            <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-md text-sm font-medium animate-slide-up delay-300 max-w-md mx-auto">
              {error}
            </div>
          )}
          {status && !error && (
            <div className="mt-6 p-4 bg-[#DCFCE7] border-l-4 border-[#22C55E] text-[#1F2A44] rounded-md text-sm font-medium animate-slide-up delay-300 max-w-md mx-auto">
              Status: {status}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#14532D] text-white py-4 text-center mt-auto animate-fade-in delay-400">
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
      `}</style>
    </div>
  );
};

export default TrackCourier;

