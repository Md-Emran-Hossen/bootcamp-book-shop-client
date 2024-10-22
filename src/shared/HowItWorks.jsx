// import React from 'react';
import book1 from "../assets/book1.png";
import book2 from "../assets/book2.jpeg";
import book3 from "../assets/book3.jpeg";

const HowItWorks = () => {
    return (
        <>
            <div className="m-5 p-5">
                <h2 className="text-center font-bold text-4xl text-yellow-500">How it Works</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-5/6 mx-auto">
                <div>
                    <div className="card bg-base-100 w-72 shadow-xl">
                        <figure>
                            <img
                                src={book1}
                                alt="Book" className="h-32"/>
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Novels!</h2>
                            <p>A book is a medium for recording information in the form of writing or images.</p>
                            <div className="card-actions justify-center">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div>

                    <div className="card bg-base-100 w-72 shadow-xl">
                        <figure>
                            <img 
                                src={book2}
                                alt="Literature" className="h-32 content-center" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Literatures!</h2>
                            <p>Literature is any collection of written work. orm of writing or relevant theories, methods</p>
                            <div className="card-actions justify-center">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>

                </div>
                <div>
                    <div className="card bg-base-100 w-72 shadow-xl">
                        <figure>
                            <img
                                src={book3}
                                alt="Poem" className="h-32 content-center" />
                        </figure>
                        <div className="card-body">
                            <h2 className="card-title">Poems!</h2>
                            <p>A Poem About A Book. Books are magical and can do so much. </p>
                            <div className="card-actions justify-center">
                                <button className="btn btn-primary">Buy Now</button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </>

    );
};

export default HowItWorks;