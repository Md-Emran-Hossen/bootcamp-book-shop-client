// import React from 'react'
import { Link, NavLink, useNavigate } from "react-router-dom"
import { AuthContext } from "../provider/AuthProvider";
import { useContext } from "react";
import logo from "../assets/logo.png";

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);
    // console.log({user});
    const navigate = useNavigate();
    const handleSignOut = () => {

            logOut()
            .then(() => {
               
                navigate("/login");
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const navLink = (
        <>
            <li>
                <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/books">Book</NavLink>
            </li>
            <li>
                <NavLink to="/blog">Blog</NavLink>
            </li>
            <li>
                <NavLink to="/faq">Faq</NavLink>
            </li>
            {/* <li>
                <NavLink to="/test">Test Register</NavLink>
            </li> */}
        </>
    );


    return (
        <div>
            <section className="fixed w-full mx-auto top-0 left-0 z-50">
                <div className="navbar grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-base-100 gap-1">
                    <div className="navbar-start w-full">
                        <img src={logo} alt="book" className="w-20 ml-2 pl-2" />
                        <Link to="/">
                            <a className="btn btn-ghost font-sans text-xs lg:text-4xl text-yellow-600">BOOK SHOP</a>
                        </Link>

                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                {navLink}
                            </ul>
                        </div>

                    </div>
                    <div className="navbar-end hidden lg:flex w-full">
                        <ul className="menu menu-horizontal px-1">
                            {navLink}
                        </ul>
                    </div>

                    <div className="flex justify-start md:justify-end lg:justify-end ml-2 pl-2">
                        {
                            user ? (
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm">{user.email}</span>
                                    <img src={user?.photoURL} className="w-7 rounded-full"></img>
                                    <Link to="/login">
                                    <button onClick={handleSignOut} className="btn btn-active text-sm"> Logout </button>
                                    </Link>
                                </div>

                            ) : (
                                <div>
                                    <Link to="/login">
                                        <button className="btn btn-active">Login</button>
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}
export default Navbar;