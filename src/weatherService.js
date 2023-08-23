const API_KEY ='8f3948b06994a3ac20c460dfdfc749ae'

const makeIconUrl = (iconId)=>`https://openweathermap.org/img/wn/${iconId}@2x.png`

const wetherData = async(city, units = 'metric') => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`


const datas =  await fetch(url)
.then((res) => res.json())
.then((data) => data);

 //console.log(datas);
const {
    weather,
    main: {temp, feels_like,temp_min,temp_max,pressure,humidity},
    wind:{speed},
    sys:{country},
    name
} = datas;
const {description, icon} = weather[0];

return{
    description,
    iconURl: makeIconUrl(icon),
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    speed,
    country,
    name
}


}

export {wetherData};