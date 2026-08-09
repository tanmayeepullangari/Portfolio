import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ theme, setTheme }) {
    return (
        <>
            <Navbar theme={theme} setTheme={setTheme} />

            <main>
                <Outlet />
            </main>

            <Footer />
        </>
    );
}

export default Layout;