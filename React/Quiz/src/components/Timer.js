import { useEffect } from "react"

export function Timer({ dispatch, secondsRemaining }) {
    const min = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;

    useEffect(function () {
        const id = setInterval(function () {
            dispatch({ type: `tick` });
        }, 1000);

        return () => clearInterval(id);
    }, [dispatch]);

    return (
        <div className="timer">
            {min}:{seconds}
        </div>
    )
}

