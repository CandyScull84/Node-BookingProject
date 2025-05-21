import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import logo from './logo.svg';
import './App.css';
import Register from './pages/Register';
import Rooms from './pages/Rooms';
import Login from './pages/Login';
import MyBookings from './pages/MyBookings';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/booking" element={<MyBookings />} />
      </Routes>
      </BrowserRouter>
  
  );
}

export default App;
