import React, {useState} from 'react';
import figlet from 'figlet';
import useInterval from '@use-it/interval';

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


export default function Today({updateInterval = 1000}) {
  const [fontIndex, setFontIndex] = useState(0)
  // to keep track of the current timer
  useInterval(() => setFontIndex(fontIndex + 1), updateInterval)
  // react hooks must be called in the exact same order in every component render
  // interval and useEffect have a bug, when you frequently render it it will clear the interval without even trigger it.
  /* useEffect(() => {
    const timer = setTimeout(() => setFontIndex(fontIndex + 1), 1000)
    return () => clearTimeout(timer);
  }, [fontIndex]) */

  const now = new Date();
  let date = now.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  let time = figlet.textSync(now.toLocaleString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }), {
    font: FONTS[fontIndex % FONTS.length]
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
      ${time}`}
    </box>
  )
}