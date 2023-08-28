export default function EndGamePopup({score, playAgain}){
    return (
        <div className="popup">
        <h2>You {score === 10 ? 'won' : 'lost'}!</h2>
        <p>Your score: {score}</p>
        <button onClick={playAgain}>Play Again</button>
        </div>
    )
}