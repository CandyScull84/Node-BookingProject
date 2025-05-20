import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
// import logo from './logo.svg';
import './App.css';
import Register from './pages/Register';
import Accommodations from './pages/Accommodations';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/accommodations" element={<Accommodations />} />
      </Routes>
      </BrowserRouter>
  
  );
}

export default App;
