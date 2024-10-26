import toast from "react-hot-toast";
import { Link, useLoaderData, useNavigate } from "react-router-dom";


const EditCategories = () => {

    const loadedCategory = useLoaderData();
    const navigate = useNavigate();

    const handleEdit = (event) => {
        event.preventDefault();

        const form = new FormData(event.currentTarget);

        const categoryName = form.get("categoryName");
        const categoryDetails = form.get("categoryDetails");

        const updatedCategory = { categoryName, categoryDetails };

        fetch(`https://bootcamp-book-shop-server-psi.vercel.app/category/${loadedCategory._id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(updatedCategory),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("Updated Data Found", data);
                if (data.modifiedCount) {
                    toast.success("Data Updated Successfully", {
                        position: "top-right",
                    });
                    navigate("/dashboard/allCategories");
                }
            });
    };


    return (
        <div className="mx-auto mt-20">
            <div className="flex justify-center justify-items-center">
                <h1 className="text-3xl font-bold text-center mb-10">
                    Update a Category :
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
                <Link to="/dashboard/categories">
                    <button
                        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white 
      py-2 px-4 border border-blue-500 hover:border-transparent rounded-tl-md rounded-br-md"
                    >
                        Category
                    </button>
                </Link>
            </div>
            <form onSubmit={handleEdit} className="w-full ">
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="categoryName"
                        >
                            Category Name
                        </label>
                    </div>
                    <div className="md:w-1/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-none w-full py-2 px-4 text-gray-700 
          leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="categoryName"
                            type="text"
                            name="categoryName"
                            defaultValue={loadedCategory.categoryName}
                        />
                    </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                    <div className="md:w-1/3">
                        <label
                            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                            htmlFor="email"
                        >
                           Category Details
                        </label>
                    </div>
                    <div className="md:w-1/3">
                        <input
                            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-none w-full py-2 px-4 text-gray-700 
          leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            id="categoryDetails"
                            type="text"
                            name="categoryDetails"
                            defaultValue={loadedCategory.categoryDetails}
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
                            Update Category
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditCategories;