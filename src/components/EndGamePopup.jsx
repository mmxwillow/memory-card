import '../styles/Popup.css'

export default function EndGamePopup({score, playAgain}){
    return (
        <div className="cover">
            <div className="popup">
                <h2>You {score === 10 ? 'won' : 'lost'}!</h2>
                <p>Your score: {score}</p>
                <button onClick={playAgain} className="restart">Play Again</button>
            </div>
        </div>
    )
}