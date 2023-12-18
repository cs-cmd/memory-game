import './styles/Scoreboard.css'
export default function Scoreboard({children}) {

  return (
    <header className='scoreboard'>
      <h1>Pokemon Memory Game</h1>
      {children}
    </header>
  );
}