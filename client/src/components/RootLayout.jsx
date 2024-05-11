import Header from "./Header";
import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";

export const RootLayout = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};
