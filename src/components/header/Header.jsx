import React,{useContext, useState} from 'react'
import './Header.css'
import {Link, useNavigate} from "react-router-dom"
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import BedIcon from '@mui/icons-material/Bed';
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';
import FlightIcon from '@mui/icons-material/Flight';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WcIcon from '@mui/icons-material/Wc';
import LuggageIcon from '@mui/icons-material/Luggage';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import {format} from 'date-fns'
import { SearchContext } from '../../context/SearchContext';
// import { AiFillInsurance } from "react-icons/ai";

const Header = ({type}) => {
    
    const [destination, setDestination] = useState("")
    const [openDate, setOpenDate] = useState(false)
    const [openOptions, setOpenOptions] = useState(false)

    const [options, setOptions] = useState({
        adult:1,
        children: 0,
        room:1
    })
    const [dates, setDates] = useState([
        {
            startDate: new Date(),
            endDate:new Date(),
            key: 'selection'
        }
    ])

    
    const handleOption = (name, operation) => {
      setOptions(prev=>{return {
        ...prev, [name]: operation === 'i' ? options[name] + 1: options[name]-1,
      }})
    }
    const navigate = useNavigate()
    const {dispatch} = useContext(SearchContext)

   const handleSearch = () => {
        dispatch({type:"NEW_SEARCH", payload:{ destination, dates, options }})
        navigate("/hotels", {state: {destination,dates,options }} )
   }

   const Options = [
    {
      name: "Stays",
      Icon: LocalHotelIcon,
      link: "/stays"
    },
    {
      name: "Flights",
      Icon: FlightIcon,
      link: "/flights"
    },
    {
      name: "Attractions",
      Icon: BedIcon,
      link: "/attractions"
    },
    {
      name: "Car Rentals",
      Icon: DirectionsCarFilledIcon,
      link: "/car-rentals"
    },
    {
      name: "Airport Taxis",
      Icon: LocalTaxiIcon,
      link: "/airport-taxis"
    },
    {
      name: "Insurance",
      Icon: '',
      link: "/insurance"
    }
  ];
  return (
    <div className='header'>
       <div className={type === "list" ? "headerListContainer listMode" : "headerListContainer" }>
       <div className="headerList">
                      
           {Options.map(option => (
        <Link key={option.name} to={option.link} style={{textDecoration:"none", color:"white", padding:"2px "}}>
          <div className='headerListItem'>
            <option.Icon />
            <span>{option.name}</span>
          </div>
        </Link>
      ))}
     
        </div>
          {type !== "list" && <>
          
          <h1 className="headerTitle">A lifetime of discounts? It's Genius</h1>
          <p className="headerDesc">
            Get rewarded for your travels - unlock instant savings of 10% or more
            with a free APSBooking account
          </p>
          <button className="headerButton" >Sign in /Register</button>
          <div className="headerSearch">
            <div className="headerSearchItems">
            <LuggageIcon  className="headerIcon"/>
            <input type="text" className="headerSearchInput" placeholder='Where are you going?' onChange={(e) => setDestination(e.target.value)}/>
            </div>
            <div className="headerSearchItems">
            <CalendarMonthIcon  className="headerIcon"/>
           <span onClick={()=>setOpenDate(!openDate)} className='headerSearchText'>
            {`${format(dates[0].startDate,"dd/MM/yyyy")} to ${format(dates[0].endDate,"dd/MM/yyyy")}`}</span>
             { openDate && <DateRange 
              editableDateInputs={true}
              onChange={(item) => setDates([item.selection])}
              moveRangeOnFirstSelection={false}
              ranges={dates}
              className="date"
              minDate={new Date()}
             />}
            </div>
            <div className="headerSearchItems">
            <WcIcon  className="headerIcon"/>
           <span onClick={() => setOpenOptions(!openOptions)} className='headerSearchText'>{`${options.adult} adult . ${options.children} children . ${options.room} room`}</span>
             {openOptions && <div className="options">
                <div className="optionItem">
                    <span className="optionText">Adult</span>
                    <div className="optionCounter">
                    <button className="optionCounterButton" onClick={() => handleOption("adult", "d")} disabled={options.adult <= 1}>-</button>
                    <span className="optionCounterNumber">{options.adult}</span>
                    <button className="optionCounterButton" onClick={() => handleOption("adult", "i")}>+</button>
                    </div>
                </div>
                <div className="optionItem">
                    <span className="optionText" >Children</span>
                    <div className="optionCounter">
                    <button className="optionCounterButton" onClick={() => handleOption("children", "d")} disabled={options.children <= 0}>-</button>
                    <span className="optionCounterNumber">{options.children}</span>
                    <button className="optionCounterButton" onClick={() => handleOption("children", "i")}>+</button>
                    </div>
                </div>
                <div className="optionItem">
                    <span className="optionText">Room</span>
                    <div className="optionCounter">
                    <button className="optionCounterButton" onClick={() => handleOption("room", "d")} disabled={options.room <= 1}>-</button>
                    <span className="optionCounterNumber">{options.room}</span>
                    <button className="optionCounterButton" onClick={() => handleOption("room", "i")}>+</button>
                    </div>
                </div>
             </div>}
            </div>
            <div className="headerSearchItems">
           <button className='headerBtn' onClick={handleSearch}>Search</button>
            </div>

          </div>
          
          </>}
       </div>
    </div>
  )
}

export default Header