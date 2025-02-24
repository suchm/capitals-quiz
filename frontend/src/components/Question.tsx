import Options from "./Options";
import {useQuiz} from "../contexts/QuizContext.tsx";
import NextButton from "./NextButton.tsx";

function Question() {
    const { currentQuestion, index } = useQuiz();

    return (
        <section className="bg-white rounded-3xl px-10 md:px-6 py-6 w-full max-w-150 mt-50">
            <h4 className="text-3xl md:text-4xl font-semibold mb-8 leading-[1.2]">What is the capital city
                of {currentQuestion?.country}?</h4>
            <Options/>
            <NextButton />
        </section>
);
}

export default Question;