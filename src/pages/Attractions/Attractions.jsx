import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import './attractions.css'
const Attractions = () => {

  return (
    <>
    <Navbar/>
    <Header/>
    <div className="train">
        <img src="https://promos.makemytrip.com/images/VandeBharat-tb-dt-050523.webp" alt="" className=""  />
    </div>

    <div className="booking">
      <h1>Book tickets for Vande Bharat Express with us hassle-free & enjoy comfortable train journeys.</h1>

      <div className="items">
    <button className="btn">NORTH</button>
    <button className="btn">SOUTH</button>
    <button className="btn">CENTRAL</button>
    <button className="btn">WEST</button>
    <button className="btn">EAST</button>
</div>

    </div>
    </>
  )
}

export default Attractions