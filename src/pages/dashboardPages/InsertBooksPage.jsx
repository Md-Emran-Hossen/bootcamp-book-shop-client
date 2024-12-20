import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { AuthContext } from '../../provider/AuthProvider';
import { Helmet } from 'react-helmet-async';


const InsertBooksPage = () => {
    const { user } = useContext(AuthContext);

    const [categories, setCategories] = useState([]);
    const [categoryObject, setCategoryObject] = useState({});
    const [formData, setFormData] = useState({
        bookName: '',
        resalePrice: '',
        image: null,
        category: '',
		author: '',
		publisher: '',
		rating: '',
		totalPages: '',
		review: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    // useTitle('Add Book');

    const imageHostKey = import.meta.env.VITE_IMAGEBB_KEY;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('https://bootcamp-book-shop-server-psi.vercel.app/categories');

                const data = await res.json();
                setCategories(data);

                const tempCategoryObject = {};
                data.forEach(category => {
                    tempCategoryObject[category.categoryName] = category._id;
                });
                setCategoryObject(tempCategoryObject);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.bookName) {
            newErrors.bookName = "Book Name is Required";
        }
        if (!formData.resalePrice) {
            newErrors.resalePrice = "Resell Price is Required";
        }
        if (!formData.image) {
            newErrors.image = "Photo is Required";
        }
        if (!formData.category) {
            newErrors.category = "Category is Required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        const image = formData.image;
        const imageData = new FormData();
        imageData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;

        try {
            const res = await fetch(url, {
                method: 'POST',
                body: imageData
            });
            const imgData = await res.json();

            if (imgData.success) {
                const book = {
                    categoryId: categoryObject[formData.category],
                    category: formData.category,
                    image: imgData.data.url,
                    bookName: formData.bookName,

                    author: formData.author,
                    publisher: formData.publisher,
                    rating: formData.rating,
                    totalPages: formData.totalPages,

                    resalePrice: formData.resalePrice,
                    postingTime: new Date(),
                    review: formData.review,
                    status: 'available',
                };
                
                // Save book information to the database
                const result = await fetch('https://bootcamp-book-shop-server-psi.vercel.app/books', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(book)
                })
                    // .then((res) => res.json())
                    // .then((data) => {
                        
                    //     if (data.insertedId) {
                    //         toast.success(`${formData.bookName} is added successfully`, {
                    //             position: "top-right",
                    //         });
                    //         navigate('/dashboard/allBooks');
                    //     }
                    //     e.target.reset();
                    // });

                const data = await result.json();
                // console.log("Book Data Found", data);
                if (data.insertedId) {
                    console.log("Data object found:", data.insertedId);
                    toast.success(`${formData.bookName} is added successfully`);
                     navigate('/dashboard/allBooks');
                } else {
                    toast.error('Failed to add book.');
                }
            } else {
                toast.error('Image upload failed. Please try again.');
            }
        } catch (error) {
            console.error('Failed to add product:', error);
            toast.error('An error occurred while adding the product.');
        }
    };

    return (
        <div>
             <Helmet>
                <title> Book Shop | Add Book </title>
            </Helmet>
 
                <h2 className="text-3xl md:text-left font-bold pl-10">Add a Book</h2>
                            {/* <form onSubmit={handleSubmit} className="border shadow-lg py-2 px-6 mt-3 flex flex-col md:flex-row">
                <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="border p-2 border-indigo-400 mb-3">
                            <div className="flex input-bordered rounded-none">
                                <label className="label"> <span className="label-text">Book Name:</span></label>
                                <input
                                    type="text"
                                    name="bookName"
                                    value={formData.bookName}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full rounded-none bg-white"
                                />
                            </div>
                            {errors.name && <p className='text-red-500 text-xs'>{errors.name}</p>}
                        </div>

                        <div className="border p-2 border-indigo-400 mb-3">
                            <div className="flex input-bordered rounded-none">
                                <label className="label"> <span className="label-text">Resale Price: </span></label>
                                <input
                                    type="text"
                                    name="resalePrice"
                                    value={formData.resalePrice}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full rounded-none bg-white"
                                />
                                </div>
                                {errors.resalePrice && <p className='text-red-600 text-xs'>{errors.resalePrice}</p>}
                        </div>
         
                        <div className="form-control w-full max-w-xs border p-2 border-indigo-400 mb-3">
                            <div className='flex justify-center items-center max-w-xs'>
                                <label className="label"> <span className="label-text">Upload Photo:</span></label>
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleFileChange}
                                    className="input input-bordered w-full max-w-xs p-1 rounded-none bg-white"
                                />
                                  </div>
                                {errors.image && <p className='text-red-500 text-xs'>{errors.image}</p>}
                          
                        </div>
                              
                        <div className="form-control w-full max-w-xs border p-2 border-indigo-400 mb-3">
                            <div className='flex justify-center items-center max-w-xs'>
                                <label className="label"> <span className="label-text">Book Category:</span></label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full max-w-xs rounded-none text-sm bg-white"
                                >
                                    <option value="">Select category</option>
                                    {Object.keys(categoryObject).map((category, index) => (
                                        <option key={index} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {errors.category && <p className='text-red-500 text-xs'>{errors.category}</p>}
                        </div>

                        <div className="form-control w-full max-w-xs border p-2 border-indigo-400 mb-3">
                            <div className='flex input-bordered rounded-none'>
                                <label className="label"> <span className="label-text">Author:</span></label>
                                <input
                                    type="text"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full max-w-xs rounded-none bg-white"
                                />
                            </div>
                        </div>

                        <div className="form-control w-full max-w-xs border p-2 border-indigo-400 mb-3">
                            <div className='flex input-bordered rounded-none'>
                                <label className="label"> <span className="label-text">Publisher:</span></label>
                                <input
                                    type="text"
                                    name="publisher"
                                    value={formData.publisher}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full max-w-xs rounded-none bg-white"
                                />
                            </div>
                        </div>

                        <div className="form-control w-full max-w-xs border p-2 border-indigo-400 mb-3">
                            <div className='flex input-bordered rounded-none'>
                                <label className="label"> <span className="label-text">Rating:</span></label>
                                <input
                                    type="text"
                                    name="rating"
                                    value={formData.rating}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full max-w-xs rounded-none bg-white"
                                />
                            </div>
                        </div>

                        <div className="form-control w-full max-w-xs border p-2 border-indigo-400 mb-3">
                            <div className='flex input-bordered rounded-none'>
                                <label className="label"> <span className="label-text">Total Pages:</span></label>
                                <input
                                    type="text"
                                    name="totalPages"
                                    value={formData.totalPages}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full max-w-xs rounded-none bg-white"
                                />
                            </div>
                        </div>

                        <div className="form-control w-full max-w-xs border p-2 border-indigo-400 mb-3">
                            <div className='flex input-bordered rounded-none'>
                                <label className="label"> <span className="label-text">Review:</span></label>
                                <input
                                    type="text"
                                    name="review"
                                    value={formData.review}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full max-w-xs rounded-none bg-white"
                                />
                            </div>
                        </div>
                        <input className='btn btn-info md:w-80 w-64 rounded-none mt-1' value="Add Product" type="submit" />
                    </div>
                </form> */}

<h2 className="text-3xl md:text-center font-bold mt-5 p-2 underline">Add a Book</h2>
            <div className="mx-auto mt-5 p-2">
                <form onSubmit={handleSubmit} className="w-full">

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                Book Name:
                            </label>
                        </div>
                        <div className="md:w-1/3">
                            <input
                                type="text"
                                name="bookName"
                                value={formData.bookName}
                                onChange={handleInputChange}
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-none w-full py-2 px-4 text-gray-700 
              leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            />
                        </div>
                        {errors.bookName && <p className='text-red-500 text-xs'>{errors.bookName}</p>}
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                Resale Price:
                            </label>
                        </div>
                        <div className="md:w-1/3">
                            <input
                                type="text"
                                name="resalePrice"
                                value={formData.resalePrice}
                                onChange={handleInputChange}
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-none w-full py-2 px-4 text-gray-700 
              leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            />
                        </div>
                        {errors.resalePrice && <p className='text-red-500 text-xs'>{errors.resalePrice}</p>}
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                Upload Photo:
                            </label>
                        </div>
                        <div className="md:w-1/3">
                            <input
                                type="file"
                                name="image"
                                onChange={handleFileChange}
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-none w-full py-2 px-4 text-gray-700 
              leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            />
                        </div>
                        {errors.image && <p className='text-red-500 text-xs'>{errors.image}</p>}

                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                Category:
                            </label>
                        </div>
                        <div className="md:w-1/3">
                        <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className ="bg-gray-200 appearance-none border-2 border-gray-200 rounded-none w-full py-2 px-4 text-gray-700 
              leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                                >
                                    <option value="">Select category</option>
                                    {Object.keys(categoryObject).map((category, index) => (
                                        <option key={index} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                        </div>
                        {errors.category && <p className='text-red-500 text-xs'>{errors.category}</p>}
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                Author:
                            </label>
                        </div>
                        <div className="md:w-1/3">
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleInputChange}
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-none w-full py-2 px-4 text-gray-700 
              leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            />
                        </div>
                        {errors.author && <p className='text-red-500 text-xs'>{errors.author}</p>}
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                            Publisher:
                            </label>
                        </div>
                        <div className="md:w-1/3">
                            <input
                                type="text"
                                name="publisher"
                                value={formData.publisher}
                                onChange={handleInputChange}
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-none w-full py-2 px-4 text-gray-700 
              leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            />
                        </div>
                        {errors.publisher && <p className='text-red-500 text-xs'>{errors.publisher}</p>}
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                Rating:
                            </label>
                        </div>
                        <div className="md:w-1/3">
                            <input
                                type="text"
                                name="rating"
                                value={formData.rating}
                                onChange={handleInputChange}
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-none w-full py-2 px-4 text-gray-700 
              leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            />
                        </div>
                        {errors.rating && <p className='text-red-500 text-xs'>{errors.rating}</p>}
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                Total Pages:
                            </label>
                        </div>
                        <div className="md:w-1/3">
                            <input
                                type="text"
                                name="totalPages"
                                value={formData.totalPages}
                                onChange={handleInputChange}
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-none w-full py-2 px-4 text-gray-700 
              leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            />
                        </div>
                        {errors.totalPages && <p className='text-red-500 text-xs'>{errors.totalPages}</p>}
                    </div>

                    <div className="md:flex md:items-center mb-6">
                        <div className="md:w-1/3">
                            <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                                Review:
                            </label>
                        </div>
                        <div className="md:w-1/3">
                            <input
                                type="text"
                                name="review"
                                value={formData.review}
                                onChange={handleInputChange}
                                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-none w-full py-2 px-4 text-gray-700 
              leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                            />
                        </div>
                        {errors.review && <p className='text-red-500 text-xs'>{errors.review}</p>}
                    </div>

                    <div className="md:flex md:items-center">
                        <div className="md:w-1/3"></div>
                        <div className="md:w-2/3">

                        <input 
                           className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white 
                           font-bold py-2 px-4 mb-10 rounded" 
                            value="Add Book" 
                            type="submit" 
                        />
                         
                        </div>
                    </div>

                   

                </form>
            </div>
           
        </div>
    );
};

export default InsertBooksPage;