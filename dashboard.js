import React, { useState, useEffect } from 'react'
import blessed from 'blessed'
import { render } from 'react-blessed'
import figlet from 'figlet';

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


const App = () => {
  const [count, setCount] = useState(0)
  // to keep track of the current timer

  // react hooks must be called in the exact same order in every component render
  useEffect(() => {
    const timer = setTimeout(() => setCount(count + 1), 1000)
    return () => clearTimeout(timer);
  }, [count])

  const now = new Date();
  let date = now.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  let time = figlet.textSync(now.toLocaleDateString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }), {
    font: FONTS[count % FONTS.length]
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

const screen = blessed.screen({
  autoPadding: true,
  smartCSR: true,
  title: 'react-blessed hello world'
})

screen.key(['escape', 'q', 'C-c'], () => process.exit(0))

render(<App />, screen)