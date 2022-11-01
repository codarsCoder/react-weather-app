import axios from "axios";
import { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";

const Main = () => {
  const [errorText, setErrorText] = useState("");
  const [searchText, setSearchText] = useState("ankara");
  const [searchWeather, setSearchWeather] = useState([]);
 
  let apiKey = "c47c1c44a39bf231725c0fbcc2670e7f" //process.env.REACT_APP_API_KEY;
  let units = "metric";
  let lang = "tr";
  
  
  const getWeather = async() =>{
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=${apiKey}&units=${units}&lang=${lang}`;
    const {data} = await axios(url);
    const isExist = searchWeather.some((item)=> item.name.toLowerCase() === searchText.toLowerCase() );
    if(isExist){
        getError("Aynı şehir iki defa girildi!")
    }else {
      const {name , weather, main, sys } = data 
      setSearchWeather([...searchWeather, {name, weather, main, sys} ])
    }
    
  }
  const getError = (props)=> {
    setErrorText(props);
    setTimeout(()=>setErrorText(""),3000)
  }
  console.log(searchWeather)
  const handleSubmit = (e) => {
    e.preventDefault();
    !searchText ? getError("Şehir ismini boş bıraktınız!") :  getWeather();
   
   
  }
  useEffect(() => {
    getWeather();
  }, [])
  
  return (
  
    <section className="main">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input onChange={(e)=> setSearchText(e.target.value)} type="text" placeholder="Search for a city" autoFocus />
        <button type="submit">SUBMIT</button>
        <span className="msg">{errorText}</span>
      </form>
      <div className="container">
        <ul className="cities">
          {searchWeather.map((item,i)=>{  
            return (
              <WeatherCard key={i} {...item}  />
            )
          })}
          </ul>
      </div>
    </section>
  );
};

export default Main;
