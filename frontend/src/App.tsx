import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Components/Register';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import AddCourier from './Components/AddCourier';
import DeleteCourier from './Components/DeleteCourier';
import TrackCourier from './Components/TrackCourier';
import Profile from './Components/Profile';
import AdminDashboard from './Components/AdminDashboard';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={< Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-courier" element={<AddCourier />} />
        <Route path="/delete-courier" element={<DeleteCourier />} />
        <Route path="/track-courier" element={<TrackCourier />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;


