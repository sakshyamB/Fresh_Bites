import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home'
import MyOrder from './pages/MyOrder'
import Order from './pages/Order';
import Menu from './pages/Menu';
import Statistics from './pages/Statistics';
import Promos from './pages/Promos';

const getUserRole = () => {
  try {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    return String(storedUser.role || storedUser.usertype || '').toLowerCase();
  } catch {
    return '';
  }
};

const RequireAdmin = ({ children }) => {
  const token = localStorage.getItem('token');
  const isAdmin = getUserRole() === 'admin';

  return token && isAdmin ? children : <Navigate to='/login' replace />;
};

const App = () => {
  const userRole = getUserRole();
  const isAdmin = userRole === 'admin';

  return (
    <div className="w-full h-full">
      <Routes>
        <Route path='/' element={isAdmin ? <Navigate to='/dashboard' replace /> : <Home />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/myorder' element={<MyOrder/>} />
        <Route path='/dashboard' element={<RequireAdmin><Order /></RequireAdmin>} />
        <Route path='/menu' element={<RequireAdmin><Menu /></RequireAdmin>} />
        <Route path='/stats' element={<RequireAdmin><Statistics /></RequireAdmin>} />
        <Route path='/promos' element={<RequireAdmin><Promos /></RequireAdmin>} />
      </Routes>
    </div>
  );
};

export default App;
