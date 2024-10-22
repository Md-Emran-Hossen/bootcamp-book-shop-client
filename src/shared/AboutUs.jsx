// import React from 'react';

import pic1 from "../assets/person-1.png"
import pic2 from "../assets/person-2.jpeg"

const AboutUs = () => {
    return (

        <>
        <div className="w-full bg-base-200">
        <h2 className="text-4xl text-center font-bold text-yellow-500 m-5 p-5"> About Us </h2>
        </div>
          
            <div className="grid grid-cols-1 lg:grid-cols-2 w-3/4 mx-auto gap-10">
                <div className="border border-black rounded-lg p-5 hover:bg-purple-800 hover:border-none hover:text-white drop-shadow-2xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <figure>
                            <img
                                src={pic1}
                                alt="Movie" />
                        </figure>
                        <div>
                            <h2 className="card-title text-xl font-bold">Fatiha Suu </h2>
                            <p className="text-md font-semibold">CEO</p>
                            <p className="text-xl font-bold">Book Shop</p>
                            <p className="text-xs">Contact: fatiha_suu@jmail.eom</p>
                        </div>
                    </div>

                </div>
                <div className="border border-black rounded-lg p-5 hover:bg-purple-800 hover:border-none hover:text-white drop-shadow-2xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                        <figure>
                            <img
                                src={pic2}
                                alt="Movie" />
                        </figure>
                        <div>
                            <h2 className="card-title text-xl font-bold">Alien Brain</h2>
                            <p className="text-md font-semibold">Director</p>
                            <p className="text-xl font-bold">Book Shop</p>
                            <p className="text-xs">Contact: alien_coder@jmail.eom</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUs;