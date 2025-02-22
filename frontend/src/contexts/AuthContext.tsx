import {createContext, useContext, useReducer} from "react";

const AuthContext = createContext();

const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
}

function reducer(state, action) {
    switch (action.type) {
        case "auth/login":
            return {
                ...state,
                token: action.payload,
                isAuthenticated: true,
            };

        case "auth/register":
            return {
                ...state,
                token: action.payload,
                isAuthenticated: false,
            };

        case "auth/logout":
            return {
                ...state,
                user: null,
                isAuthenticated: false,
            };

        default:
            throw new Error("Unknown action type");
    }
}

const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
    const [{user, isAuthenticated}, dispatch] = useReducer(reducer, initialState);

    function login(email: string, password: string) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({type: "auth/login", payload: FAKE_USER})
            console.log(FAKE_USER);
        }
    }

    function register(name: string, email: string, password: string) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({type: "auth/register", payload: FAKE_USER})
            console.log(FAKE_USER);
        }
    }

    function logout() {
        dispatch({ type: "logout" })
    }

    return <AuthContext.Provider value={{
        user,
        isAuthenticated,
        login,
        logout,
    }}>
        {children}
    </AuthContext.Provider>
}

function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined)
        throw new Error("AuthContext was used outside of AuthProvider");
    return context;
}

export { AuthProvider, useAuth }