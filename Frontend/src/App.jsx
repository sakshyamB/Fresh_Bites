import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home'
import MyOrder from './pages/MyOrder'
import Order from './pages/Order';
import Menu from './pages/Menu';
import Statistics from './pages/Statistics';
import Promos from './pages/Promos';

const App = () => {
  return (
    <div className="w-full h-full">
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path= '/myorder' element={<MyOrder/>}/>
      <Route path='/dashboard' element={<Order/>}/>
      <Route path='/menu' element={<Menu/>}/>
      <Route path='/stats' element={<Statistics/>}/>
      <Route path='/promos' element={<Promos/>}/>
    </Routes>
    </div>
  );
};

export default App;
