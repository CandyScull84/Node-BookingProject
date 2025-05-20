import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
// import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* Add other routes here */}
      </Routes>
      </BrowserRouter>
  
  );
}

export default App;
