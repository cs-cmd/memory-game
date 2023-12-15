import { useState } from 'react'
import './App.css';
import Scoreboard from './components/Scoreboard.jsx'
import CardContainer from './components/CardContainer.jsx';
import Footer from './components/Footer.jsx';
import GameTimeline from './utility/GameTimeline.js';
import { initializeBerries } from './utility/setup.js';
import Card from './components/Card.jsx';
import { randomizeArray } from './utility/ArrayFunctions.js';

const chosenItems = new Map();
let difficulty = 2;

function App() {
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  const [gameTimeLine, setGameTimeline] = useState(GameTimeline.NotStarted);

  const [gameObjects, setGameObjects] = useState({});

  async function runLoad() {
    if(currentScore !== 0) {
      setCurrentScore(0);
    }
    
    setGameTimeline(GameTimeline.Loading);
    const berries = await initializeBerries();

    // make objects of the berry and return
    setGameObjects(randomizeArray(berries).slice(0, 10 * difficulty));

    runGame();
  }

  function runGame() {
    setGameTimeline(GameTimeline.Running);
  }

  function runGameOver() {
    setGameTimeline(GameTimeline.Over);
    if(currentScore > highScore) {
      setHighScore(currentScore);
    }
  }

  function cardClick(cardUuid) {
    //console.log(cardUuid);

    setGameObjects(randomizeArray(gameObjects));

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
      <CardContainer>
        {gameTimeLine === GameTimeline.NotStarted && 
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
              key={item.uuid}
              onClick={() => cardClick(item.uuid)}/>)
          ||
          gameTimeLine === GameTimeline.Over &&
          (
          <>
            <p>Over...</p>
            <button onClick={runLoad}>Restart</button>
          </>
          )
        }
      </CardContainer>
      <Footer/>
    </>
  )
}

export default App;
