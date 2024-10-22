// import React from 'react'

// import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";


export default function FaqPage() {
    return (
        <>
        <Navbar></Navbar>
            <div className="mt-10 mb-10 pt-10">

                <section className="w-3/4 mx-auto">
                    <div className="collapse collapse-arrow bg-base-200">
                        <input type="radio" name="my-accordion-2" checked="checked" />
                        <div className="collapse-title text-xl font-medium">What is React.js and Explain the concept of "components" in React </div>
                        <div className="collapse-content">
                            <p>
                                <span className="underline font-bold text-green-700"> React: </span>
                                React is a JavaScript library for building user interfaces. <br />
                                <span className="underline font-bold text-green-700"> Components in react: </span>
                                Components are like functions that return HTML elements.
                                Components are independent and reusable bits of code.
                                Components come in two types,
                                <span className="font-bold text-green-700"> Class components </span>  and
                                <span className="font-bold text-green-700"> Function components </span>.
                            </p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-200">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium"> What is JSX in React, and how does it work?</div>
                        <div className="collapse-content">
                            <p>
                                <span className="font-bold text-green-700"> JSX </span>
                                stands for JavaScript XML. <br />
                                <span className="font-bold text-green-700"> JSX </span> allows us to write HTML elements
                                in JavaScript and place them in the DOM without any
                                <span className="font-bold text-green-700"> createElement() </span> and/or
                                <span className="font-bold text-green-700"> appendChild() </span> methods.
                                JSX converts HTML tags into react elements.
                            </p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-200">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium">What is the Virtual DOM, and how does React use it to optimize performance?</div>
                        <div className="collapse-content">
                            <p>
                                <span className="underline font-bold text-green-700"> Virtual DOM: </span>
                                The virtual DOM is a lightweight copy of the real DOM.
                                <br />
                                It allows React to manage changes more efficiently by minimizing the direct manipulation required on the real DOM.

                            </p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-200">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium"> Explain the concept of "profs" in React and how they are used. </div>
                        <div className="collapse-content">
                            <p>
                                <span className="underline font-bold text-green-700"> profs: </span>
                                The word “props” implies “properties”, and its working functionality is quite similar to HTML attributes.
                                <br />
                                Data can be passed from one component to another component using props.

                            </p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-200">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium"> What is "state" in React. and how does it differ from props? </div>
                        <div className="collapse-content">
                            <p>
                                <span className="underline font-bold text-green-700"> State: </span>
                                The state object is where you store property values that belong to the component.
                                When the state object changes, the component re-renders.
                                <br />
                                <span className="font-bold text-green-700"> profs
                                </span> are external and controlled by whatever renders the component.
                                The
                                <span className="font-bold text-green-700"> State </span>
                                is internal and controlled by the React Component itself.
                            </p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-200">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium"> Explain the useState hook and provide an example of how it is used. </div>
                        <div className="collapse-content">
                            <p>
                                <span className="underline font-bold text-green-700"> useState Hook: </span>
                                The React useState Hook allows us to track state in a function component.
                                It returns an array with two values: the current state and a function to update it.
                                The Hook takes an initial state value as an argument and returns an updated state value whenever the setter function is called.
                            </p>
                        </div>
                    </div>
                    <div className="collapse collapse-arrow bg-base-200">
                        <input type="radio" name="my-accordion-2" />
                        <div className="collapse-title text-xl font-medium"> What is the purpose of the useEffect hook in React, and when would you use it? </div>
                        <div className="collapse-content">
                            <p>
                                <span className="underline font-bold text-green-700"> useEffect Hook: </span>
                                The
                                <span className="font-bold text-green-700"> useEffect Hook </span>
                                allows you to perform
                                <span className="font-bold text-green-700"> side effects </span>
                                in your components.
                                Some examples of side effects are: &nbsp;
                                <span className="font-bold text-blue-700">
                                    fetching data, directly updating the DOM, and timers.
                                </span>
                                <br /> <br />
                                <span className="font-bold text-green-700"> useEffect Hook </span>
                                will use when we have to execute some functions at the life life cycle of a component.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
            {/* <Footer></Footer> */}
        </>
    )
}
