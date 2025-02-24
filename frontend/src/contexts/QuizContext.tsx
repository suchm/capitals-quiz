import { createContext, useContext, useEffect, useReducer } from "react";
import { ApiGet } from "../api.tsx";
import { useAuth } from "./AuthContext.tsx";

const QuizContext = createContext();

const initialState = {
    countriesList: [],
    usedCountries: new Set(),
    status: "loading",
    index: 0,
    currentQuestion: null,
    numQuestions: 0,
    choices: [],
    answer: null,
    points: 0,
};

function reducer(state, action) {
    switch (action.type) {
        case "quiz/start":
            return {
                ...state,
                usedCountries: new Set(),
                countriesList: action.payload,
                numQuestions: action.payload?.length || 0,
                points: 0,
                index:0,
                answer: null,
                status: "active"
            };

        case "quiz/dataFailed":
            return { ...state, status: "error" };

        case "quiz/newQuestion":
            return {
                ...state,
                currentQuestion: action.payload.question,
                choices: action.payload.choices,
                answer: null,
                index: Number(state.index) + 1,
                usedCountries: new Set([...state.usedCountries, action.payload.question.country]),
            };

        case "quiz/newAnswer":
            return {
                ...state,
                answer: action.payload,
                points: action.payload === state.currentQuestion.capital ? Number(state.points) + 1 : Number(state.points),
            };

        case "quiz/finish":
            return { ...state, status: "finished" };

        case "quiz/restart":
            return {
                ...state,
                usedCountries: new Set(),
                points: 0,
                index: 0,
                answer: null,
                status: "active"
            };

        default:
            throw new Error("Unknown action type");
    }
}

function QuizProvider({ children }) {
    const [{
        countriesList,
        usedCountries,
        status,
        index,
        currentQuestion,
        numQuestions,
        choices,
        answer,
        points
    },
        dispatch
    ] = useReducer(reducer, initialState);
    const { token } = useAuth();

    // Fetch countries when the game starts
    async function getCountriesCapital() {
        if (!token) return;

        try {
            const res = await ApiGet.get("/countries/capital", {
                headers: { Authorization: `Bearer ${token}` },
            });
            dispatch({ type: "quiz/start", payload: res.data.data });


        } catch (error) {
            dispatch({ type: "quiz/dataFailed" });
        }
    }

    // Function to select the next question
    function getNextQuestion() {
        if (countriesList.length === usedCountries.size) {
            dispatch({ type: "quiz/finish" });
            return;
        }

        // Filter out used countries
        const availableCountries = countriesList.filter(
            (country) => !usedCountries.has(country.country)
        );

        if (availableCountries.length === 0) return;

        // Randomly select a country
        const question =
            availableCountries[Math.floor(Math.random() * availableCountries.length)];

        // Get all incorrect choices
        let incorrectChoices = countriesList
            .map((c) => c.capital)
            .filter((capital) => capital !== question.capital);

        // Add 2 incorrect choices
        incorrectChoices = incorrectChoices.sort(() => 0.5 - Math.random()).slice(0, 2);

        // Include correct answer
        const choices = [...incorrectChoices, question.capital];

        // Shuffle the choices
        const shuffledChoices = choices.sort(() => Math.random() - 0.5);

        dispatch({ type: "quiz/newQuestion", payload: { question, choices: shuffledChoices } });
    }


    useEffect(() => {
        if (status === "active" && countriesList.length > 0) {
            getNextQuestion();
        }
    }, [status, countriesList]);

    function onSelectAnswer(answer) {
        dispatch({ type: "quiz/newAnswer", payload: answer });
    }

    return (
        <QuizContext.Provider value={{
            status,
            currentQuestion,
            numQuestions,
            index,
            choices,
            answer,
            points,
            getCountriesCapital,
            getNextQuestion,
            onSelectAnswer ,
            dispatch,
        }}>
            {children}
        </QuizContext.Provider>
    );
}

function useQuiz() {
    const context = useContext(QuizContext);
    if (!context) throw new Error("QuizContext must be used within a QuizProvider");
    return context;
}

export { QuizProvider, useQuiz };
