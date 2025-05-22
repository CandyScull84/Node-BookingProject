import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import logo from './logo.svg';
import Header from './components/Header';
import './App.css';
import Register from './pages/Register';
import Rooms from './pages/Rooms';
import AdminRooms from './pages/AdminRooms';
import Login from './pages/Login';
import MyBookings from './pages/MyBookings';


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/admin/rooms" element={<AdminRooms />} />
        <Route path="/booking" element={<MyBookings />} />
      </Routes>
      </BrowserRouter>
  
  );
}

export default App;
