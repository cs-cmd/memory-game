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
  // holds high score and 
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  const [gameTimeLine, setGameTimeline] = useState(GameTimeline.NotStarted);

  const [gameObjects, setGameObjects] = useState({});

  // runs setup for game start
  async function runLoad() {
    // if score isn't 0, reset
    if(currentScore !== 0) {
      setCurrentScore(0);
    }
    
    // set game timeline and get berries
    setGameTimeline(GameTimeline.Loading);
    const berries = await initializeBerries();

    // make objects of the berry and return
    setGameObjects(randomizeArray(berries).slice(0, 10 * difficulty));

    runGame();
  }

  // set game to 'run'
  function runGame() {
    setGameTimeline(GameTimeline.Running);
  }

  // set game to 'game over'
  function runGameOver() {
    setGameTimeline(GameTimeline.Over);

    // if the current score is a hight score, set new high score
    if(currentScore > highScore) {
      setHighScore(currentScore);
    }
    // empty chosen items
    chosenItems.clear();
  }

  // when a card is clicked:
  function cardClick(cardUuid) {
    // reorganize array
    setGameObjects(randomizeArray(gameObjects));

    // if the card was already selected, run game over
    if(chosenItems.has(cardUuid)) {
      runGameOver();
    } else {
      // else, increment score and add to chosenItems
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


      <main className='main-container'>
        {gameTimeLine === GameTimeline.NotStarted &&
        <button type='button' onClick={runLoad}>Start Game</button>
        ||
        gameTimeLine === GameTimeline.Loading &&
        <p>Loading...</p>
        ||
        gameTimeLine === GameTimeline.Running &&
        <CardContainer>
          {gameObjects.map(item => 
            <Card name={item.name}
              uuid={item.uuid}
              imageLink={item.img_src}
              key={item.uuid}
              onClick={() => cardClick(item.uuid)}/>)}
        </CardContainer>    
        ||
        gameTimeLine === GameTimeline.Over &&
        (
          <>
            <p>Game Over...</p>
            <button onClick={runLoad}>Restart</button>
          </>
        )    
        }
      </main>

      <Footer/>
    </>
  )
}

export default App;
