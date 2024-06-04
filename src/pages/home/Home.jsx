import React from 'react'
import FeaturedProperties from '../../components/featuredProperties/FeaturedProperties'
import Featured from '../../components/featured/Featured'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import Footer from "../../components/footer/Footer";
import MailList from "../../components/mailList/MailList";
import PropertyList from "../../components/propertyList/PropertyList";
import './Home.css'

const Home = () => {
  return (
    <div>
        
        
        <div className="homeContainer">
          <Featured/>
          <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList/>
        <h1 className="homeTitle">Browse by property type</h1>
        <PropertyList/>
        <h1 className="homeTitle">Homes guests love</h1>
          <FeaturedProperties/>
          <MailList/>
        <Footer/>
        </div>
    </div>
  )
}

export default Home