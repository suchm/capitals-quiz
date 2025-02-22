import { NavLink } from "react-router-dom";
import Logo from "./Logo.tsx";

function PageNav() {
    return (
        <nav className="flex items-center justify-between">
            <Logo />
            <ul className="flex items-center gap-6">
                <li>
                    <NavLink
                        to="/register"
                        className={({ isActive }) =>
                            `px-6 py-3 rounded-full bg-amber-600 text-white text-2xl font-semibold 
                            transition duration-300 hover:bg-amber-500 shadow-md 
                            ${isActive ? "ring-4 ring-amber-700" : ""}`
                        }
                    >
                        Register
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            `px-6 py-3 rounded-full bg-amber-600 text-white text-2xl font-semibold 
                            transition duration-300 hover:bg-amber-500 shadow-md 
                            ${isActive ? "ring-4 ring-amber-700" : ""}`
                        }
                    >
                        Login
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default PageNav;
