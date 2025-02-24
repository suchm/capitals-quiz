import { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "./Logo.tsx";
import { useAuth } from "../contexts/AuthContext.tsx";
import Button from "./Button.tsx";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"; // Import Heroicons

function PageNav() {
    const { logout, isAuthenticated } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    function handleLogout() {
        logout();
        setIsOpen(false); // Close menu on logout
    }

    return (
        <nav className="flex items-center justify-between w-full text-white py-4 px-6 relative">
            {/* Logo */}
            <Logo />

            {/* Burger Menu Icon (visible on mobile) */}
            <button
                className="md:hidden text-white focus:outline-none z-50"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <XMarkIcon className="w-8 h-8" /> : <Bars3Icon className="w-8 h-8" />}
            </button>

            {/* Desktop Navigation (Always visible) */}
            <ul className="hidden md:flex items-center gap-6">
                {isAuthenticated ? (
                    <li>
                        <Button onClick={handleLogout}>Logout</Button>
                    </li>
                ) : (
                    <>
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
                    </>
                )}
            </ul>

            {/* Mobile Navigation (Dropdown Menu) */}
            <div
                className={`absolute top-16 left-0 w-full bg-gray-900 text-white shadow-md transition-transform duration-300 
                ${isOpen ? "-translate-y-20" : "-translate-y-100"} md:hidden`}
            >
                <ul className="flex flex-col items-center gap-6 py-6">
                    {isAuthenticated ? (
                        <li>
                            <Button onClick={handleLogout}>Logout</Button>
                        </li>
                    ) : (
                        <>
                            <li className="text-center">
                                <NavLink
                                    to="/register"
                                    className="block w-full px-6 py-3 rounded-full bg-amber-600 text-white text-xl font-semibold
                                    transition duration-300 hover:bg-amber-500 shadow-md text-center"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Register
                                </NavLink>
                            </li>
                            <li className="text-center">
                                <NavLink
                                    to="/login"
                                    className="block w-full px-6 py-3 rounded-full bg-amber-600 text-white text-xl font-semibold
                                    transition duration-300 hover:bg-amber-500 shadow-md text-center"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
}

export default PageNav;
