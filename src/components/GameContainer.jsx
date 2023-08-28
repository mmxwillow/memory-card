export default function GameContainer ({pokemons, handleClick, disabled}){
    return (
        <div className="game-container">
            {pokemons.map(element => {
                return (
                    <button className="card" disabled={disabled} onClick={handleClick} key={element.id} data-key={element.id}>
                        <img src="" alt="" />
                        <div className="name">{element.name}</div>
                    </button>
                )
            })}
        </div>
    )
}