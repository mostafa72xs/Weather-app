import { useEffect , useState } from 'react';
import './App.css';
import Main from './components/main'
import Loading from './components/Loading'
import axios from 'axios';
import Head from './head';


function App() {
      const [ loading , setLoading ] = useState(false);
      const APIKEY = 'd6d2c8757c5f4cf98f9123417252202';
    const [ data , setData ] =useState()
    const [ api , setApi ] = useState();
    const API_URL = `http://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${data}&days=6`;
    
    const getJson = async (URL) =>{
      await axios.get(URL)
        .then(response => {
          setApi(response.data);
      }).catch(error => {
        console.error(error);
        setTimeout(() =>{
          alert('invalid city name')
          setLoading(false)
        }, 2000)
      })
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        getJson(API_URL)
    }
    function HandleLocation() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const {latitude , longitude} = position.coords;
          const API_URLgeo = `http://api.weatherapi.com/v1/forecast.json?key=${APIKEY}&q=${latitude},${longitude}&days=6`;
          getJson(API_URLgeo);
        }, () =>{
          alert('you decliend the request to show your location ')
        }
      );
    }
    console.log(api)
  
  useEffect(() =>{
    HandleLocation()
    setLoading(true);
        setTimeout(()=>{
            setLoading(false);
        },5000);
  }, [])
  
  
  return (
    <div className="App">
        <Head />
      {loading ? <Loading /> : <Main
      HandleLocation={HandleLocation}
      handleSubmit={handleSubmit}
      input={(e) => setData(e.target.value)}
      api={api}
      /> }
    </div>
  );
}

export default App;
