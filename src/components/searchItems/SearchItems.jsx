import { Link } from "react-router-dom";
import "./SearchItems.css";

const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img src="https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=" alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.distance}m from center</span>
        <span className="siTaxiOp">Free airport taxi</span>
        <span className="siSubtitle">
          Studio Apartment with Air conditioning
        </span>
        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
        <div className="siDetailTexts">
          <span className="siPrice">${item.cheapestPrice}</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
          <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>




//     <div className="mySearcgContainer">
//          <div className="searchItem">
//       <img src="https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=" 
//       alt=""
//       className="siImg"/>
//       <div className="siDesc">
//       <h1 className="siTitle">CostaRica</h1>
//       <span className="siDistance">20km from center</span>
//       <span className="siTaxiOp">Free airport taxi</span>
//            <span className="siSubtitle">
//              Studio Apartment with Air conditioning
//            </span>
//            <span className="siFeatures">Entire Studio * 1 bathroom 21sq.m full bed</span>
//            <span className="siCancelOp">Free cancellation </span>
//            <span className="siCancelOpSubtitle">
//              You can cancel later, so lock in this great price today!
//            </span>
//       </div>

//       <div className="siDetails">
//         <div className="siRating">
//           <span>Excellent</span>
//           <button>8.9</button>
//         </div>
//         <div className="siDetailTexts">
//         <span className="siPrice">$60k</span>
//              <span className="siTaxOp">Includes taxes and fees</span>
//              <Link to="">
//              <button className="siCheckButton">See availability</button>
//              </Link>
//         </div>
    
//            </div>
//     </div>

//     <div className="searchItem">
//       <img src="https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=" 
//       alt=""
//       className="siImg"/>
//       <div className="siDesc">
//       <h1 className="siTitle">CostaRica</h1>
//       <span className="siDistance">20km from center</span>
//       <span className="siTaxiOp">Free airport taxi</span>
//            <span className="siSubtitle">
//              Studio Apartment with Air conditioning
//            </span>
//            <span className="siFeatures">Entire Studio * 1 bathroom 21sq.m full bed</span>
//            <span className="siCancelOp">Free cancellation </span>
//            <span className="siCancelOpSubtitle">
//              You can cancel later, so lock in this great price today!
//            </span>
//       </div>
//       <div className="siDetails">
//       <span className="siPrice">$45k</span>
//              <span className="siTaxOp">Includes taxes and fees</span>
//              <Link to="">
//              <button className="siCheckButton">See availability</button>
//              </Link>
//            </div>
//     </div>

//     <div className="searchItem">
//       <img src="https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=" 
//       alt=""
//       className="siImg"/>
//       <div className="siDesc">
//       <h1 className="siTitle">CostaRica</h1>
//       <span className="siDistance">20km from center</span>
//       <span className="siTaxiOp">Free airport taxi</span>
//            <span className="siSubtitle">
//              Studio Apartment with Air conditioning
//            </span>
//            <span className="siFeatures">Entire Studio * 1 bathroom 21sq.m full bed</span>
//            <span className="siCancelOp">Free cancellation </span>
//            <span className="siCancelOpSubtitle">
//              You can cancel later, so lock in this great price today!
//            </span>
//       </div>
//       <div className="siDetails">
//       <span className="siPrice">$60k</span>
//              <span className="siTaxOp">Includes taxes and fees</span>
//              <Link to="">
//              <button className="siCheckButton">See availability</button>
//              </Link>
//            </div>
//     </div>
//     <div className="searchItem">
//       <img src="https://cf.bstatic.com/xdata/images/xphoto/square300/57584488.webp?k=bf724e4e9b9b75480bbe7fc675460a089ba6414fe4693b83ea3fdd8e938832a6&o=" 
//       alt=""
//       className="siImg"/>
//       <div className="siDesc">
//       <h1 className="siTitle">CostaRica</h1>
//       <span className="siDistance">20km from center</span>
//       <span className="siTaxiOp">Free airport taxi</span>
//            <span className="siSubtitle">
//              Studio Apartment with Air conditioning
//            </span>
//            <span className="siFeatures">Entire Studio * 1 bathroom 21sq.m full bed</span>
//            <span className="siCancelOp">Free cancellation </span>
//            <span className="siCancelOpSubtitle">
//              You can cancel later, so lock in this great price today!
//            </span>
//       </div>
//       <div className="siDetails">
//       <span className="siPrice">$50k</span>
//              <span className="siTaxOp">Includes taxes and fees</span>
//              <Link to="">
//              <button className="siCheckButton">See availability</button>
//              </Link>
//            </div>
//     </div>
    
//     </div>
  );
};

export default SearchItem;
