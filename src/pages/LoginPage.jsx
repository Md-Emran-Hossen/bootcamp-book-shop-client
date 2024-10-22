import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate, Link, useLocation } from "react-router-dom";
import Navbar from "../shared/Navbar";
import toast from "react-hot-toast";
import { GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { Helmet } from "react-helmet-async";

const LoginPage = () => {

    const { signIn, googleSignIn, githubSignIn } = useContext(AuthContext);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = (event) => {
        event.preventDefault();

        const form = new FormData(event.currentTarget);

        const email = form.get("email");
        const password = form.get("password");
         console.log(email, password);

        signIn(email, password)
            .then((result) => {
                console.log(result.user);
                toast.success("User Login Successfull", {
                    position: "top-right",
                });
                //  navigate("/");
                navigate(location?.state ? location.state : "/");
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleGoogleSignIn = () => {
        googleSignIn(googleProvider)
            .then((result) => {
                console.log(result.user);
                toast.success("User Google Login Successfull", {
                    position: "top-right",
                });
                //  navigate("/");
                navigate(location?.state ? location.state : "/");
            })
            .catch((error) => {
                console.log(error);
            })
    };


    const handleGithubSignIn = () => {
        githubSignIn(githubProvider)
            .then((result) => {
                console.log(result.user);
                toast.success("User GitHub Login Successfull", {
                    position: "top-right",
                });
                //  navigate("/");
                navigate(location?.state ? location.state : "/");
            })
            .catch((error) => {
                console.log(error);
            })
    };

    return (
        <>
        <Helmet>
            <title> Book Shop | Login </title>
        </Helmet>
            <div className="mt-20 p-5">
                {/* <Navbar></Navbar> */}
                <div>
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="card shrink-0 shadow-2xl">
                            <form onSubmit={handleLogin} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name="email" placeholder="your email" className="input input-bordered" required />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name="password" placeholder="your password" className="input input-bordered" required />
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">Login</button>

                                    <button
                                        onClick={handleGoogleSignIn}
                                        type="button"
                                        className="btn btn-outline btn-error mt-2"
                                    >
                                        <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                                            Sign in with Google
                                        </span>
                                    </button>

                                    <button onClick={handleGithubSignIn} type="button" className="btn btn-outline mt-2">
                                        <span className="flex items-center justify-center gap-1 font-medium py-1 px-2.5 text-base false">
                                            Sign in with GitHub
                                        </span>
                                    </button>
                                </div>

                                <div className="min-w-[270px]">
                                    <div className="mt-2 text-center dark:text-gray-200">
                                        Don&apos;t Have an Account? &nbsp;
                                        <Link
                                            className="text-blue-500 underline hover:text-blue-600"
                                            to="/register">
                                            Register Here
                                        </Link>
                                    </div>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoginPage;