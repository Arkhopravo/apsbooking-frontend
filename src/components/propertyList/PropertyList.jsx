import React from 'react'
import useFetch from "../../hooks/useFetch";
import "./PropertyList.css";

const PropertyList = () => {
    const { data, loading, error } = useFetch("http://localhost:8800/api/hotels/countByType");

 
    console.log(data)
  return (
    <div className="pList">
         {loading ? (
        "loading"
      ) : (
        <>
       

              {data && data.map((item, index) => (
                <>
                <div className="pListItem" key={index}>
                  <img src={item.photo} alt="" className='pListImg' />
                  <div className="pListTitles">
                    <h1>Types: {item.type}</h1>
                    <h2>Available: {item.count}</h2>
                  </div>
                </div>

                </>
              ) )}
            
        </>
        )}
    </div>
  )
}

export default PropertyList