import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import Button from "../components/Button.tsx";
import { useAuth } from "../contexts/AuthContext.tsx";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, isAuthenticated, isLoading, error, dispatch } = useAuth();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if (email && password) login(email, password);
    }

    useEffect(() => {
        if (isAuthenticated) navigate("/quiz", { replace: true });
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        dispatch({ type: "auth/resetError" });
    }, [dispatch]);

    return (
        <main className="flex flex-col items-center justify-center h-screen text-center">
            <section className="bg-white rounded-lg px-10 md:px-6 py-6 w-full max-w-150">
                <h1 className="text-4xl text-amber-600 mb-8">Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    {/* Email Row */}
                    <div className="row flex flex-col gap-2">
                        <label htmlFor="email" className="text-gray-700 text-2xl text-left">
                            Email address
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="p-3 rounded-md bg-gray-100 text-gray-700 text-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        {/* Display Email Error */}
                        {error?.email && (
                            <p className="text-red-500 text-left text-lg">{error.email[0]}</p>
                        )}
                    </div>

                    {/* Password Row */}
                    <div className="row flex flex-col gap-2">
                        <label htmlFor="password" className="text-gray-700 text-2xl text-left">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="p-3 rounded-md bg-gray-100 text-gray-700 text-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        {/* General Error Message */}
                        {error && typeof error === "string" && (
                            <p className="text-red-500 text-left text-lg">{error}</p>
                        )}
                        {/* Display Password Error */}
                        {error?.password && (
                            <p className="text-red-500 text-left text-lg">{error.password[0]}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center">
                        <Button disabled={isLoading}>
                            {isLoading ? "Logging in..." : "Login"}
                        </Button>
                    </div>
                </form>
                <p className="text-xl mt-6">Don't yet have an account? <Link className="text-blue-600 underline" to="/register">Click here to register</Link></p>
            </section>
        </main>
    );
}

export default Login;
