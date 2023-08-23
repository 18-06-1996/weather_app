import { useEffect, useState } from 'react';
import './App.css';
import Description from './components/Description';
import { wetherData } from './weatherService';
import sunrise from './assets/sunrise.jpeg'
import snow from './assets/snow.jpg'

function App() {
 const [city,setCity] = useState("paris")
  const [weather,setWeather] = useState(null);
 const [units,setUnits] = useState('metric')
 const [bg,setBg] = useState()

  useEffect(()=>{
   const fetchWeatherData = async ()=>{
    const data = await wetherData(city,units)
    setWeather(data);
   // console.log(data);

   //background 
   const backimage = units === "metric" ? 20 :60;
   if(data.temp <= backimage){
    setBg(snow)
   }else{
    setBg(sunrise)
   }
   }
   fetchWeatherData();
  },[units,city])


const handleUnitClick = (e)=> {
   const btn = e.currentTarget;
   const currentUnit = btn.innerText.slice(1);
   const isCelsius = currentUnit === "C";
   btn.innerText = isCelsius ? "°F" : "°C";
   setUnits(isCelsius ? "metric" : "imperial")
   
}

const keyPressed = (e) => {
  if(e.keyCode ===13){
    setCity(e.currentTarget.value);
    e.currentTarget.blur();
  }
}

  return (
    <div className="App" style={{backgroundImage: `url(${bg})`}}>
       <div className="overlay">
        {weather && (
             <div className="container">
             <div className="section section__inputs">
               <input onKeyDown={keyPressed} type="text" name="city" placeholder="Enter the city..."/>
               <button onClick={(e)=>handleUnitClick(e)}> °C </button>
             </div>
             <div className="section section__temperature">
                 <div className="icons">
                   <h3>{weather.name},{weather.country} </h3>
                   <img src={weather.iconURL} alt='icon'/>
                   <h3>{weather.description}</h3>
                 </div>
                  <div className='temperature'>
                   <h1> {`${weather.temp.toFixed()} °${units === 'metric' ? "C" : "F"} `}</h1>
                 </div> 
                 
             </div>
             
             {/* bottom description */}
            
             <Description weather={weather} units={units}/>
             
   
           </div>
       
        )

        }
          </div>




    </div>
  );
}

export default App;
