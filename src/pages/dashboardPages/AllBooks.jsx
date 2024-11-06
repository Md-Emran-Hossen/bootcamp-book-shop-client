import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import toast from 'react-hot-toast';
import { HiPencilAlt } from 'react-icons/hi';
import { MdDelete } from 'react-icons/md';
import { Link, useLoaderData } from 'react-router-dom';


const AllBooks = () => {

    const loadedBook = useLoaderData();
    console.log("Book Info", loadedBook);
    const [books, setBooks] = useState(loadedBook);

    const handleDelete = (_id) => {
        console.log(_id);
        fetch(`https://bootcamp-book-shop-server-psi.vercel.app/book/${_id}`, {
            method: "DELETE",
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                if (data.deletedCount) {
                    toast.success("Book Deleted Successfully", {
                        position: "top-right",
                    });
                    const remainingData = books.filter((book) => book._id !== _id);
                    setBooks(remainingData);
                }
            });
    };

    return (
        <>
            <Helmet>
                <title> Book Shop | All Books </title>
            </Helmet>
            <div className="mt-14">
                <div className="flex justify-center justify-items-center">
                    <h1 className="text-3xl font-bold text-center mb-10">
                        Total Books: {books.length}
                    </h1>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <Link to="/">
                        <button
                            className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white 
        py-2 px-4 border border-blue-500 hover:border-transparent rounded-tl-md rounded-br-md"
                        >
                            Home
                        </button>
                    </Link>
                </div>
                <div className="container mx-auto p-4">
                    <table className="min-w-full bg-white border">
                        <thead>
                            <tr className="bg-gray-100 text-gray-600 text-left">
                                <th className="py-2 px-4 border">
                                    Book Name
                                </th>
                                <th className="py-2 px-4 border">
                                    Category
                                </th>
                                <th className="py-2 px-4 border">
                                    image
                                </th>
                                <th className="py-2 px-4 border">
                                    Resale Price
                                </th>
                                <th className="py-2 px-4 border">
                                    Review
                                </th>
                                <th className="py-2 px-4 border">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr
                                    key={book._id}
                                    className="hover:bg-gray-100"
                                >
                                    <td className="py-2 px-4 border">
                                        {book.bookName}
                                    </td>
                                    <td className="py-2 px-4 border">
                                        {book.category}
                                    </td>
                                    <td className="py-2 px-4 border">
                                        <img src={book.image} className="w-16"></img>
                                    </td>
                                    <td className="py-2 px-4 border">
                                        {book.resalePrice}
                                    </td>

                                    <td className="py-2 px-4 border">
                                        {book.review.slice(0, 50)}
                                    </td>

                                    <td className="py-2 px-4 border">
                                        <Link to={`/dashboard/book/${book._id}`}>
                                            <button className="btn btn-outline btn-accent m-1">
                                                <HiPencilAlt /> Edit
                                            </button>
                                        </Link>
                                        <button onClick={() => handleDelete(book._id)}
                                            className="btn btn-outline btn-error m-1">
                                            <MdDelete />Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>

    );
};

export default AllBooks;