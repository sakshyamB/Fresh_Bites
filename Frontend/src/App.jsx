import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home'
import Order from './pages/Order'

const App = () => {
  return (
    <div className="w-full h-full">
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path= '/order' element={<Order/>}/>
    </Routes>
    </div>
  );
};

export default App;
