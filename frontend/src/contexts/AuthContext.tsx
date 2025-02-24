import { createContext, useContext, useReducer } from "react";
import { ApiPost } from "../api.tsx";

const AuthContext = createContext();

const initialState = {
    user: null,
    token: localStorage.getItem("token"),
    isAuthenticated: !!localStorage.getItem("token"),
    isLoading: false,
    error: "",
};

function reducer(state, action) {
    switch (action.type) {
        case "auth/loading":
            return { ...state, error: "", isLoading: true };

        case "auth/login":
            return { ...state, isLoading: false, token: action.payload, isAuthenticated: true };

        case "auth/register":
            return { ...state, isLoading: false, token: action.payload, isAuthenticated: true };

        case "auth/logout":
            return { ...state, isLoading: false, user: null, token: null, isAuthenticated: false };

        case "auth/rejected":
            return { ...state, isLoading: false, error: action.payload };

        case "auth/resetError":
            return { ...state, error: "" };

        default:
            throw new Error("Unknown action type");
    }
}

function AuthProvider({ children }) {
    const [{ user, token, isAuthenticated, isLoading, error }, dispatch] = useReducer(reducer, initialState);

    async function login(email, password) {
        dispatch({ type: "auth/loading" });

        try {
            const res = await ApiPost.post("/login", { email, password });

            localStorage.setItem("token", res.data.accessToken);
            dispatch({ type: "auth/login", payload: res.data.accessToken });

        } catch (error) {
            console.log(error);
            if (error.response) {
                if (error.response.status === 401) {
                    dispatch({ type: "auth/rejected", payload: "Invalid credentials. Please check your email and password." });
                } else if (error.response.status === 422) {
                    dispatch({ type: "auth/rejected", payload: error.response.data.errors });
                } else {
                    dispatch({ type: "auth/rejected", payload: "An unexpected error occurred. Please try again later." });
                }
            } else {
                dispatch({ type: "auth/rejected", payload: "Network error. Please check your connection." });
            }
        }
    }

    async function register(name, email, password, confirmPassword) {
        dispatch({ type: "auth/loading" });

        try {
            const res = await ApiPost.post("/register", {
                name,
                email,
                password,
                password_confirmation: confirmPassword,
            });

            localStorage.setItem("token", res.data.accessToken);
            dispatch({ type: "auth/register", payload: res.data.accessToken });

        } catch (error) {
            if (error.response.status === 422) {
                dispatch({
                    type: "auth/rejected",
                    payload: error.response?.data.errors,
                });
            } else {
                console.error('An unexpected error occurred:', error);
            }
        }
    }

    async function logout() {
        dispatch({ type: "auth/loading" });

        try {
            await ApiPost.post("/logout", {}, {
                headers: { Authorization: `Bearer ${token}` },
            });

            localStorage.removeItem("token");
            dispatch({ type: "auth/logout" });

        } catch (error) {
            console.error("Logout Error:", error);
            dispatch({ type: "auth/rejected", payload: "Logout failed. Please try again." });
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            token,
            isAuthenticated,
            isLoading,
            error,
            login,
            register,
            logout,
            dispatch,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("AuthContext must be used within an AuthProvider");
    return context;
}

export { AuthProvider, useAuth };
