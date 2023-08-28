import { useEffect, useState } from 'react'
import './styles/App.css'
import GameContainer from './components/GameContainer';
import EndGamePopup from './components/EndGamePopup';

function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [randomPokemons, setRandomPokemons] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0');
      const data = await response.json();

      setAllPokemon(data.results);
      getRandomPokemons(data.results);
    }
    fetchData();
  }, []);

  const getRandomPokemons = (arr) => {
    let temp = [];
    let copy = [...arr];
    for(let i = 0; i<10; i++){
      let position = Math.floor(Math.random() * (100 - i));
      let pokedex = copy.findIndex((element) => element.name == arr[position].name) + 1;
      let pokemon = {...arr[position], id: i, wasClicked: false, pokedex: pokedex}
      temp.push(pokemon);
      arr.push(arr.splice(position, 1)[0]);
    }
    setRandomPokemons(temp);
  }

  const handleClick = (e) => {
    let value = e.target.getAttribute('data-key');
    let id = (value === null) ? e.target.parentElement.getAttribute('data-key') : value;
    let temp = [...randomPokemons];
    let index = temp.findIndex((obj) => obj.id == id );
    if(!temp[index].wasClicked) {
      updateScores();
      temp[index] = {...temp[index], wasClicked: true};
      shuffleArray(temp);
      if(currentScore == 9) setIsPopupOpen(true);
    }
    else setIsPopupOpen(true);
  }

  const shuffleArray = (arr) => {
    let temp = [...arr];
    for (let i = temp.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [temp[i], temp[j]] = [temp[j], temp[i]];
    }
    setRandomPokemons(temp);
  }

  const updateScores = () => {
    let incrementedScore = currentScore + 1;
    setCurrentScore(incrementedScore);
    let newBestScore = Math.max(incrementedScore, bestScore);
    setBestScore(newBestScore);
  }

  const playAgain = () => {
    setIsPopupOpen(false);
    getRandomPokemons(allPokemon);
    setCurrentScore(0);
  }

  return (
    <>
      <h1>Memory Card</h1>
      <div className="score-board">
        <p>Current score: {currentScore}</p>
        <p>Best score: {bestScore}</p>
      </div>
      <GameContainer 
        pokemons={randomPokemons}
        handleClick={handleClick}
        disabled={isPopupOpen}
        />
      {isPopupOpen && <EndGamePopup score={currentScore} playAgain={playAgain}/>}
    </>
  )
}

export default App
