import {useQuiz} from "../contexts/QuizContext.tsx";

function Options() {
    const { currentQuestion, choices, answer, onSelectAnswer } = useQuiz();
    const hasAnswered = answer !== null;

    return (
        <div className="flex flex-col gap-3 mb-8">
            {choices.map((option) => (
                <button
                    className={`
                        block text-left w-full text-2xl md:text-3xl font-semibold
                        border-2 rounded-full px-10 py-6 transition duration-300
                        ${option === answer ? 'translate-x-4' : ''}
                        ${hasAnswered
                        ? option === currentQuestion.capital
                            ? 'bg-teal-500 border-teal-500 text-white'
                            : 'bg-orange-400 border-orange-400 text-gray-900'
                        : 'bg-gray-700 border-gray-700 text-white hover:bg-gray-900 hover:border-gray-900'
                    }
                    `}
                    key={option}
                    disabled={hasAnswered}
                    onClick={() => onSelectAnswer(option)}
                >
                    {option}
                </button>
            ))}
        </div>
    );

}

export default Options;