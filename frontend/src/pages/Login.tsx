import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "../components/Button.tsx";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const { login, isAuthenticated } = useAuth();
    // const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        if (email && password) login(email, password);
    }

    // useEffect(() => {
    //     if ( isAuthenticated )
    //         navigate('/quiz', { replace: true });
    // }, [isAuthenticated, navigate]);
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] text-center">
            <section className="bg-white rounded-lg px-10 py-6 w-full max-w-150">
                <h1 className="text-4xl text-amber-600 mb-8">Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                    {/* Email Row */}
                    <div className="row flex flex-col gap-2">
                        <label htmlFor="email" className="text-gray-700 text-2xl text-left">Email address</label>
                        <input
                            type="email"
                            id="email"
                            className="p-3 rounded-md bg-gray-100 text-gray-700 text-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>

                    {/* Password Row */}
                    <div className="row flex flex-col gap-2">
                        <label htmlFor="password" className="text-gray-700 text-2xl text-left">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="p-3 rounded-md bg-gray-100 text-gray-700 text-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className=" flex justify-center">
                        <Button type="primary"
                                className="px-6 py-3 bg-amber-600 text-white rounded-lg text-lg font-semibold hover:bg-amber-500 transition duration-300">
                            Login
                        </Button>
                    </div>
                </form>
            </section>
        </div>
    );
}

export default Login;