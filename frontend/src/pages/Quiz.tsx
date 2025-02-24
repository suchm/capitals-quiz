import {useAuth} from "../contexts/AuthContext.tsx";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useQuiz} from "../contexts/QuizContext.tsx";
import Loader from "../components/Loader.tsx";
import Question from "../components/Question.tsx";
import FinishScreen from "../components/FinishScreen.tsx";
import NextButton from "../components/NextButton.tsx";
import Error from "../components/Error.tsx";

function Quiz() {
    const { isAuthenticated } = useAuth();
    const { status, getCountriesCapital } = useQuiz();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) navigate("/", { replace: true });
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        getCountriesCapital();
    }, []);

    return (
        <>
            <main className="flex flex-col items-center h-screen text-center">
                {status === "loading" && <Loader/>}
                {status === "error" && <Error/>}
                {status === "active" && (
                    <Question/>
                )}
                {status === "finished" && (
                    <FinishScreen/>
                )}
            </main>
        </>
    );
}

export default Quiz;