import { useQuiz } from "../contexts/QuizContext";

function NextButton() {
    const { index, numQuestions, answer, getNextQuestion, dispatch } = useQuiz();
    const hasAnswered = answer !== null;

    return (
        <div className="flex justify-between">
            <button
                className="block font-inherit text-gray-900 text-2xl border-2 border-gray-300 bg-gray-200 px-6 py-3
                           cursor-pointer rounded-full transition duration-300
                           hover:bg-gray-300 disabled:cursor-not-allowed"
                onClick={() => dispatch({type: "quiz/finish"})}
            >
                End Quiz
            </button>
            {index < numQuestions - 1 && hasAnswered && (
                <button
                    className="block font-inherit text-gray-900 text-2xl border-2 border-gray-300 bg-gray-200 px-6 py-3
                               cursor-pointer rounded-full transition duration-300
                               hover:bg-gray-300 disabled:cursor-not-allowed"
                    onClick={getNextQuestion}
                >
                    Next
                </button>
            )}
        </div>
    );
}

export default NextButton;
