// import React from 'react';

import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { Result } from "postcss";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import Navbar from "../shared/Navbar";

const TestRegister = () => {
    const { createProducts } = useContext(AuthContext);
    const navigate = useNavigate();


    const handleTestRegister = (event) => {
        event.preventDefault();

        //    const name = event.target.name.value;

        const form = new FormData(event.currentTarget);

        const name = form.get("name");
        const photo = form.get("photo");
        const email = form.get("email");
        const password = form.get("password");
        // console.log(name, photo, email, password);

        createProducts(email, password, name, photo)
            .then((result) => {
                console.log(result.user);
                toast.success("User Registration Test Successfull", {
                    position: "top-right",
                });
                navigate("/login");
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <>
            <Helmet>
                <title> Book Shop | Test Register </title>
            </Helmet>
            <Navbar></Navbar>
            <div className="mt-20 p-5">
                <div>
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="card shrink-0 shadow-2xl">
                            <form onSubmit={handleTestRegister} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input type="text" id="name" name="name" placeholder="Your name" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Photo URL</span>
                                    </label>
                                    <input type="text" id="photo" name="photo" placeholder="Your photo" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" id="email" name="email" placeholder="Your email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" id="password" name="password" placeholder="password" className="input input-bordered" required />
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Register</button>
                                </div>

                                <div className="min-w-[270px]">
                                    <div className="mt-2 text-center dark:text-gray-200">
                                        Already Have an Account? &nbsp;
                                        <Link
                                            className="text-blue-500 underline hover:text-blue-600"
                                            to="/login">
                                            Login Here
                                        </Link>
                                    </div>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TestRegister;