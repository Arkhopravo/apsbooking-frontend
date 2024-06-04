
import React, { useContext } from 'react';
import {Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home';
import List from './pages/list/List';
import Hotel from './pages/hotel/Hotel';
import Login from './pages/login/Login';
import Reserve from './components/reserve/Reserve';
import { AuthContext } from './context/AuthContext';
import AdminProfile from './admin/AdminProfile';
import Client from './client/Client';

function App() {
  const { user } = useContext(AuthContext);


  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/hotels" element={<List/>}/>
      <Route path="/hotels/:id" element={<Hotel/>}/>
      <Route path="/hotels/:id/reserve" element={<Reserve/>}/>
      <Route path="/login" element={<Login/>}/>
      {user?.role === 'admin'? 
      
        <Route path="/admin-profile" element={<AdminProfile/>}/> : <Route path="/client-profile" element={<Client/>}/>
    }
    </Routes>
  );
}

export default App;
