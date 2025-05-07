import React from 'react';

interface PackageCardProps {
  packageName: string;
  status: string;
}

const PackageCard: React.FC<PackageCardProps> = ({ packageName, status }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Transit':
        return 'bg-yellow-500';
      case 'Delivered':
        return 'bg-green-500';
      case 'Pending':
        return 'bg-gray-400';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-transform transform hover:scale-105">
      <h3 className="text-xl font-semibold text-gray-800">{packageName}</h3>
      <p className="text-gray-600">Status: <span className={`text-white py-1 px-3 rounded-full ${getStatusColor(status)}`}>{status}</span></p>
      <button className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition">
        Track Package
      </button>
    </div>
  );
};

export default PackageCard;


