import React,{useEffect,useRef,useState} from "react";
import axios from 'axios';
import './App.css';
import { TbWorldSearch } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { IoSpeedometerOutline } from "react-icons/io5";
import { PiTrafficSignFill } from "react-icons/pi";
import { BsThermometerHalf } from "react-icons/bs";
import { FaRegFaceGrinBeamSweat } from "react-icons/fa6";
import { Cloudy, Flurries, Rainy, Sunny, ThunderStorm } from "./Weather_Icons/Weather_icons";

const Weather=()=>{

    const [city,setCity] = useState("gauribidanur");
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [weatherinfo,setWeatherinfo] = useState();
    const [sunriseTime,setSunriseTime] = useState();
    const [sunsetTime,setSunsetTime] = useState();
    const [weatherType,setWeatherType] = useState();
    const [zone,setZone] = useState();
    const [time,setTime] = useState();
    const inputRef = useRef(null);
    const intervalRef = useRef();

    useEffect(()=>{
        const FetchWeather= async () =>{
      try {
        setLoading(true);
        const response = await axios.get("/api/weather", {
        params: { city }
        });

       const data = response.data;
      if(data && data.location && data.current){
        const {location:{name,country,region,lat,lon,localtime,localtime_epoch,timezone_id},
       current : {observation_time,temperature,weather_icons,weather_descriptions,astro :{sunrise,sunset,moonrise,moonset},wind_speed,wind_degree,wind_dir,pressure,precip,humidity,cloudcover,feelslike,is_day}} = data;

       const info = {
        name, country, region, lat, lon, localtime, time: localtime_epoch,
        timezone_id, observation_time, temperature, icon: weather_icons[0],
        type: weather_descriptions[0], sunrise, sunset, moonrise, moonset,
        wind_speed, wind_degree, wind_dir, pressure, precip, humidity,
        cloudcover, feelslike, is_day
        };

        setWeatherinfo(info);
        setSunriseTime(sunrise);
        setSunsetTime(sunset);
        setZone(timezone_id);
        setWeatherType(weather_descriptions[0]?.toLowerCase());

    }
        setLoading(false);  
    } catch (error) {
        console.log(error);
        setLoading(false);
        setError(error.message);
      }
    }
    FetchWeather();
    },[city])

    const background = {
        "clear-day": "day_sunny.webp",
        "clear-night": "night.jpg",
        "clear-sunrise": "sunrise.jpg",
        "clear-sunset": "sunset.webp",
        "sunny-day": "day_sunny.webp",
        "sunny-night": "night.webp",
        "sunny-sunrise": "sunrise.webp",
        "sunny-sunset": "sunset.webp",

        "clouds-day": "morning_with_clouds.webp",
        "clouds-night": "clouds-night.jpg",
        "clouds-sunrise": "morning_with_clouds.webp",
        "clouds-sunset": "clouds-sunset.jpg",
        "cloudy-day": "morning_with_clouds.webp",
        "cloudy-night": "clouds-night.jpg",
        "cloudy-sunrise": "morning_with_clouds.webp",
        "cloudy-sunset": "clouds-sunset.jpg",
        "partly cloudy-day": "morning_with_clouds.webp",
        "partly cloudy-night": "clouds-night.jpg",
        "partly cloudy-sunrise": "morning_with_clouds.webp",
        "partly cloudy-sunset": "clouds-sunset.jpg",
        "haze-day": "morning_with_clouds.webp",
        "haze-night": "clouds-night.jpg",
        "haze-sunrise": "morning_with_clouds.webp",
        "haze-sunset": "clouds-sunset.jpg",

        "rain-day": "day_rainy.webp",
        "rain-night": "night_rainy.webp",
        "rain-sunrise": "day_rainy.webp",
        "rain-sunset": "night_rainy.webp",
        "rainy-day": "day_rainy.webp",
        "rainy-night": "night_rainy.webp",
        "rainy-sunrise": "day_rainy.webp",
        "rainy-sunset": "night_rainy.webp",
        "light drizzle-day": "day_rainy.webp",
        "light drizzle-night": "night_rainy.webp",
        "light drizzle-sunrise": "day_rainy.webp",
        "light drizzle-sunset": "night_rainy.webp",
        "light rain shower-day": "day_rainy.webp",
        "light rain shower-night": "night_rainy.webp",
        "light rain shower-sunrise": "day_rainy.webp",
        "light rain shower-sunset": "night_rainy.webp",

        "snow-day": "snow.webp",
        "snow-night": "snow-night.webp",
        "snow-sunrise" :"snow.webp",
        "snow-sunset" :"snow-night.webp",


        "mist-day": "fog.webp",
        "mist-night": "haze_night.webp",
        "mist-sunrise" : "sunrise.jpg",
        "mist-sunset" : "haze_night.webp",

        "thunderstorm-day" : "day_thunderstorm.webp",
        "thunderstorm-night" : "night_thunderstorm.webp",


        default: "default.webp"
    };
    const converTime = (timeStr) => {
        if (!timeStr || typeof timeStr !== 'string' || !timeStr.includes(':')) {
            return null;
        }
        const [time, shift] = timeStr.split(' ');
        if (!time || !shift) return null;
        let [hour, minute] = time.split(':').map(Number);
        if (isNaN(hour) || isNaN(minute)) return null;
        if (shift === 'PM' && hour !== 12) {
            hour += 12;
        }
        if (shift === 'AM' && hour === 12) {
            hour = 0;
        }
        return hour * 60 * 60 + minute * 60;
    };
   
    const timesinceMidnight=(time)=>{
        const now = new Date();
        const parts = new Intl.DateTimeFormat('en-US',{
            timeZone : time,
            hourCycle: "h24",
            hour :'numeric',
            minute : 'numeric',
        }).formatToParts(now);
        const h = +parts.find(p => p.type === 'hour').value;
        const m = +parts.find(p => p.type === 'minute').value;
        return h * 60 * 60 + m * 60;
    }
   
    const weathertype = weatherinfo?.type.toLowerCase();
    const sunrise = converTime(sunriseTime);
    const sunset = converTime(sunsetTime);
    const todayTime = timesinceMidnight(zone);
 
    let timeoftheday = "day";
    if(sunrise && (todayTime >= sunrise - 900 && todayTime <= sunrise + 900)){
        timeoftheday = "sunrise";
    }else if(sunset &&(todayTime >= sunset - 900 && todayTime <= sunset + 900)){
        timeoftheday = "sunset";
    }else if(todayTime < sunrise && todayTime > sunset){
        timeoftheday = "night";
    }else{timeoftheday = "day"};

    const image = `${weathertype}-${timeoftheday}`;
    
    const backgroundImage = background[image] || background.default;
    //timing
    useEffect(()=>{
        if(intervalRef.current) clearInterval(intervalRef.current);
        const cityZone = weatherinfo?.timeZone_id;
        const updateTime=()=>{
            const now = new Date();
            const timer = new Intl.DateTimeFormat('en-US',{
                year : "numeric",
                month : "numeric",
                day : "numeric",
                hour : "2-digit",
                minute : "2-digit",
                second : "2-digit",
                timeZone : cityZone,
                hourCycle : "h24"
            });
            setTime(timer.format(now));
        };
        updateTime();
        intervalRef.current = setInterval(
            updateTime
        , 1000);
        return()=>clearInterval(intervalRef.current);
    },[weatherinfo]);

    const handleSubmit=(e)=>{
        const value = inputRef.current.value.trim();
        if(value && value.length > 0){setCity(value)};
        const cities = JSON.parse(localStorage.getItem("searchedcities")) || [];
        if (!cities.includes(value)){
            cities.push(value);
            localStorage.setItem("searchedcities",JSON.stringify(cities));
        }
        inputRef.current.value ="";
    }
    //icons
    const weather = weatherinfo?.type.toLowerCase();
    let weather_icon = null;
    
        if(weather === "clear" || weather === "sunny"){
            weather_icon = <Sunny />
        }else if(weather?.includes("cloud") || weather === "overcast"){
            weather_icon = <Cloudy />
        }else if(weather?.includes("rain") || weather?.includes("drizzle")){
            weather_icon = <Rainy />
        }else if(weather?.includes("snow") || weather?.includes("flurries")){
            weather_icon = <Flurries />
        }else if(weather?.includes("thunderstorm")){
            weather_icon = <ThunderStorm />
        }else if(weather === "mist" || weather === "fog" || weather === "haze" || weather === "smoke"){
            weather_icon = <Cloudy />
        };
    return(
         <div className="weather_container" style={{backgroundImage : `url(/images/${backgroundImage})`,backgroundSize : "cover",backgroundPosition : "center",transition : "background-image 0.5s ease-in-out"}}>
          <div className="info">
            <div className="search_bar">  <input
                type="text" placeholder="Search Your City..." ref={inputRef} onKeyDown={(e)=>{if(e.key === 'Enter') handleSubmit()}}></input>
                <button onClick={handleSubmit}><TbWorldSearch /></button></div>
            <div className="city_data">
                <div className="is_day">{weatherinfo?.is_day === "day" ? <Sunny /> : <img src="/images/night_1146887.png"></img>}</div>
                <div className="city">{weatherinfo?.name}</div>
                <div className="lat">Latitude : {weatherinfo?.lat}</div>
                <div className="lon">Longitude : {weatherinfo?.lon}</div>
                <div className="local">{time}</div>
            </div>
            
        </div>
        {loading && <div className="ldBar"
            style={{width:"100%",height:"60px",
            dataStroke:"data:ldbar/res,gradient(0,1,#9df,#9fd,#df9,#fd9)",
            dataPath:"M10 20Q20 15 30 20Q40 25 50 20Q60 15 70 20Q80 25 90 20",zIndex : 3}}
            ></div>}
        {error && <p></p>}

        {weatherinfo && (
            <div className="details">
            <div className="time">{weatherinfo?.localtime}</div>
            <div className="city_details">{weatherinfo?.name},{weatherinfo?.region}</div>
            <div className="country">{weatherinfo?.country}</div>
            <div className="type">{weatherinfo?.type}</div>
            <div className="icon">
                {weather_icon ? weather_icon : <img src={weatherinfo.icon} alt={weatherinfo.type}></img>}
            </div>
            <div className="temp">{weatherinfo?.temperature.toFixed(1)}°C</div>
            <div className="rise_set">
                <div className="rise grid">
                    <div className="sunrise_i"><img src="/images/horizon.png" alt="sunrrise logo" /> </div>
                    <div className="sunrise">sunrise : {weatherinfo?.sunrise}</div>
                </div>
                <div className="set grid">
                    <div className="sunset_i"><img src="/images/sunset.png" alt="sunset logo" /></div>
                    <div className="sunset">sunset : {weatherinfo?.sunset}</div>
                </div>
                <div className="rise grid">
                    <div className="moonrise_i"><img src="/images/night_1146887.png" alt="moonrise image" /></div>
                    <div className="moonrise">moonrise : {weatherinfo?.moonrise}</div>
                </div>
                <div className="set grid">
                    <div className="moonset_i">icon</div>
                    <div className="moonset">moonset : {weatherinfo?.moonset}</div>
                </div>
            </div>
            <div className="other_details">
            <div className="feels_like"><div><FaRegFaceGrinBeamSweat className="icon"/></div><div>Feels like: {weatherinfo?.feelslike}°C</div></div>
            <div className="humidity"><div><div><WiHumidity className="icon"/></div></div><div>Humidity: {weatherinfo?.humidity}%</div></div>
            <div className="pressure"><div><BsThermometerHalf className="icon"/></div><div>Pressure: {weatherinfo?.pressure} hPa</div></div>
            <div className="wind_speed"><div><IoSpeedometerOutline className="icon"/></div><div>Wind: {weatherinfo?.wind_speed} m/s</div></div>
            <div className="degree"><div><FaWind className="icon"/></div> <div>Deg: {weatherinfo?.wind_degree}°</div></div>
            <div className="direction"><div><PiTrafficSignFill className="icon"/></div><div>Direction: {weatherinfo?.wind_dir}°</div></div>
            </div>
            </div>
        )}
        </div>
            )
}
export default Weather;