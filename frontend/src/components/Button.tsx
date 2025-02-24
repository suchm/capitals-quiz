function Button({children, onClick }) {
    return (
        <button
            onClick={onClick}
            className="px-10 py-4 rounded-full bg-amber-600 text-white text-2xl font-semibold
                    transition duration-300 hover:bg-amber-500 shadow-md mt-4 cursor-pointer"
        >
            {children}
        </button>
    );
}

export default Button;