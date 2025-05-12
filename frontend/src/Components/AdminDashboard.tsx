import React, { useEffect, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import StatusTimeline from './StatusTimeline';

interface Courier {
  id: number;
  trackingId: string;
  sender: string;
  receiver: string;
  status: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

const statusColors: Record<string, string> = {
  Pending: 'bg-yellow-200 text-yellow-800',
  'In Transit': 'bg-blue-200 text-blue-800',
  Delivered: 'bg-green-200 text-green-800',
  Cancelled: 'bg-red-200 text-red-800',
  Booked: 'bg-purple-200 text-purple-800',
  'Picked Up': 'bg-indigo-200 text-indigo-800',
  'Out for Delivery': 'bg-orange-200 text-orange-800',
};

const AdminDashboard: React.FC = () => {
  const [couriers, setCouriers] = useState<Courier[]>([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCouriers, setFilteredCouriers] = useState<Courier[]>([]);
  const [expandedCourierId, setExpandedCourierId] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token || "");
  }, []);

  useEffect(() => {
    if (!token) return;

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/courier/all`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setCouriers(data.message || []);
        setFilteredCouriers(data.message || []);
        setLoading(false);
      });
  }, [token]);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredCouriers(couriers);
    } else {
      setFilteredCouriers(
        couriers.filter(courier =>
          courier.trackingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          courier.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
          courier.receiver.toLowerCase().includes(searchQuery.toLowerCase()) ||
          courier.user.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, couriers]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const toggleTimeline = (courierId: number) => {
    setExpandedCourierId(prev => (prev === courierId ? null : courierId));
  };

  const updateCourierStatus = (courierId: number, newStatus: string) => {
    setCouriers(prev =>
      prev.map(courier =>
        courier.id === courierId ? { ...courier, status: newStatus } : courier
      )
    );
  };

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading couriers...</p>;

  return (
    <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">Admin Courier Dashboard</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="mb-4 flex justify-center relative">
        <input
          type="text"
          placeholder="Search by Tracking ID, Sender, Recipient, or User Name"
          className="px-12 py-3 border border-gray-300 rounded-lg w-1/2 focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer" onClick={handleClearSearch}>
            <FaTimes className="text-gray-500" />
          </div>
        )}
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg bg-white p-6">
        <table className="min-w-full border-separate border-spacing-2 text-sm">
          <thead className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <tr>
              <th className="px-4 py-2">Tracking ID</th>
              <th className="px-4 py-2">Sender</th>
              <th className="px-4 py-2">Recipient</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">User Name</th>
              <th className="px-4 py-2">User Email</th>
              <th className="px-4 py-2">Timeline</th>
            </tr>
          </thead>
          <tbody className="bg-white text-gray-800">
            {filteredCouriers.map(courier => (
              <React.Fragment key={courier.id}>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-2">{courier.trackingId}</td>
                  <td className="px-4 py-2">{courier.sender}</td>
                  <td className="px-4 py-2">{courier.receiver}</td>
                  <td className={`px-4 py-2 rounded-lg ${statusColors[courier.status]}`}>
                    {courier.status}
                  </td>
                  <td className="px-4 py-2">{courier.user.name}</td>
                  <td className="px-4 py-2">{courier.user.email}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => toggleTimeline(courier.id)}
                      className="text-sm text-green-600 hover:underline"
                    >
                      {expandedCourierId === courier.id ? 'Hide Timeline' : 'View Timeline'}
                    </button>
                  </td>
                </tr>
                {expandedCourierId === courier.id && (
                  <tr>
                    <td colSpan={7}>
                      <StatusTimeline
                        courierId={courier.id}
                        isAdmin
                        onStatusChange={(newStatus) => updateCourierStatus(courier.id, newStatus)}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;


