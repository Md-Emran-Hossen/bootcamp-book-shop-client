import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const CategoryBasedBooks = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("https://bootcamp-book-shop-server-psi.vercel.app/categories")
            .then((res) => res.json())
            .then((data) => setCategories(data));
    }, []);
    // console.log(categories);
    return (
        <div>
            {/* 
            {categories.map((category) => (
                <NavLink
                    to={`/category/${category._id}`}
                    className="block p-2 font-semibold"
                    key={category._id}
                >
                    <button className="btn btn-outline border-slate-500 text-md rounded-sm">
                        {category.categoryName}
                    </button>
                </NavLink>
            ))} */}
            <div className="text-4xl font-extrabold 
                            text-center text-yellow-500 
                            bg-base-200 my-5 p-5"
            >
                <h2>All Category: {categories.length}</h2>
            </div>
            <section className="border-green-600 w-full mx-auto my-10 bg-gray-100">
                <h3></h3>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-2 w-full mx-auto px-5">
                    {categories.map((category) => {
                        return (
                            <div className="w-full mx-auto">
                                <NavLink
                                    to={`/categoryy/${category._id}`}
                                    className="block p-2 font-semibold"
                                    key={category._id}
                                >
                                    <button className="btn btn-outline border-slate-500 w-full text-md bg-gray-50 rounded">
                                        {category.categoryName}
                                    </button>
                                </NavLink>
                            </div>
                        )
                    })}
                </div>
            </section>
        </div>
    );
};

export default CategoryBasedBooks;