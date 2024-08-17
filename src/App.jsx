import React, {useState} from 'react'
import './index.css'
import axios from 'axios'


function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url =`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=9ff097d2078990fa026f51683a57ca10`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input 
        onChange={event => setLocation(event.target.value)}
        onKeyPress = {searchLocation}
        placeholder='Enter Location'
        value={location}
        type='text'>  
        </input>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p className="location-name">{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed(1)}&deg;F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
    {data.name != undefined &&
      <div className="bottom">
      <div className="feels">
        {data.main ? <p className='bold'>{data.main.feels_like.toFixed(1)}&deg;F</p> : null}
        <p>Feels Like</p>
      </div>
      <div className="humidity">
        {data.main ? <p className='bold'>{data.main.humidity} %</p> : null}
        <p>Humidity</p>
      </div>
      <div className="wind">
      {data.wind ? <p className='bold'>{data.wind.speed} MPH</p> : null}
        <p>Winds</p>
      </div>
      </div>
    }
      </div>
    </div>
  )
}

export default App
