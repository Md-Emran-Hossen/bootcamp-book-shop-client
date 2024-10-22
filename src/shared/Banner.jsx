// import React from 'react'
import image from '../../public/images/bookstore.jpg'

export default function Banner() {
    return (
        <>
           <div className="w-full mx-auto mt-10 p-5">
            <div className="hero bg-base-200 rounded">
                <div className="hero-content flex-col md:flex-col lg:flex-row-reverse">
                    <diV className="w-1/2">
                        <img
                            src= {image}
                            className="rounded-md shadow-2xl w-full mt-10 h-60"
                        />
                    </diV>

                    <div className="w-1/2 ml-2">
                        <h1 className="font-serif text-left">
                            Unlock a world of Stories- Find Your Next Favorite Book at &nbsp;
                            <span className="font-bold text-yellow-600">BOOK SHOP</span>
                        </h1>
                        <button className="btn btn-active text-xl mt-3 p-2">Buy Book</button>
                    </div>

                </div>
            </div>
        </div>

        </>
    )
}
