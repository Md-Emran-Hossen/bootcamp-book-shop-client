// import React from 'react';

const ContactUs = () => {
    return (
        <div>
            <div className="w-full bg-base-200">
                <h2 className="text-4xl text-center font-bold text-yellow-500 m-5 p-5"> Contact Us </h2>
            </div>

            <div className="hero bg-white min-h-screen">
                <div className="hero-content flex-col-reverse lg:flex-row-reverse">

                    <div className="card w-full max-w-md shrink-0">
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">First Name</span>
                                </label>
                                <input type="text" placeholder="First Name" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Last Name</span>
                                </label>
                                <input type="text" placeholder="Last Name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Email</span>
                                </label>
                                <input type="text" placeholder="email" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Subject</span>
                                </label>
                                <textarea type="text" placeholder="subject" className="input input-bordered h-16" />
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                    <div className="text-left">
                        <h1 className="text-2xl font-bold">For any query! </h1>
                        <h2>
                            <span className="text-xl font-bold"> Please!  </span>
                        </h2>
                        <h2 className="text-green-600 text-4xl font-bold">
                            Contact us!
                        </h2>
                        <p className="py-6 text-left text-xl">
                           <span className="text-green-400 font-semibold"> Hours of operation: </span>  This tells customers 
                            when they can contact your business. <br />
                            <span className="text-green-400 font-semibold"> Phone number and email address: </span>
                            Customers can contact your business directly. <br />
                            <span className="text-green-400 font-semibold"> Response time: </span>
                            Let customers know when they should expect a response. <br />
                            <span className="text-green-400 font-semibold"> Location: </span>
                            Build trust with customers by showing you are legitimate.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ContactUs;