import {Link} from "react-router-dom";
import {useAuth} from "../contexts/AuthContext.tsx";

function Homepage() {
    const { isAuthenticated } = useAuth();
    return (
        <main className="flex flex-col items-center justify-center h-screen text-center">
            <h1 className="text-6xl text-white leading-18">
                Test your knowledge on the capital cities of the world!
            </h1>
            <Link to={isAuthenticated ? "/quiz" : "login"}
                  className="px-10 py-6 rounded-full bg-amber-600 text-white text-4xl font-semibold
                    transition duration-300 hover:bg-amber-500 shadow-md mt-12">
                Start quiz now
            </Link>
        </main>
    );
}

export default Homepage;