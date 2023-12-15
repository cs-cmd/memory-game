import { useState } from 'react'
import './App.css';
import Scoreboard from './components/Scoreboard.jsx'
import CardContainer from './components/CardContainer.jsx';
import Footer from './components/Footer.jsx';
import GameTimeline from './utility/GameTimeline.js';
import { initializeBerries } from './utility/setup.js';
import Card from './components/Card.jsx';
import { randomizeArray } from './utility/ArrayRandomizer.js';

const chosenItems = new Map();

function App() {
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  const [gameTimeLine, setGameTimeline] = useState(GameTimeline.NotStarted);

  const [gameObjects, setGameObjects] = useState({});

  async function runLoad() {
    return; 
    setGameTimeline(GameTimeline.Loading);
    const berries = await initializeBerries();

    console.log(berries);
    // make objects of the berry and return
    setGameObjects(berries);

    runGame();
  }

  function runGame() {
    setGameTimeline(GameTimeline.Running);
  }

  function runGameOver() {
    setGameTimeline(GameTimeline.Over);
  }

  function cardClick(cardUuid) {
    if(chosenItems.has(cardUuid)) {
      runGameOver();
    } else {
      setCurrentScore(curr => curr + 1);
      chosenItems.set(cardUuid, true);
    }
  }

  return (
    <>
      <Scoreboard>
        <h2>High score: {highScore}</h2>
        <h3>Current score: {currentScore}</h3>
      </Scoreboard>
      {
        gameTimeLine === GameTimeline.NotStarted && 
        <button type='button' onClick={runLoad}>Start game</button>
        ||
        gameTimeLine === GameTimeline.Loading &&
        <p>Loading...</p>
        ||
        gameTimeLine === GameTimeline.Running &&
        gameObjects.map(item => 
          <Card name={item.name}
            uuid={item.uuid}
            imageLink={item.img_src}
            key={item.uuid}/>)
        ||
        gameTimeLine === GameTimeline.Over &&
        <p>Over...</p>
      }
      <CardContainer/>
      <Footer/>
    </>
  )
}

export default App;
