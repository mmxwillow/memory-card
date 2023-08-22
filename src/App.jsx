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

  const handleClick = (e) => {
    let value = e.target.getAttribute('data-key');
    let id = (value === null) ? e.target.parentElement.getAttribute('data-key') : value;
    let temp = [...randomPokemons];
    let index = temp.findIndex((obj) => obj.id == id );
    if(!temp[index].wasClicked) {
      temp[index] = {...temp[index], wasClicked: true};
      shuffleArray(temp);
    }
    else console.log('Already clicked!');
  }

  const shuffleArray = (arr) => {
    let temp = [...arr];
    for (let i = temp.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [temp[i], temp[j]] = [temp[j], temp[i]];
    }
    setRandomPokemons(temp);
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
