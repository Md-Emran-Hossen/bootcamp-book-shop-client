import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link, useLoaderData } from 'react-router-dom';

const AllBooks = () => {

    const loadedBook = useLoaderData();
    console.log("Book Info",loadedBook);
    const [books, setBooks] = useState(loadedBook);

    const handleDelete = (_id) => {
        console.log(_id);
        fetch(`http://localhost:5001/book/${_id}`, {
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
        <div className="mt-14">
        <div className="flex justify-center justify-items-center">
            <h1 className="text-3xl font-bold text-center mb-10">
                Book List: {books.length} 
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
        <table className="border-collapse w-full mx-auto">
            <thead>
                <tr>
                    <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                        Book Name
                    </th>
                    <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                        Category
                    </th>
                    <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                        image
                    </th>
                    <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                        Resale Price
                    </th>
                    <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                        Description
                    </th>
                    <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {books.map((book) => (
                    <tr
                        key={book._id}
                        className="bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0"
                    >
                        <td className="w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static">
                            <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                                {" "}
                                Book Name
                            </span>
                            {book.bookName}
                        </td>
                        <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                            <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                                {" "}
                                Category
                            </span>
                            {book.category}
                        </td>
                        <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                            <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                                {" "}
                                Image
                            </span>
                           src={book.image}
                        </td>
                        <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                            <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                                {" "}
                                Resale Price
                            </span>
                            {book.resalePrice}
                        </td>

                        <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                            <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                                {" "}
                                Description
                            </span>
                            {book.description}
                        </td>

                        <td className="w-full lg:w-auto p-3 text-gray-800 border border-b text-center block lg:table-cell relative lg:static">
                            <span className="lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase">
                                Actions
                            </span>
                            <Link to={`/dashboard/book/${book._id}`}>
                                <button
                                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 
        border border-blue-500 hover:border-transparent rounded-none"
                                >
                                    Edit
                                </button>
                            </Link>
                            &nbsp;&nbsp;&nbsp;
                            <button
                                onClick={() => handleDelete(book._id)}
                                className="bg-red-500 hover:bg-orange-700 text-white font-semibold py-2 px-4 
        border border-blue-500 hover:border-transparent rounded-none"
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
};

export default AllBooks;