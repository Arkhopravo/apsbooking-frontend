
import React from 'react';
import {Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home';
import List from './pages/list/List';
import Hotel from './pages/hotel/Hotel';
import Login from './pages/login/Login';
import Reserve from './components/reserve/Reserve';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/hotels" element={<List/>}/>
      <Route path="/hotels/:id" element={<Hotel/>}/>
      <Route path="/hotels/:id/reserve" element={<Reserve/>}/>
      <Route path="/login" element={<Login/>}/>
    </Routes>
  );
}

export default App;
