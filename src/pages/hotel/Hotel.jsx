import "./Hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
import axios from "axios";
const Hotel = () => {
  const location = useLocation();
  // const id = location.pathname.split("/")[2];
  const { id } = useParams();
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hotel, setHotel] = useState(false);
  
  const [days, setDays] = useState(0)

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates, options } = useContext(SearchContext);

  const fetchHotel = async () => {
      const response = await axios.get(`http://localhost:8800/api/hotels/find-hotel/${id}`,{credentials: true})
      const data = response.data
      setHotel(data)
      console.log(data)
  }

  useEffect(() => { 
    fetchHotel();
  }, [])
  
 
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  const dayDifference = (date1, date2) => {
    if (!date1 || !date2) {
      return 0; // Return 0 if either date is undefined or null
    }
  
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  };
  
  

  
  // Check if dates array is properly defined and has the necessary properties
  useEffect(() => {
    if (Array.isArray(dates) && dates.length > 0 && dates[0].startDate && dates[0].endDate) {
      const days = dayDifference(dates[0].endDate, dates[0].startDate);
      
      setDays(days);
    } else {
      console.log("Dates are not properly defined.");
    }
  }, [dates]);


  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };


  const handleClick = () => {
    if(user){
      setOpenModal(true);
      // navigate("/checkout");
    } else {
      navigate("/login");
    }
  };

  return (
 
  <>
  <div>
  <Navbar/>
    
    <Header type="list" />
    {loading? (
      "loading..."
    ):(
      <>
      <div className="hotelContainer">
        {open && (
          <>
          <div className="slider">
            <FontAwesomeIcon
                icon={faCircleXmark}
                className="close"
                onClick={() => setOpen(false)}
              />
              <FontAwesomeIcon
                icon={faCircleArrowLeft}
                className="arrow"
                onClick={() => handleMove("l")}
              />
              <div className="sliderWrapper">
                <img
                  src={hotel.photos[slideNumber]}
                  
                  alt=""
                  className="sliderImg"
                />
                
              </div>
              <FontAwesomeIcon
                icon={faCircleArrowRight}
                className="arrow"
                onClick={() => handleMove("r")}
              />
          </div>
          </>
        )}
  
        
        <div className="hotelWrapper">
          <button className="bookNow" onClick={handleClick}>Reserve or Book Now!</button>
          <h1 className="hotelTitle">{hotel.name}</h1>
          <div className="hotelAddress">
          <FontAwesomeIcon icon={faLocationDot} />
          <span>{hotel.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location - {hotel.distance} from center
          </span>
          <span className="hotelPriceHighlight">
          Book a stay over ${hotel.cheapestPrice} at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {hotel.photos?.map((photo, index) => (
              <>
              <div className="hotelImgWrapper" key={index}>
                <img src={photo} alt="" className="hotelImg" />
              </div>
              </>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{hotel.title}</h1>
              <p className="hotelDesc">{hotel.desc}</p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {days}-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>${days * hotel.cheapestPrice * options.room}</b> ({days}{" "})
                nights
              </h2>
              <button onClick={handleClick}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList/>
        <Footer/>
      </div>
      </>
    )}
    {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
  </div>
  </>
  )
}

export default Hotel