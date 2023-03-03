import React from 'react';
import figlet from 'figlet';
import useInterval from '@use-it/interval'

import weather from 'weather-js';
import util from 'util';


//convert from a callback way to a promise with Async/await
const FONTS = [
  "Straight", 
    "ANSI Shadow",
    "Shimrod",
    "doom",
    "Big",
    "Ogre",
    "Small", 
    "Standard", 
    "Bigfig", 
    "Mini", 
    "Small Script",
    "Small Shadow"
  ]

//that will convert the callback style into a async/await promise
const findWeather = util.promisify(weather.find)

const formatWeather = ([result]) => {
  const { location, current, forecast } = result;
  const degreeType =  location.degreetype;
  const temperature = `${current.temperature}º${degreeType}`
  const conditions = `${current.skycode}º${degreeType}`
  const low = `${forecast[1].low}º${degreeType}`
  const high = `${forecast[1].high}º${degreeType}`
  
  return `${temperature} and ${conditions} (${low} -> ${high})`
}

export default function Today({updateInterval=90000, search='Nashville NT', degreeType='F'}) {
  const [fontIndex, setFontIndex] = React.useState(0)
  const [now, setNow] = React.useState(new Date())
  const [weather, setWeather] = React.useState({
    status: 'loading',
    error: null,
    data:  null,
  })

  //we use useCallback bcause dont' want to keep getting a new instace of it 
  const fetchWeather = React.useCallback(async () => {
    setWeather({ status: 'loading', error: null, data:  null })
    let data;
    try {
      data = await findWeather({ search, degreeType })
      setWeather({ status: 'complete', error: null, data })
    } catch(error) {
      setWeather({ status: 'error', error: error, data: null })
    }
  }, [search, degreeType])

  React.useEffect(() => {
    fetchWeather();
  }, [fetchWeather])

  useInterval(() => {
    setNow(new Date())
  }, 60000) // every 1 minute


  const date = now.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  const time = figlet.textSync(now.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }), {
    font: FONTS[now % FONTS.length]
  })

  return (
    <box
      top="center"
      left="center"
      width="50%"
      height="50%"
      border={{ type: 'line' }}
      style={{
        border: { fg: 'blue' }
      }}
    >
      {`${date}
      ${time} 
      
      ${weather.status === 'loading' ? 'Loading...' : weather.error ? `Error: ${weather.error}` : formatWeather(weather.data) }`}
    </box>
  )
}