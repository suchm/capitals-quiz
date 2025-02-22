function Loader() {
    return (
        <div className="h-full flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-transparent to-[var(--color-light--2)] animate-spin
                            [mask-image:radial-gradient(farthest-side,_#0000_calc(100%-8px),_#000_0)]">
            </div>
        </div>
    );
}

export default Loader;
