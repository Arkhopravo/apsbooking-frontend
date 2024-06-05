
import React, { useContext } from 'react';
import {Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/home/Home';
import List from './pages/list/List';
import Hotel from './pages/hotel/Hotel';
import Login from './pages/login/Login';
import Reserve from './components/reserve/Reserve';
import { AuthContext } from './context/AuthContext';
import AdminProfile from './admin/AdminProfile';
import Client from './client/Client';
import AirportTexis from './pages/AirportTexis/AirportTexis';
import Cars from './pages/Cars/Cars';
import Flights from './pages/Flights/Flights';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import Stays from './pages/Stays/Stays';
import Attractions from './pages/Attractions/Attractions';

function App() {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  

  return (
    <>
  
   
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/airport-taxis" element={<AirportTexis/>}/>
      <Route path="/car-rentals" element={<Cars/>}/>
      <Route path="/flights" element={<Flights/>}/>
      <Route path='/attractions' element={<Attractions/>} />
      <Route path="/stays" element={<Stays/>}/>
      <Route path="/hotels" element={<List/>}/>
      <Route path="/hotels/:id" element={<Hotel/>}/>
      <Route path="/hotels/:id/reserve" element={<Reserve/>}/>
      <Route path="/login" element={<Login/>}/>
      {user?.role === 'admin'? 
      
        <Route path="/admin-profile" element={<AdminProfile/>}/> : <Route path="/client-profile" element={<Client/>}/>
    }
    </Routes>
</>
  );
}

export default App;
