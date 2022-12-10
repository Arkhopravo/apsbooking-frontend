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
import { useContext, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";
const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  
  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { dates, options } = useContext(SearchContext);
 
  // const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  // function dayDifference(date1, date2) {
  //   const timeDiff = Math.abs(date2.getTime() - date1.getTime());
  //   const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
  //   return diffDays;
  // }

  // const days = dayDifference(dates[0].endDate, dates[0].startDate);

  

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
    <div>
    <Navbar />
    <Header type="list" />
    {loading ? (
      "loading"
    ) : (
      <div className="hotelContainer">
        {open && (
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
                src={data.photos[slideNumber]}
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
        )}
        <div className="hotelWrapper">
          <button className="bookNow" onClick={handleClick}>Reserve or Book Now!</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location - {data.distance}m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ${data.cheapestPrice} at this property and get a
            free airport taxi
          </span>
          {/* <div className="hotelImages">
            {data.photos?.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src="https://cf.bstatic.com/xdata/images/city/max500/957801.webp?k=a969e39bcd40cdcc21786ba92826063e3cb09bf307bcfeac2aa392b838e9b7a5&o="
                  // src={photo}
                  alt=""
                  className="hotelImg"
                />
              </div>
            ))}
          </div> */}
          <div className="hotelImages">
            
            <img src="https://thumbs.dreamstime.com/b/hotel-room-27254393.jpg"/>
            <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVEhgVFRYYGBgaGBoZGhkYGBoaGRoYGBgZGRoYGhocIS4lHB4rIRkYJjgmKy8xNTU1GiQ7QDszPy40NTEBDAwMEA8QHxISHjQsJCs0NDY0NDQ0NDQ2NDQ0NDQ0NDY0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAMIBAwMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAQIDBAUGBwj/xABMEAACAQIDBAYGBQkFBQkAAAABAhEAAwQSIQUxQVEGImFxgZETMkKhsdEUUnLB8AcjJGKCkqKy4TNzs8LSFWSTo/E0Q1NjdIOUw+L/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAnEQACAgEDBAEEAwAAAAAAAAAAAQIREgMhMRMiQVEyYXGBkQQU0f/aAAwDAQACEQMRAD8A1gFOKKAFKUV5h0jr+y4/BX8CpSb9PwN4qOglSPEfjzp+3uH43VcQJad1BhQtmlNVkES6KistTXFRnWpaKRGYURFOstIIqShuKEUuKKKQBRRgUcUYFAwgtKAowKWBSAIClAUpRRxQAkCnFoopaimA4tOCm1pc0yQjSDSzSYoAKKEUcUIoAKKOjoUAIoGlUk0AFRGlGk0AFQo4oUqAgAUtRSRTi0gHLehp9FiRTKCpSDcfCriJji0uiApSrpWiIY060w61LZabZKGikyEy0grUtkpllqGh2R4oRTrCkxUMoRloAUuKMCgAgtKAoAUsCgYYFKilKtHFAhIWjAo4owKYAApVACjoECio6FMAooUKFFAFQoGklqAFUk0kvy93zpi7i0X1mAPIatSAkFvxupBflr3fOq27tQeys9rH7hUK/jnbe0DkugoAvMx5DzFCszQpASNjY/N+bcy4Gh+uo4/aGk+B41cLWKS42hBggyp4gjj+OZrT7NxwuJqIcaMvbzHNTw/pVSj5QkyzQ1LtGQR41CQ1KsvRFg0SVNKVopnNyilBuz8eE1omTQstSWoBhSopiGGFNstSStIZKlopMiMlNkVLZKbZKlopMYilAUrLSgKihhAUtRRgUYFMBS0ZFEKBNAgUBSSaBNACpoTTRehNAUO5qE02ppi7jEXew7h1j7tPOiwJk0nNy17vnuqpu7V+qvi2vuGlQb2Kd/WYkctw8hRYF3fxaLvYTyHWPyFQb21Pqr4tr7hVXNETSsB+7i3bexjkNB5CmCaSTQLUAHNCajX8UiCXdVHNmA+NHhcUlxcyOGWSJBkSN9AD9ChQpAU9upuFuFHVl35gverMAQfPzqDadZidd3HfIHxYVMsQwRwZUvbE/wDuKONbEmuU03hNoW2uvZVpdFVnWDIVpymYjWDpM0sVlNkMRtXGsPZGG/w2kVEFdlNm2IoqcK8aSVqqFYYc86UH7vx3UiKKnYUO+k/E/Oh6QU0aKaVhQ9n7aKo9y4FEsQo5sQB5mo3+1bMx6VP3h8alzBInlaGSm7N1WEqwYc1II8xToaixhZaUBRg0sGkAiKSakLFM4nEIm/fG4CnQrERQIqBiNon2QB361Au3mb1mJ+HlupDLS9i0X2p7Bqfdp76g3dpH2VjtbX3DT41CakkUALu4h29ZiezcPIU2KFCkAljSc1UYxWKu2xcQIiHOQFVr1zKj5GbLKiZ9kZieAqXiNhoEZ8RiMRcVQWKq3o1PYEtgEk6AAmnsuWA9i9pWrX9pcROxmAPlvqvbpGjD80l26NwZEISftvAFW2zdj4dM2XDojKcpOUM3qq05zqdGHjNO49A7AejN1QGR06sBXCyZYgEgDcDMMewFZRvgeLKf9Of1bNqyOd187RzyoCPM01c2RcZiuIxzg6ErZVUyqxIBZtSASCATEwa0FrEIoW2uYsoAFs5i+UDeS5nLp65McJmoAZWW81pXYu2a5IDMxAVRbRZCwUUdbNlhpBadDN/YMUR36KYZEdyhdgjHNcdnMgGDBMe6q7oR/wBmH2m+IqwG2XbD3bxS56NVZWLqgedUfKFPstoQw5kHSDA6Dr+ij7TfGn3YvJ+hOrVGjoUqKOpAzKPAZ+TXD5Oh/wAtXuyLEYW0Txa0fO8lZhn/ADPeWPmX+Vb7B2QMLZHbY/xENWwJ4WsI2Paxi9o3lGYq2DXLMTnKoRMcnroy2a53j8MCdpn/AHrZ6eGe3NVpRttEzZ0a2ji2upJyLqdTORZOvbNMuXGTXfmnQGeoxHDmAavTYEAdh+AqPicN6scAf5GH305ackrEpIqBdcejmDmR2bT6gUiIOm803ZxbG3ad1GZ8s5ZABNn0hiZO/TuqXiUy5OzD3z5ejH31DxtvJaw394P8Ir91Q7S/RWwdzGgLOU+zpP1ig/z+6qfE9JVhlRGzgx1oyjt0Mnu0p/EPvHL0Pva18qyd/wBe6e1/v+VZSk0aJIfvYsvmZ2LtC6nd1jw5DsFBgM/j8Aar7T7xz9HU9tQG7CfMf1rJlIXh7sddGKtAMqYbVo8RpurR7G25ncWrkBzORhoHjeCOD9m48I3Vi7bER9m3/iCrDCLOItjh+cJ/4b/0pxk0xNWdDFKFUFu42UQSOqu4kcJ++nrN59TnbTN2+3cjf2AeVadRCwLwVV7SPX8B8TSreKeQMwO7gOIed3cKgDENcGZgJ1GgIEAkDfVZpixaG3NNmlNRRQSIIoopzLQyUwG4oop3JQKUAUXRi8GwlvVpHpSFSM0LcYM0ESfXGm6CNDUv6ZcZbhXfbYJlZQvso+ZwwkHrgCCB1c0wYEPoviB9DtaOG9E7LkFvM4RjmC5tSQzQAYHfwW5DW86uXFx8rlA6PkLMoICEFhlSArAkAzqRDDW7+5S4A+HfOt6HVCjs9sJbF1LoGkuwzMPX1Db1WOqYqXhc6hEvMqkIc+Rus9xmBLhQJCzmJni3ISXDJy5FPFj6UvC5YyiCdCZ0bWI3HcK/C7YKm3mV4vKXfJZctackBFcgNJ3ru0yLpBqfkh8CsyDE9S4Lg9GUZHuKzE3GVotljqYQSpIEMsRxVhrVs4l7y2rispyl1VRMooa04BJYDKpkbiY0IMjB4l1Z0xHoypIBeYR4kMSrCM5HowVWQDx3gFsdbiKqF0US7KlxCtwhnZxLFjm0YSQJBJnWRQ9kIVtTZyOlxsjKuU3Gl2Adk6wPow2WZUSxEwI4yKvoOv6Iv2m+NWG3sEq2LxA/PuHKMvrgEajNvCBZB4RpviYnQdf0RftN/MaqPwJfJfxQp3LQpAc9U5kAEiRAzI6CTnOpYCPXGu6ug4TFD0eHTMpOe2IVlbVXUnVSRuBNWXRm2lu2UAAEgADgAiqB+6qjuWrzD27YMhEBmZyrM85jfWiSlwS20Gidlc9vgRtEkwPp+CkncApsn511NWWNIrIdHcFbv3toK6yBjUbQkda3btOhkciBXRCGL2fgzlKzT4TFC4zZZhYBke1LBhPMRB7RUm79xqHgLKpcdVEEBJ7RBCnthQFn9QVKvHX9lv8ALWktoiXJSbZuR/8AExB99qoe3ni3hvtA/wAH9aVt46x/ud/42qi9IW/M4bvB81FcU5bP8G0Vx+Ssu3JI7TY9z2qzbv1rx/Wue5nq7L/2ffh/e9kVQOYa/wDbufzPWEuDVDVp9eH/AHfAfKrC23UU/q/Kq+wZMAcU3GpaOMij9X/TWbQ0Rlcch6qc/rjtqz2cfz69iXD/AAx99VQjfB3IN/aDyq02UJvzytP72SnwI0St1e4f5BUrBpJYc8/ue586gA/m37v/AK1qbgLoFz/ifzvSXI3wX+E2auaSPZUjv1+ZqNc2cq5gohQTA3/HtmrDBYtWgT7K/D+tRjjlKMebN8a6mtPFUY3LLcz921BptUqXicSDwpmyZNQi2Glqad+j1ZYTCyKnDA1ai3wQ5JGfNimLqQCTWhxGFCgk6ACSewb6we1ukuHYlEuDLzhhPdpuoxaDJDPR/ZqNgcNdyy620IYIrMBPWKypMwW0G88Cd9phMMrIWa2VlmhWZjoGZVuQdzsoDTEjNvmScUtywqhVxV1VUQqi64UAbgAN1Ntcw534u4e+89Nwsaka9bis5tl3YEshttGZSq5tdMzIVI1JIMgS2aBKxlgOrRozKRMldYgSV3geMVgmTCHfiWPfeb50g4bAnfenvvt/qpdP7/oMjc4V3Fxi0JaCqqJKaMCxZurOkFQNfZOg4q2hi0Ftuql3TVGdRmXiAGBDGOBgHnWC+g7O4uh77p/1U6mD2dwNn/if/qjpq73/AEGRohtGyLOIRGRU9EcmbLbbOyPmt5TDNlhdTxciTGjPQd4wqg82/mNVK4bAf+R++vzq1wePw1tAiPaVRuAdY1M86bVLaxWavLRVQDbdv/xU/fX50KmmMv8ABXIXQnf21LXFHnVcHpXpKkosVxzc6X0bwyJiL7B3zXWFxkJGXMFySsCdy7iTVHdxQB38ahHarB3IzKFZVDhjo0MrQMsaq5G+de6tYWnZnKiH0p6XXE2jixYusmSyluVykFrQZm0YESGuuP2DWw6JbUe9g7Fy45d3s3yzGATlvKo0AA3QK5/tHZNlraXsrM1x3zG2BnYuHbK+dl1lSZ4k7jM1FbpucHbt2LGHMW7bIxxEo4Ny4XICq5kRk137+FdDuS2I4e50bbt7rr/6S5/MlRtuXpw+FPYh/wCXNcuxv5RsRcIJtWhCG3pn9ViCfa36CtPsvpD9LwdosoRrblGj1TlRipWSTGUrM8Qa5tTSlGLbNYyTdDz7TU3rdkAyPQSQdBD2GMjuZf3hUO+IuXx+u/8AEWP31W7Lu5sRefl6IT2tctsY/ZS0PCpu0Xi7e7wfNAaznFJ0XF2KwwWG6y6Zd8ydwgQD91LcgADkInuIFVaXd+o3rz5d1P8ApOoNfZGvlUMaF4G2btzIh1KqddBAANaTZmAdGZmy6qFEEnmTw7vKs/0Wy+ldySSioABoOujAzI13CtXh8SsHfz1A0B4TNPEVj9zRG7m/kI+6kpch/wB/+d6r8btMZgkCDIPiCOHGDTuHxSOxGYBoeAXWTJzHTTdnHnWcoNblKSJb4+6ktbUuZURlZtMgMwuvKlYW63o1nlV9s7Cqlp7rDMAgaBGuW2CQKrLmItKipBkDfpr4U1FxVvyJyT2RDZiTTtlmUjqnwE0jAZrrMUSQumrLx03EzzrQ4HZjZZdIaRAzAwOeh31ok3wS2lyT9k3Ay/OrSoti3DMOQWO7X7walV36Kajuc0nbMvt3pHZUYjDnMtxbbBZWVZmtyACJjeN4FcSxiZTFdF6QYZcTjMTlfKUNtQYkEhSrT4qR86yW2cPdw4DOMyEkZkMxpPqkTFcr1+9wNlprGzJ3mpP0ZyCQjEDfodO3uqxbaiEzAU88gnvlR76mLiOsjqxMopMniWcd4OVUPjVvVaXAlFPyZhjSDWpcW3JLIhneSBJ7ZAB99D6NYI/sk82+dL+zH0x9J+zK0BWqTCWQZFpPHM3uYke6p2HwbuMltVDOcqABVBaRvIGggHWh/wAleEHSflmJFOLU7anR/E4YTfsuizAfRkP7akqO4mahIK6LMhUUKVQoA7KGoyaZU1X7T21askq5OYAGIOskDQnTjPgeVcRvZE2higtwLO9hVPj8Vcz3E+kZFtutwKHUAPIA3bzpHhUPGYkXcQGQ9ViNOUjj7qxm0MKbVxkJBKmJAiurSS9mUmbHZm1cuIRjdDuiZluPiVRUYnIQqsSGbLlGhHVnlVbjcULm0We7ctstw9dy4dVVlKMxI9YqNQBO4VlooRW9eSLNnjLGzhGXEq8IfUw1xesDokkCZ161Sbm18HZtKmGe40gs8W8vXIILa6RlgdmUnjWFrR7BtIcPePo2a4Q6qyqTlBSDJ3Df76znFJb2xxe+xf7EA+jM4bNndnmI3NbWI7Mpp/aj/nLnaE/kAqH0VYvhQoQnKzrMqBqyvGpnjyq1xOzXuPmkJ1VEbzpx0ri1U82jpj8UVFob5/V+FGtyVjuHwq2TYGslzvB0UcBHE08mwEA9Zz4j7hU0xkHoq3Wu6iSLenYEaT8POpu37ziwfRqWYldASuk8wRUd9hIplM06H1m3gQNR2TTGJe96vW0Hf3akdlWubIfozy7ZytluI6sp3q8kHlDH4GmdqYk3LgZCzqEAGaRBzMfaHbv7a6J0RtZEe6QA7NkLQM2VAJE/aLeVTtpbEw2IkvbCv9e31H7zGjftA1spxu6IcXVELB9OrwsMmT0ilMgJ9GpXqBeDCT2RWet7fLsVd1tr9Zkc+GVA5p3aHQq/bOfDuLoGoE5Lg7tYPmO6qLEYy4jZMQhYj2bmdSO6CNKWKa23C2jrHQ1FW2xF+3eJO+02aIJ0YQCN43itWmNjWNfdXnu3ctE5w723G7IpMH9Vs8+8Vf4Dbu0La5kuelQaDP6O5PbObP8AxVDgk7uh3Z2R75LZlYroARCkECdNe/hyp67jzBywDGhOuvdXL8B+Ucg5cRYIPFrbefUeI/eNaTAdK8LegLeRWOmV+o08hnifCadzQqiyrt4C7ZNxnly7hiUBaRrru0Ms07+FZnpfj2CoUfIVYnIQZcwOqR56azOldPMEVXY3Y1i6Ze2pbTraq2kx1lg6SY5TWMIJTzZo23GjhePtj0zqo0zkATumZ0HIz5V0/Y+Lm2ixoFVRpoAAAN9KxX5OsMzBka7bIM6MHEzOuYEnzqws9GAg6l198wwDD3QffVfye+Kx8C0+1uxyxaRmgIvaQg+Mb659tbaBu4h23BWKKOSKSo89Se0muk4fZzoQZDAcAzL3CNwHjWWufk/fMWW+upJh0PEz6wb7q59HTavI1lL0Zy0ZMVtejtgm7aCLJQO+vNQqE/8AMNUz9EMUm4I/2Hg/xhfjWg6NYTEpcVnslMqupJK5YYpoApP1JmfvqsXkhZKjoV4KLZzKWGXrLGadNRHHuFcB6WjCtiWfBn824DFcjpkeTmUK6iF3GBoJI0iu9XGLIAGymNY51zvbv5NLly492zeUs7M5RkKDMxk5WBMSSTBHHgK74v0crOXZaFP4nDvbdrdxWV1JVlK7iDu0399FVgdRFYHpczC4VKZUMhdFjtYFd28TqTWwxe0QOqGC/XfdlB4D9c+7fynLdK9rW76JbTPCH7KkRHVnWe2ONc8FvZpLfZFV0dwz3r6JbUu0zlAliBqWPId/ACom1dj33xN2EJKsc0EGI0M5Sd0VM2O4tOXclRm0mRMjUg6T/wBa0ssEd0UsSZC7mO6SdZneee6iev05bL/Bw0JS2M5sn8n+Kvozg20VSobOXzDM2X1VUnmfCrTBfkrxLmXuIqZWIcDNmAOXRZB1J4xTZ27iAJsYhrQ0kK+r6esyhQND2ca1nRfbWNdit68bi5QSHVcwUsOtKgELI0J3nQca26rcb8kT0sZUzj2Ow/o7rpM5HZZiJysVmOG6tX0NtFrL7vXjzVaze2j+lX/765/O1bH8n6g2bkx/acfsrV6r7CYfIt9h7MNlGUEENcZwAuUKGCjKNdwy1craNKsgU+B+Na4pO3bOhKhlbfZTotU6q06tSMjHDAiCD4VCvYRl3ARzjXyq6TSlK2u6k1YrMjsnbtov6JX1JJWVgE8QNd/H/pV+t2uOO/WJHOfvkVpdjdLGSEvyy8HGrD7QHrDtGvfvrq6dLYyy33OgrdijxHo7q5LyK6/rCY7uR7qr8PilZQyMGUiQQZBHfTuesyinx/Qay8thrjWz9R+ungfWXxzVk9pdH8Th9blolR7addO8keqPtAV0ZXp+3jWFWptCcUcws7XbJli2V7UEeSwvupy2LDzndkPYnVHcAW08q3m0NiYXEyXQI59tOo88zHVY/aBrJbV6EX0lrDi8v1dEuAdxOVvAgnlTWL42E7X1IWCu37Z/RLt2BvyZ0WTzQ9Unvmrux01x1nS/bW4BxZCjE/bXq/w1hjcdHIOZHGhGqsOw7iKkPtW6wg3HjcYMSO2Inxq3B/RkqSOmYL8ouHbS7buWzGpEOk94hv4a0uzds4fEf2N1HO/KDDjvQww8q5JgtmWbiZldzPE5ZUjgVA+/uNVV+y1q4Vb1lIIYadoZTWWMW2lyVbStnoFRS1Sud9AelVx7ow19s+ZT6N21bMozFGb2gVDEE69XeZEdHVqiUXF0y07Ww4lupVu0Kjo9SEeiNEuyZbQU+pqIj04boAreMkjJohYzo7hbzm5cw9t3aJYgEmAAJ8AB4UKf+mrzoVXVXsMWcRxFpgnVGcGCVJGaRMkFtDM6iRuGu6sXtHHAXSyAqRplI9WBB4mdZNX22795mFiyrHMBmYA7iYieA51IXoRZtib964T+pbIUHlmKt74pRxS7ird9pjv9oOWViSYYGO4zVkek1werp21prPRfBgghL79jOgU9+WD8Kt3wFpcPcRLKWka2ys+ZAwUiJL6nj7RilLpSq1ZpGeorpnL7e0HSckITvK+t4MZZfAitf0P6UMn6OyjryM6jrlmKsXc73PV3nUDsEVAXombjDISlvXru6uXHB0VVWARwJmtNsrYFixJXMzFcpZiJ1IOgjq7o0rWbi4mKTs53tY/pF3+9f+dq23QCy3oHJBALyJBAIyjUcxV3hdn2x1giAnrEhRJJ1kneTVpZQDhXPqatxxo0hCnY5bSnVA4UgLS5rnNRYFLmmS1DU7/L50DHM/bSGvxupLUy9CEcx29ss2XJUH0ZPV1mP1SaqC1dSxeGDgqwlTv7awm3NhtZJZZKe9f6V1QmnszGUa3RF2Xti5h2lDofWQ+q3yPaPfW82Tt63fEA5X4o2/vH1h2iuZTQDe78SOVaSipEqTR2MPR5qwGxulTLCXpdeD73H2h7Xfv762GExqOoZWDA8QZrCUHE0UkywDU4l4jcajB5o81SMi7f2QmLSGyrdA6lyN0ey5G9D7t47eXYjDujsjqVZSQQd4I+Pfxrq5adKwXS8ZcQCfaWJ+zu9xA8BW2m3wRJeSBsraLWi0DMCPVmNRuMweZo8djmusGYKNMogHdJIk8dSfOoijWaUi6Eb+PgavGN3W5OTqifsjFeixFq5MZLiMT2BgW90iu+Ia87KNIPLQ8x867r0fx4v4W1dB9dFJ4w4EOPBgw8Kx1lwy4ei7U08jVDV6cF2sUymid6SBWa25t3ICAalbSx6pbZndVA3liFA7ya5f0h6WYcyEZnOo6oIXzaJ8JrSMXLgl0ibf6VvmOvGhWAO1yfY9/9KOtuj9CcjZHGJaBd0zqomNInz17qiL06tqerhyP2vuJ0oYzDLdXK0xM6caqH2UQ4CgKpnUgSAN5Pnp+ImKj5Bt+CyvdOrzT6OyF5Ekt4mAPjVTicXiL5BxFxlRp4yunDIDrrz86ibTBtEItwPOrQRpB0nfHA1XjEHjB+11vcdK2jFVaRDk/Jt02/h7MoihRvMc93Cdd2+ndn9I1u3FQKwLEwdAsAE8TJOh3CsDdvFjJJJiOA05QKGHvsjBkOVhuI36iPvp9NUGTOx4cnKuh3DlUlHA7O/T41UbGvM2HtFiSTbUkneSVEmrS09cMludKexJV53UrPTGh4Dyo1WOfnUjH1HHjSppoE8/MfKjzHs8/upDFmmn108/lQZ+EEe+PKjDDn5/1pgR7iVCxFoEQRIqycVHdKaJMBt7YBSXtiV3leXdWbNdXxCTpz3934isrt7YGaXtiDvI510Q1PDM5R9GRmn8Li3ttmRip4xuPeNxph1IJBEEUmtzM2Gzulw0F5cp+sslfEbx761OExyXFlWBHYZrk1OWMQ9s5rbMp7D93GolpJ8DUmjrc61i+nFskq3Igec/0obJ6XkELfH7aj3svy8qT0o2vZuJlRs5aDIBhQDOsjf2VMYSjLgqUk0Z/DvIqXhbLu4RFZ3bQKokny4du4Vc9Guhb3wHe4qIQD1es5BE6cB3691dK2TsqzhUy2kCzvY6u32mOp7tw4UTnGPAoxbMtsb8n4gNiHOuvo0MAdjPvJ+zHea3WAwqWUFu2oRF3Koga7z2ntNVW1+keHw4OZwz8LaauT28FHaY8aw20+meJuHqH0KcAhlvFyJ8gKxanPkraJ0raW2rGHE3biqYkLMuR2IOsfKsRtv8obHq4ZMg+u4BY7/VTcOGpJ7hWMCu7+07sZJ1LE8yTv7zV7s7oszQ13d9UfearGMeQtvgz+Ke/i7hZ2e459ptwHIAdVR2ACp2H6LmJYz2CtvhtnKghVAHdUgYTiB/X+tJ6z4QKHsxP+wo9k0K230YUKnqMeKOTXdtXm9vL9kAe/fUK7fdvWZm7yT8aaNCa76S4MLBQopoUxB0dFRikB1TYQjDWv7tP5RVrbM/j8RVRsNScPaOkZFgbtwFW6tzB+Pw191efLlnUuCStKFNI45+HHypYNSUOA0Tv58Pn3UgvH3DmaCjnv4/LupDFqIo6AoUAIKDlTbJ2n4/GnqbuCdOfw4/LxFMRFKcZ3/Dh8/Go9xDy99T3WmXWnYjJ7c2ILgzKIbu3+VYu9aZGKsIIrrD26pNs7IW6N0NwNbw1K2ZnKNmAmhT2MwrW2KsPGmK6FuZgUSaO4lJXfUgChugOpdEcUtrALccwqoGYxMKOwb+FVHSLpqbitaw4ZEOhc6Ow4hR7A7d/dWYG2H+i/R9yFgSeJUahD2TB8AKPZ2y3unQQv1iDFYYpNyZdvhEZeQHlV9sro89wgv1F7fWPhwq+2RsO3bg6M3MwfLlWht24rKWp6Go+yHs/ZCWh1F14nie81apaB4CjRaeQQew+4/wBfj31i22aUIGGFA2KlgUcUrAg+gFFU3LQphZ5xoUKFeqcgKFChQAYo6FCkM6rsH/str+7X4VbJQoV58uWdK4HLlNnRwBoNNPGhQqRjzeue4/EUqhQoYxQoqFCkMOmx6x+yfjR0KYmE1MvQoUAMvUe5QoU0SzM9I0EHQeXZWMFChXXpcGM+RVveKfFChVyET9ioDdWQD3iug4AdXxPxNChXNq8mkSzNHiOr6undpQoVz+TQm4Y76kP6p7j8KFCgB8UdChUgFQoUKoR//9k="/>
            <img src="data:image/jpeg;base64,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"/>
            <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/278129822.jpg?k=93ed1ea6c81f9819133938585d1bfdffbece7f58768ca7f92c8bd46b564aac08&o=&hp=1"/>
            <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/278129787.jpg?k=658c94515aa4bfbcf7983eee8c2fb5f4754797dc3e8037433891d043b725a230&o=&hp=1"/>
            <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/278604109.jpg?k=780cc79c1163ee94b2e6e2254aac66bf2e86b684379792467dc19896b0ad5ae6&o=&hp=1"/>
            <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/278129858.jpg?k=aaf49fb717bb5d52d76d77cac71c78088461ff5bf2662eb8fffdfe2a3fcdb2ae&o=&hp=1"/>
            <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/278129849.jpg?k=9e3af7e38a2f0a54ba63d4c28ec47604b1e98ddb7da0a230d8aa57f54d2e40b0&o=&hp=1"/>
            <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/278129843.jpg?k=399809919c7518370eeed94ce60d414e2d5fd723f2024862d51a4481c63d2a78&o=&hp=1"/>
            <img src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/278129839.jpg?k=2a088da6580eeaa439b0cdc6622c20059854767173e8cd3951d26ac38cca8e6c&o=&hp=1"/>
            <img src="https://cf.bstatic.com/xdata/images/hotel/max1280x900/278129844.jpg?k=4a87b5dd2c8d8c4ea77023f466db9e356bb8c1adaa6f2398c147818d66c93c99&o=&hp=1"/>
            <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/278129868.jpg?k=767ea245b510b6f4907e732b8405f7e5f2bb14e5cf044455af1df14e5ed2a4b6&o=&hp=1"/>
            <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/278129921.jpg?k=a16959d1c692898e59451f921b86c75fac50a8c4560db93058c4268ebec23691&o=&hp=1"/>
            <img src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/407418557.jpg?k=d51b27aaca86c7ab1d99a704b7cbf87c84ba413344b503ec567e712ac14242e2&o=&hp=1"/>
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle" style={{ marginTop:"290px"}} >{data.title}</h1>
              <p className="hotelDesc" >{data.desc}</p>
            </div>
            <div className="hotelDetailsPrice">
              {/* <h1>Perfect for a {days}-night stay!</h1> */}
              <h1>Perfect for a days-night stay!</h1>
              <span>
                Located in the real heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                {/* <b>${days * data.cheapestPrice * options.room}</b> ({days}{" "} */}
                nights
              </h2>
              <button onClick={handleClick}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    )}
    {openModal && <Reserve setOpen={setOpenModal} hotelId={id}/>}
  </div>
  )
}

export default Hotel