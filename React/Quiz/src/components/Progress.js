export function Progress({ index, numQuestions, points, maxPossiblePoints, answer }) {
    //if Number(answer !== null) is true will add one if is false will add zero
    return (
        <header className="progress">
            <progress max={numQuestions} value={index + Number(answer !== null)}></progress>
            <p>question <strong>{index + 1}</strong>/{numQuestions}</p>
            <p><strong>{points}</strong>/{maxPossiblePoints}</p>
        </header>
    )
}

