import PageNav from "../components/PageNav.tsx";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer.tsx";

function Layout() {
    return (
        <>
            {/* Container with background image */}
            <div className="relative min-h-screen bg-cover bg-center
                bg-[linear-gradient(rgba(36,42,46,0.9),rgba(36,42,46,0.9)),url('/map-bg.jpg')]">

                {/* PageNav with padding on desktop */}
                <header className="absolute top-0 left-0 w-full z-10 px-4 py-3 md:px-10 md:py-4">
                    <PageNav />
                </header>

                {/* Main Content */}
                <div className="pt-24 pb-10 px-10">
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </>
    );
}

export default Layout;
