import {Link} from "react-router-dom";

function Homepage() {
    return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-5rem)] text-center">
            <h1 className="text-6xl text-white">
                Test your knowledge on the capital cities of the world!
            </h1>
            <Link to="/login"
                  className="px-10 py-6 rounded-full bg-amber-600 text-white text-4xl font-semibold
                    transition duration-300 hover:bg-amber-500 shadow-md mt-12">
                Start quiz now
            </Link>
        </div>
    );
}

export default Homepage;