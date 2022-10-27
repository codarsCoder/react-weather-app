import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import WeatherCard from "./WeatherCard";


const Main = () => {
  const [searchText, setSearchText] = useState([]);
  const [allCity, setAllCity] = useState([])
  let apiKey ="96d849954e75818e434c2040c99576c4";  
  let units = "metric";
  let lang = "tr";
 
  

  const handleSubmit = async(e)=> {
      e.preventDefault();
      let city =e.target.city.value;
      console.log(allCity.includes(city))
     if(city && !allCity.includes(city) ){
       let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}&lang=${lang}`;
       const  {data}  = await axios(url);
       setSearchText([...searchText,data]) 
       setAllCity([...allCity, city]) 
     }
     
  }
  return (
    <section className="main">
      <form onSubmit={(e)=>handleSubmit(e)}>
        <input name="city" type="text" placeholder="Search for a city" autoFocus />
        <button type="submit">SUBMIT</button>
        <span className="msg">error</span>
      </form>
      <div className="container">
        <ul className="cities">{/* use WeatherCard here */}
          {searchText?.map((item,i) =>{
              return(
                <div key={i}>
                  <WeatherCard wData={item} /> 
                </div>
               
              )
        
          })
        }
          
        </ul>
      </div>
    </section>
  );
};

export default Main;
