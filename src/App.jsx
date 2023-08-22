import { useEffect, useState } from 'react'
import './styles/App.css'
import GameContainer from './components/GameContainer';

function App() {
  const [allPokemon, setAllPokemon] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [randomPokemons, setRandomPokemons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100&offset=0');
      const data = await response.json();

      setAllPokemon(data.results);
      getRandomPokemons(data.results);
    }
    fetchData();
  }, []);

  const getRandomPokemons = (allPokemon) => {
    let temp = [];
    for(let i = 0; i<10; i++){
      let position = Math.floor(Math.random() * (100 - i));
      let pokemon = {...allPokemon[position], id: i, wasClicked: false}
      temp.push(pokemon);
      allPokemon.push(allPokemon.splice(position, 1)[0]);
    }
    setRandomPokemons(temp);
  }

  // to-do:

  const handleClick = (e) => {

  }

  const shuffleArray = (arr) => {

  }

  return (
    <>
      <h1>Memory Card</h1>
      <GameContainer 
        pokemons={randomPokemons}
        handleClick={handleClick}
        />
    </>
  )
}

export default App
