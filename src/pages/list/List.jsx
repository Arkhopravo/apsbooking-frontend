import React,{useState, useEffect} from 'react'
import './List.css'
import Header from '../../components/header/Header'
import Navbar from '../../components/navbar/Navbar'
import {useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import { DateRange } from 'react-date-range'
import SearchItem from '../../components/searchItems/SearchItems'
import useFetch from "../../hooks/useFetch";
import axios from 'axios'

const List = () => {

  const location = useLocation()
  const [destination, setDestination] = useState(location.state.destination)
  const [dates, setDates] = useState(location.state.dates)
  const [opendate, setOpendate] = useState(false)
  const [options, setOptions] = useState(location.state.options)
  const [min, setMin] = useState(undefined)
  const [max, setMax] = useState(undefined)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  // const { data, loading, error, reFetch} = useFetch(`http://localhost:8800/hotels/hotels?city=${destination}`
  // )

const fetchHotels = async () => {
  const response = await axios.get(`http://localhost:8800/api/hotels/hotels?city=${destination}`,
   {credentials: true})
   const data = response.data
   setItems(data)

} 
  useEffect(() => {
    fetchHotels();
  }, [destination])
  
  const handleClick = () => {
        
  }
  return (
    <div>
      <Navbar/>
      <Header type="list"/>
      <div className='listContainer'>
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className='lsTitle'>Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input type="text" placeholder={destination}/>
            </div>
            <div className="lsItem">
              <label>Check-in-date</label>
              <span onClick={()=> setOpendate(!opendate)}>
              {`${format(dates[0].startDate,"dd/MM/yyyy")} to ${format(dates[0].endDate,"dd/MM/yyyy")}`}
              </span>
              {opendate && 
               ( <DateRange onChange={(item) => setDates([item.selection])} minDate={new Date()}
              ranges={dates}
              />)}
            </div>
            <div className="lsItem">
              <label htmlFor="">Options</label>
              <div className="lsOptionItem">
                <span className='lsOptionText'>Min Price <small> Per NIght</small></span>
                <input type="number" onChange={e=>setMin(e.target.value)} className='lsOptionInput' />
              </div>
            </div>
            <div className="lsItem">
              <label htmlFor="">Options</label>
              <div className="lsOptionItem">
                <span className='lsOptionText'>Max Price <small> Per NIght</small></span>
                <input type="number" onChange={e=>setMin(e.target.value)} className='lsOptionInput' />
              </div>
            </div>
            <div className="lsItem">
              <label htmlFor="">Options</label>
              <div className="lsOptionItem">
                <span className='lsOptionText'>Adult </span>
                <input type="number" min={1} className='lsOptionInput' placeholder={options.adult}/>
              </div>
            </div>
            <div className="lsItem">
              <label htmlFor="">Options</label>
              <div className="lsOptionItem">
                <span className='lsOptionText'>Children </span>
                <input type="number" min={0} className='lsOptionInput' placeholder={options.children}/>
              </div>
            </div>
            <div className="lsItem">
              <label htmlFor="">Options</label>
              <div className="lsOptionItem">
                <span className='lsOptionText'>Room </span>
                <input type="number" min={1} className='lsOptionInput' placeholder={options.room}/>
              </div>
            </div>
          <button onClick={handleClick}>Search</button>
          </div>
            <div className="listResult">
              {/* {loading ? "loading" : <>
              </>} */}
              {/* {items.map(item=>(
            <SearchItem item={item} key={item._id}/>
              ))} */}
               {/* <SearchItem /> */}

               {/* {items} */}
               {loading ? "loading..." : 
                <>
                {items.map(item => (
                  <>
                   <SearchItem item={item} key={item._id}/>
                  </>
                ))}
                </>
               }
            </div>
        </div>
      </div>
    </div>
  )
}

export default List