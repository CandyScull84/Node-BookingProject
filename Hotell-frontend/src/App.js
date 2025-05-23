import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import logo from './logo.svg';
import Home from './pages/Home';
import Header from './components/Header';
import './App.css';
import Register from './pages/Register';
import Rooms from './pages/Rooms';
import AdminRooms from './pages/AdminRooms';
import AdminUsers from './pages/AdminUsers';
import Login from './pages/Login';
import MyBookings from './pages/MyBookings';
import { useEffect, useState } from 'react';
import socket from './utils/socket';
import SnackbarAlert from './components/SnackbarAlert';
import useCurrentUser from './hooks/useCurrentUser';

function App() {
  const [ notif, setNotif ] = useState('');
  const currentUser = useCurrentUser();

  useEffect(() => {
    socket.on('connect', () => {
      console.log('🟢 Socket ansluten:', socket.id);
    });

    socket.on('bookingCreated', (data) => {
      console.log('📢 Ny bokning:', data);
      setNotif(`Ny bokning: ${data.type} – Rum ${data.roomId}`);
    });

    socket.on('bookingUpdated', (data) => {
    if (currentUser?.role === 'Admin') {
      setNotif(`Bokning uppdaterad av ${data.updatedBy}`);
    }
    });

    socket.on('bookingDeleted', (data) => {
    if (currentUser?.role === 'Admin') {
      setNotif(`Bokning raderad av ${data.deletedBy}`);
    }
    });

    return () => {
      socket.off('connect');
      socket.off('bookingCreated');
      socket.off('bookingUpdated');
      socket.off('bookingDeleted');
    };
  }, [currentUser]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/booking" element={<MyBookings />} />
        <Route path="/admin/rooms" element={<AdminRooms />} />
        <Route path="/admin/users" element={<AdminUsers />} />
      </Routes>
       <SnackbarAlert
        open={!!notif}
        message={notif}
        severity="info"
        onClose={() => setNotif('')}
      />
      </BrowserRouter>
  
  );
}

export default App;
