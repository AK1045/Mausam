import React,{useState,useEffect,useRef} from "react";
import axios from "axios";
import './App.css';



const Weather=()=>{
    const [city,setCity] = useState("London");
    const [geoinfo,setGeoinfo] = useState();
    const [weatherInfo,setWeatherInfo] = useState();
    const [time,setTime] = useState();
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const inputRef = useRef();
    const intervalRef = useRef(null);

     const kelvin = 273.15;
     const api = import.meta.env.VITE_WeatherAPI;
    const geoapi = import.meta.env.VITE_GeoAPI;
   useEffect(()=>{
     const FetchData= async ()=>{
        try{
            setLoading(true);
            setError(null);
            // const geourl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${geoapi}`
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4b5f7638f7ec67d4b9beffc85ebd80fc`;
            // const url = `https://api.openweathermap.org/data/3.0/onecall?lat=19.0760&lon=72.8777&appid=YOUR_API_KEY`;
            // const geo = await axios.get(geourl);
            // const geodata = geo.data[0];
            // if (!geodata) throw new Error ("city not found");
            // if(geodata){
            //     const {name,lat,lon,region:state,country}=geodata; 
            //     setGeoinfo({lat,lon,state,country,name});
                // curl --request GET --url 'https://api.tomorrow.io/v4/weather/forecast?location=42.3478,-71.0466&apikey=VTpmxsbCHS9Lu9HPZSVydwaiiun3Js5i'
            
                // const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${api}`;
                // const url = `https://api.openweathermap.org/data/2.5/onecall?lat=42.3478&lon=-71&exclude=minutely,hourly,daily,alerts&appid=4b5f7638f7ec67d4b9beffc85ebd80fc`;
                // const url = `https://api.tomorrow.io/v4/weather/forecast?location=${lat},${lon}&apikey=${api}`;
                const response = await axios.get(url);
                const data = response.data;
                console.log(data);
                if(data && data.current && data.main){
                const {current:{temp,
                            feels_like,
                            humidity,
                            pressure,
                            sunrise,
                            sunset,
                            dt,
                            weather,
                            wind_speed,
                            wind_deg}} = data;
         
                //converting values to celcius and date
                setWeatherInfo({
                    temperature : temp - kelvin,
                    feelslike : feels_like - kelvin,
                    humidity,
                    pressure,
                    wind_speed,
                    wind_deg,
                    type : weather[0].main,
                    des : weather[0].description,
                    icon : weather[0].icon,
                    sunrise,sunset,
                    date : dt,
                });
              }
                setTime(new Date(weatherInfo?.date * 1000).toLocaleString());
                setLoading(false);
            // }else{
            //     throw new Error ("city not found")
            // };
        }catch(error){
            console.log(error,"Unable to find the entered city..");
            console.log("geo error",error.message)
            setLoading(false);
            setError("Problem Fetching the Data");
            setWeatherInfo(null);
        }
    }
    FetchData();
   },[city]);

   
   //getting the value of input field
   const handleSubmit=(e)=>{
      const value = inputRef.current.value.trim().toLowerCase();
      if(value.length > 0){
        setCity(value);

        const cities = JSON.parse(localStorage.getItem("searchedcities")) || [];

        if(!cities.includes(value)){
            cities.push(value);
            localStorage.setItem('searchedcities',JSON.stringify(cities));
        }
      }
   };

    const now = weatherInfo?.date;
    const sunrise = weatherInfo?.sunrise;
    const sunset = weatherInfo?.sunset;
    const type = weatherInfo?.type?.toLowerCase();

  
   const formatTime=(time)=>{
    return new Date(time * 1000).toLocaleTimeString();
   }
   
   //time running continuosly
   useEffect(()=>{
    if (!weatherInfo?.date) return;
    let currentTime = weatherInfo?.date;
    if (intervalRef.current) clearInterval(intervalRef.current);
    //start new interval
    intervalRef.current = setInterval(() => {
        currentTime += 1;
        setTime(new Date(currentTime * 1000).toLocaleTimeString())
    }, 1000);

    return ()=>clearInterval(intervalRef.current);
   },[weatherInfo?.date])

   const background = {
        "clear-day": "day_sunny.webp",
        "clear-night": "night.webp",
        "clear-sunrise": "sunrise.webp",
        "clear-sunset": "sunset.webp",

        "clouds-day": "morning_with_clouds.webp",
        "clouds-night": "clouds-night.jpg",
        "clouds-sunrise": "morning_with_clouds.webp",
        "clouds-sunset": "clouds-sunset.jpg",

        "rain-day": "day_rainy.webp",
        "rain-night": "night_rainy.webp",
        "rain-sunrise": "day_rainy.webp",
        "rain-sunset": "night_rainy.webp",

        "snow-day": "snow.webp",
        "snow-night": "snow-night.webp",
        "snow-sunrise" :"snow.webp",
        "snow-sunset" :"snow-night.webp",


        "mist-day": "fog.webp",
        "mist-night": "haze_night.webp",
        "mist-sunrise" : "fog.webp",
        "mist-sunset" : "haze_night.webp",

        "thunderstorm-day" : "day_thunderstorm.webp",
        "thunderstorm-night" : "night_thunderstorm.webp",


        default: "default.webp"
};

   
   let timeofTheDay = "day";
   const sunriseWindow = sunrise && (now > sunrise - 900 && now < sunrise + 900);
   const sunsetWindow = sunrise && (now > sunset - 900 && now < sunset + 900);

   if(sunriseWindow){
     timeofTheDay = "sunrise";
   }else if(sunsetWindow){
    timeofTheDay = "sunset";
   }else if(now < sunrise || now > sunset){
    timeofTheDay = "night";
   }
   const image = `${weatherInfo?.type?.toLowerCase()}-${timeofTheDay}`;
//    console.log(image);
   
   const backgroundImage = background[image] || background.default;

    return(
        <div className="weather_container" style={{backgroundImage : `url(/images/${backgroundImage})`,backgroundSize : "cover",backgroundPosition : "center",transition : "background-image 0.5s ease-in-out"}}>
  <div className="info">
    <div className="search_bar">  <input
        type="text" placeholder="Search Your City..." ref={inputRef} onKeyDown={(e)=>{if(e.key === 'Enter') handleSubmit()}}></input>
        <button onClick={handleSubmit}>Search</button></div>
    <div className="city_data">
        <div className="city">{city}</div>
        <div className="lat">Latitude : {geoinfo?.lat}</div>
        <div className="lon">Longitude : {geoinfo?.lon}</div>
    </div>
    
  </div>
  {loading && <p>Loading the data...</p>}
  {error && <p>{error}</p>}

{/* {weatherInfo && ( */}
{weatherInfo && (
    <div className="details">
      <div className="time">{time}</div>
      <div className="city_details">{geoinfo?.name},{geoinfo?.state}</div>
      <div className="country">{geoinfo?.country}</div>
      <div className="type">{weatherInfo.type}</div>
      <div className="icon">
        <img
          src={`https://openweathermap.org/img/wn/${weatherInfo.icon}@2x.png`}
          alt={weatherInfo.des}
        />
      </div>
      <div className="temp">{weatherInfo.temperature.toFixed(1)}°C</div>
      {/* <div className="min_max">
        <div className="min">{weatherInfo.mintemp}°C</div>
        <div className="max">{weatherInfo.maxtemp}°C</div>
      </div> */}
      <div className="rise_set">
        <div className="sunrise">sunrise : {formatTime(weatherInfo.sunrise)}</div>
        <div className="sunset">sunset : {formatTime(weatherInfo.sunset)}</div>
      </div>
    </div>
)}
{weatherInfo && (
    <div className="other_details">
      <h3 className="feels_like">Feels like: {weatherInfo.feelslike}°C</h3>
      <h3 className="humidity">Humidity: {weatherInfo.humidity}%</h3>
      <h3 className="pressure">Pressure: {weatherInfo.pressure} hPa</h3>
      <div className="wind">
        <h3 className="wind_speed">Wind: {weatherInfo.wind_speed} m/s</h3>
        <h3 className="direction">Direction: {weatherInfo.wind_deg}°</h3>
      </div>
    </div>
  )} 
</div>
    )
}

export default Weather;