import { Link, useLoaderData } from "react-router-dom";
import Banner from "../shared/Banner";

const CategoryBasedBookDataLoad = () => {
    const books = useLoaderData();
    console.log("Test Value", books);
    return (
        <div>
            <Banner></Banner>

            {/* <p className="text-3xl font-extrabold text-center text-yellow-600 m-5 p-5"> BOOK LIST</p> */}
            <div className="
                grid grid-cols-1 md:grid-cols-2 gap-5
                text-3xl font-bold
                text-yellow-500 bg-base-200 
                p-10 my-5 space-x-5"
            >

                <div className="text-right">
                    Category:
                    <span className="text-green-400">
                        {books[0].category} 
                    </span>
                </div>
                <div>
                    Total Books:
                    <span className="text-green-400">
                        {books.length}
                    </span>
                </div>


            </div>
            <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mx-auto">

                {books.map((book) => {
                    return (
                        <section className="card transition duration-300 ease-in-out hover:scale-110">

                            <div className="card bg-base-100 shadow-xl m-3 p-5">
                                <figure>
                                    <img
                                        src={book.image}
                                        alt={book.bookName}
                                        className="w-56 rounded h-36" />
                                </figure>
                                <div className="card-body text-center">
                                    <p> <span className="font-bold">Book Name:</span> {book.bookName}</p>
                                    <p><span className="font-bold">Category: </span> {book.category} </p>
                                    <p><span className="font-bold"> Resale Price:  </span> {book.resalePrice} </p>
                                    <p><span className="font-bold">Status: </span> {book.status} </p>
                                    <p><span className="font-bold"> Description: </span> {book.description.slice(0, 50)} </p>

                                    <div className="m-5">
                                        <Link to={`/book/${book._id}`}
                                            className="hover:text-orange-500 text-xl font-bold bg-orange-100 cursor-pointer rounded p-3">
                                            Book Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </section>
                    )
                })}

            </div>
        </div>
    );
};

export default CategoryBasedBookDataLoad;