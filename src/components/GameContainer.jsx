export default function GameContainer ({pokemons, handleClick}){
    return (
        <div className="game-container">
            {pokemons.map(element => {
                return (
                    <button className="card" onClick={handleClick} key={element.id} data-key={element.id}>
                        <img src="" alt="" />
                        <div className="name">{element.name}</div>
                    </button>
                )
            })}
        </div>
    )
}