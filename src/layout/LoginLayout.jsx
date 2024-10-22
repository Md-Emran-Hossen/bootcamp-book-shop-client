import { Outlet } from "react-router-dom";
import Navbar from "../shared/Navbar"
// import Footer from "../shared/Footer";

const LoginLayout = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className="container mx-auto mt-10">
                <Outlet />
            </div>
            {/* <Footer></Footer> */}
        </>
    )
}
export default LoginLayout;