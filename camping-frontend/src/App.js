import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
// import logo from './logo.svg';
import './App.css';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      </BrowserRouter>
  
  );
}

export default App;
