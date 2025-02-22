import PageNav from "../components/PageNav.tsx";
import {Outlet} from "react-router-dom";
import Footer from "../components/Footer.tsx";

function Layout() {
    return (
        <>
            <div className="min-h-screen m-10 bg-cover bg-center
                    bg-[linear-gradient(rgba(36,42,46,0.9),rgba(36,42,46,0.9)),url('/capital-cities-bg.png')]
                    px-20 py-10 mx-0 my-0">

                <header>
                    <PageNav />
                </header>

                <main>
                    <Outlet />
                </main>
            </div>

            <Footer />
        </>
    );
}

export default Layout;