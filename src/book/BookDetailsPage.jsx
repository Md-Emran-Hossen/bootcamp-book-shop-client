import { useLoaderData, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../shared/Navbar";
import { useState } from "react";

const BookDetailsPage = () => {

  const bookDetails = useLoaderData();
  const { id } = useParams();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  // const { state } = useLocation();
  const { image, bookName, category, resalePrice, author, publisher, rating, totalPages, status, review } = bookDetails;

  const notifyWishList = (bookName) => {

    toast.info("Book Name:- " + '"' + bookName + '"' + ", Successfully added to the Cart/Wishlist");
  };

  const notifyWishList2 = () => {

    toast.info("Thanks!!! Your order is submitted for admin approval");
  };

  return (
    <>
      <Navbar></Navbar>
      <div className="hero w-5/6 mx-auto m-3 p-3">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src={`${image}`} alt={image}
            className="max-w-sm rounded shadow-2xl h-56 lg:h-96 w-56 lg:w-96"
          />
          <div>
            <p className="text-xl">
              <span className="font-bold">Book Name: </span>
              {bookName}
            </p>
            <p className="text-xl">
              <span className="font-bold">Category: </span>
              {category}
            </p>
            <p className="text-xl">
              <span className="font-bold">Resale Price: </span>
              {resalePrice}
            </p>

            <p className="text-xl">
              <span className="font-bold"> Author: </span>
              {author}
            </p>
            <p className="text-xl">
              <span className="font-bold">Publisher: </span>
              {publisher}
            </p>
            <p className="text-xl">
              <span className="font-bold">Rating: </span>
              {rating}
            </p>
            <p className="text-xl">
              <span className="font-bold">Total Pages: </span>
              {totalPages}
            </p>
          
            <p className="text-xl">
              <span className="font-bold">Review:</span>
              {review}
            </p>
            <p className="text-xl">
              <span className="font-bold">status: </span>
              {status}
            </p>
            <div className="flex">
           
              <button onClick={() => notifyWishList(bookName)} className="btn btn-active mt-3 mr-2 p-3"> Wish to Read </button>
              <button onClick={() => setIsEditModalOpen(true)} className="btn btn-active mt-3 mr-2 p-3"> Buy Now </button>
              <ToastContainer position="bottom-right" />
            </div>
          </div>
        </div>

        {
          isEditModalOpen && (

            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded-lg w-1/3 mt-5">
                <h3 className="text-xl mb-4">
                  Book Name: &nbsp;
                  <span className="text-green-500">{bookName} </span> 
                </h3>
                <div>
                  <img
                    src={`${image}`} alt={image}
                    className="max-w-sm rounded shadow-2xl h-16 w-16"
                  />
                </div>
                {/* <div className="mb-4">
                  <label className="block text-sm font-medium">Book Name::</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={bookName}
                  />
                </div> */}
                {/* <div className="mb-4">
                  <label className="block text-sm font-medium">Category:</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={category}
                  />
                </div>
                   */}
                <div className="mb-4">
                  <label className="block text-sm font-medium">Author:</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={author}
                  />
                </div>

                {/* <div className="mb-4">
                  <label className="block text-sm font-medium">Publisher:</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={publisher}
                  />
                </div> */}

                <div className="mb-4">
                  <label className="block text-sm font-medium">Resale Price:</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={resalePrice}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium">Review:</label>
                  <textarea
                    type="text"
                    className="w-full p-2 border rounded"
                    value={review}
                  />
                </div>

                {/* <div className="mb-4">
                  <label className="block text-sm font-medium">Rating:</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={rating}
                  />
                </div> */}

                <button
                  onClick={() => notifyWishList2(bookName)}
                  className="bg-blue-500 text-white p-2 rounded mr-2"
                >
                  <ToastContainer position="bottom-right" />
                  Buy Book
                </button>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="bg-gray-500 text-white p-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          )
        }
      </div>
    </>
  )
}
export default BookDetailsPage;
