

const WeatherCard = ( {wData} ) => {
   const iconUrl = `https://openweathermap.org/img/wn/${wData.weather[0].icon}@2x.png`;
  return (
    <li className="city">
      <h2 className="city-name">
        <span>{wData.name.replaceAll("Province", "")}</span>
        <sup>country</sup>
      </h2>
      <div className="city-temp">
      {Math.round(wData.main.temp)}
        <sup>°C</sup>
      </div>
      <figure>
        <img className="city-icon" src={iconUrl} alt={iconUrl} />
          <figcaption>{wData?.weather[0].description}</figcaption> 
      </figure> 
    </li>
  );
};

export default WeatherCard;
