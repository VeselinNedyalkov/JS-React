export function Progress({ index, numQuestions, points, maxPossiblePoints }) {
    return (
        <header className="progress">
            <progress max={numQuestions} value={index}></progress>
            <p>question <strong>{index + 1}</strong>/{numQuestions}</p>
            <p><strong>{points}</strong>/{maxPossiblePoints}</p>
        </header>
    )
}

