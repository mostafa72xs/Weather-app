import '../App.css';
import { FaLocationCrosshairs } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { FaTemperatureHalf } from "react-icons/fa6";
import { MdOutlineWaterDrop } from "react-icons/md";
import { BsClouds } from "react-icons/bs";
import { FiWind } from "react-icons/fi";
import { BsCloudDrizzle } from "react-icons/bs";
import { GoSun } from "react-icons/go";
import { FaRegSnowflake } from "react-icons/fa";



function Main(props) {

    const d = props.api || {}
    console.log(d)
    const current = d.current || { temp_c: 'N/A', last_updated: 'N/A' }
    const Location = d.location || { name: 'Unknown Location' }
    const forecast = d.forecast?.forecastday || []

  
  const back ={
    summer:`url('https://thumbs.dreamstime.com/blog/2023/01/great-places-to-visit-mountain-view-86318-image151380461.jpg')`,
    winter:`url('https://4kwallpapers.com/images/wallpapers/winter-forest-5472x3648-10232.jpg')`
  }
  
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  function Day(props){
    const da = new Date(props.date);
return(
  <p> {weekday[da.getDay()]}</p>
  )
  }
  function Month(props){
    const mo = new Date(props.date);
    return(
      <p> {month[mo.getMonth()]}</p>
      )
  }
function Icons(){
    if(current?.temp_c > 20){
      return <GoSun className='order' size={50} />
    }
    else if(current?.temp_c < 10){
      return <FaRegSnowflake className='order' size={50}/>
    }
    else{
      return <BsCloudDrizzle  className='order' size={50}/>
    }
  }

  
  return (
        <div className='bigbox' style={{backgroundImage: current?.temp_c < 10 ? back.winter : current?.temp_c > 20 ? back.summer : ''}}>
        <div className='smallbox'>
          <h1 style={{fontSize:'70px' , fontWeight:'500'}}>{current?.temp_c || 'N/A'}°</h1>
          <div className='title'>
            <h2>{Location?.name || 'Unknown Location'}</h2>
            <div className='subtitle'>
              <p>{current?.last_updated.slice(11,16) || 'N/A'} - </p>
              <Day date={current?.last_updated || new Date().toISOString()} />
            <p> , {current?.last_updated.slice(8,10) || 'N/A'}</p> 
            <Month date={current?.last_updated.slice(5,7) || new Date().toISOString()}/>
            <p> {current?.last_updated.slice(0,4) || 'N/A'}</p>
            </div>
          </div>
          <Icons />
        </div>
        <div  className='side'>
        <form onSubmit={props.handleSubmit}>
          <input type='search' className='searchInput' placeholder="Search Location" onChange={props.input} />
          <button type='submit' className='btn'><CiSearch size={25} /></button>
          <button onClick={props.HandleLocation} className='geo'><FaLocationCrosshairs size={15} /></button>
        </form>
        <h3 style={{textAlign:'left'}}>Weather Details...</h3>
        <ul>
          <p style={{textAlign:'left' , fontWeight:'bold'}}>{current?.condition?.text || "N/A"}</p>
          <li>
            <p>Temp max</p>
            <span>{forecast[0]?.day.maxtemp_c}°  <FaTemperatureHalf color='lightpink' size={15} /></span>
          </li>
          <li>
            <p>Temp min</p>
            <span>{forecast[0]?.day.mintemp_c}°  <FaTemperatureHalf color='royalblue' size={15} /></span>
          </li>
          <li>
            <p>Humadity</p>
            <span>{current?.humidity}%  <MdOutlineWaterDrop size={15}  /></span>
          </li>
          <li>
            <p>Cloudy</p>
            <span>{current?.cloud}%  <BsClouds size={15} /></span>
          </li>
          <li>
            <p>Wind</p>
            <span>{current?.wind_kph}km/h  <FiWind size={15} /></span>
          </li>
        </ul>
        <div className='line'></div>
        <ul>
          <p style={{textAlign:'left' , fontWeight:'bold'}}>Daily Weather Forecast</p>
          {forecast.slice(1,5).map((item, index) => (
            <li key={index}>
              <div className='p'>
                <Day date={item.date} />
                <span>{item.date.slice(5,10)}</span>
              </div>
              <div className='p'>
                {item.day.avgtemp_c}° C
                <span>{item.day.condition.text}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className='line'></div>
        <ul>
        <p style={{textAlign:'left' , fontWeight:'bold'}}>Today's Weather Forecast</p>
          {forecast[0]?.hour.map((item , index)=>(
            <li key={index}>
              <div className='px'>
                <img src={item.condition.icon} alt='icon' width='30px' height='30px'/>
                <div>
                  <p>{item.time.slice(11,16)}</p>
                <span>{item.condition.text}</span>
                </div>
              </div>
              <div className='p'>
                {item.temp_c}° C
              </div>
            </li>
          ))
          }
        </ul>
        </div>
      </div>
  )
}

export default Main
