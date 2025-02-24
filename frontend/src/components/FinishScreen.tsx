import {useQuiz} from "../contexts/QuizContext.tsx";

function FinishScreen() {
    const {
        points,
        index,
        dispatch
    } = useQuiz();

    const percentage =  Math.ceil((points/index) * 100);
    return (
        <main className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-6xl text-white">
                You scored <strong>{points}</strong> out of {index} ({percentage}%)!
            </h1>
            <button
                className="px-10 py-6 rounded-full bg-amber-600 text-white text-4xl font-semibold
                    transition duration-300 hover:bg-amber-500 shadow-md mt-12"
                onClick={() => dispatch({type: "quiz/restart"})}
            >
                Restart Quiz
            </button>
        </main>
    );
}

export default FinishScreen;