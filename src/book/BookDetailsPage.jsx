import { useLoaderData, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../shared/Navbar";

const BookDetailsPage = () => {

  const bookDetails = useLoaderData();
  const { id } = useParams();
  console.log(id);
  console.log("Book Details Found: ", bookDetails);


  // const { state } = useLocation();

  const { image, bookName, category, resalePrice, status, description } = bookDetails;

  const notifyWishList = (name) => {

    toast.info("Book Name:- " + '"' + name + '"' + ", Successfully added to the Cart/Wishlist");
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
              <span className="font-bold">status: </span>
              {status}
            </p>
            <p className="text-xl">
              <span className="font-bold">Description:</span>
              {description}
            </p>
            <div>
              <button onClick={() => notifyWishList(bookName)} className="btn btn-active mt-3 mr-2 p-3"> Wish to Read </button>

              <button onClick={() => notifyWishList(bookName)} className="btn btn-active mt-3 mr-2 p-3"> Add to Cart </button>
              <ToastContainer position="bottom-right" />
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
export default BookDetailsPage;
