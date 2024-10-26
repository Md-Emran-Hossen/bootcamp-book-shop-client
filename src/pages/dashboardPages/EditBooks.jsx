import { Link, useLoaderData, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EditBooks = () => {

    const loadedBook = useLoaderData();
    console.log("Loaded Data:=",loadedBook);
    const navigate = useNavigate();

    const handleEdit = (event) => {
        event.preventDefault();

        const form = new FormData(event.currentTarget);

        const bookName = form.get("bookName");
        const resalePrice = form.get("resalePrice");
        const author = form.get("author");
        const publisher = form.get("publisher");
        const rating = form.get("rating");
        const totalPages = form.get("totalPages");
        const review = form.get("review");
        
        const updatedBook = { bookName, resalePrice, author, publisher, rating, totalPages, review };

        fetch(`https://bootcamp-book-shop-server-psi.vercel.app/book/${loadedBook._id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(updatedBook),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Updated Data Found", data);
                if (data.modifiedCount) {
                    toast.success("Data Updated Successfully", {
                        position: "top-right",
                    });
                    navigate("/dashboard/allBooks");
                }
            });
    };

    return (
        <div className="mx-auto mt-20">
            <div className="flex justify-center justify-items-center">
                <h1 className="text-3xl font-bold text-center mb-10">
                    Update Book :
                </h1>
                &nbsp;&nbsp;&nbsp;
                <Link to="/">
                    <button
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white 
  py-2 px-4 border border-blue-500 hover:border-transparent rounded-tl-md rounded-br-md"
                    >
                        Home
                    </button>
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Link to="/dashboard/allBooks">
                    <button
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white 
  py-2 px-4 border border-blue-500 hover:border-transparent rounded-tl-md rounded-br-md"
                    >
                        Book
                    </button>
                </Link>
            </div>
            <form onSubmit={handleEdit} className="w-full ">
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="bookName"
                        >
                            Book Name
                        </label>
                    </div>
                    <div className="md:w-1/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-none w-full py-2 px-4 text-gray-700 
      leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="bookName"
                            type="text"
                            name="bookName"
                            defaultValue={loadedBook.bookName}
                        />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="resalePrice"
                        >
                            Resale Price
                        </label>
                    </div>
                    <div className="md:w-1/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-none w-full py-2 px-4 text-gray-700 
      leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="resalePrice"
                            type="text"
                            name="resalePrice"
                            defaultValue={loadedBook.resalePrice}
                        />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="author"
                        >
                            Author
                        </label>
                    </div>
                    <div className="md:w-1/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-none w-full py-2 px-4 text-gray-700 
      leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="author"
                            type="text"
                            name="author"
                            defaultValue={loadedBook.author}
                        />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="publisher"
                        >
                            Publisher
                        </label>
                    </div>
                    <div className="md:w-1/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-none w-full py-2 px-4 text-gray-700 
      leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="publisher"
                            type="text"
                            name="publisher"
                            defaultValue={loadedBook.publisher}
                        />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="rating"
                        >
                            Rating
                        </label>
                    </div>
                    <div className="md:w-1/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-none w-full py-2 px-4 text-gray-700 
      leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="rating"
                            type="text"
                            name="rating"
                            defaultValue={loadedBook.rating}
                        />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="totalPages"
                        >
                            Total Pages
                        </label>
                    </div>
                    <div className="md:w-1/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-none w-full py-2 px-4 text-gray-700 
      leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="totalPages"
                            type="text"
                            name="totalPages"
                            defaultValue={loadedBook.totalPages}
                        />
                    </div>
                </div>

                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="review"
                        >
                            Book Review
                        </label>
                    </div>
                    <div className="md:w-1/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-none w-full py-2 px-4 text-gray-700 
      leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="review"
                            type="text"
                            name="review"
                            defaultValue={loadedBook.review}
                        />
                    </div>
                </div>

                <div className="md:flex md:items-center">
                    <div className="md:w-1/3"></div>
                    <div className="md:w-2/3">
                        <button
                            className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white 
      font-bold py-2 px-4 rounded-none"
                            type="submit"
                        >
                            Update Book
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditBooks;