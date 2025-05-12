import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


const timelineSteps = ['Pending', 'Booked', 'Picked Up', 'In Transit', 'Out for Delivery', 'Delivered', 'Cancelled'] as const;
type Status = (typeof timelineSteps)[number];

interface StatusTimelineProps {
  courierId: number;
  isAdmin?: boolean;
  onStatusChange?: (newStatus: Status) => void;
}

const StatusTimeline: React.FC<StatusTimelineProps> = ({ courierId, isAdmin = false, onStatusChange }) => {
  const [currentStatus, setCurrentStatus] = useState<Status>('Booked');
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/courier/${courierId}`, {
      headers: {
        "Authorization": `${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setCurrentStatus(data.message.status);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [courierId]);

  const handleStatusChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as Status;
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/courier/${courierId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${token}`
        },
        body: JSON.stringify({ id: courierId, status: newStatus })
      });

      const data = await res.json();
      if (data.status === true) {
        setCurrentStatus(newStatus);
        toast.success(data.message)
        onStatusChange?.(newStatus);
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      alert("Error updating status");
    }
  };

  if (loading) return <p className="text-gray-500">Loading status...</p>;

  return (
    <div className="w-full mt-4 mb-6 bg-gray-50 p-4 rounded-xl shadow-inner">
      <h2 className="text-md font-semibold mb-2">Courier Status Timeline</h2>
      <div className="flex items-center justify-between mb-4">
        {timelineSteps.map((step, idx) => {
          const isActive = timelineSteps.indexOf(currentStatus) >= idx;
          return (
            <div key={step} className="flex-1 flex flex-col items-center relative">
              <div className={`w-6 h-6 rounded-full z-10 ${isActive ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className="text-xs mt-2 text-center">{step}</span>
              {idx !== timelineSteps.length - 1 && (
                <div className="absolute top-3 left-1/2 w-full h-1 bg-gray-300 z-0" />
              )}
            </div>
          );
        })}
      </div>
      {isAdmin && (
        <div className="mt-2">
          <label className="block text-sm font-medium mb-1">Update Status</label>
          <select
            value={currentStatus}
            onChange={handleStatusChange}
            className="w-full border px-4 py-2 rounded-md shadow-sm"
          >
            {timelineSteps.map(status => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default StatusTimeline;


