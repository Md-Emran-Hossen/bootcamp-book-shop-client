import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useTitle from '../../hooks/useTitle';
import { AuthContext } from "../../provider/AuthProvider";

const InsertBooksPage = () => {
    const { user } = useContext(AuthContext);

    const [categories, setCategories] = useState([]);
    const [categoryObject, setCategoryObject] = useState({});
    const [formData, setFormData] = useState({
        name: '',
        resalePrice: '',
        image: null,
        category: '',
        description: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    useTitle('Add Book');

    const imageHostKey = import.meta.env.VITE_IMAGEBB_KEY;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('http://localhost:5001/categories');

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
        if (!formData.name) {
            newErrors.name = "Product Name is Required";
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
                    bookName: formData.name,
                    resalePrice: formData.resalePrice,
                    postingTime: new Date(),
                    description: formData.description,
                    status: 'available',
                };
                // console.log("Book Object Value", book);
                // Save book information to the database
                const result = await fetch('http://localhost:5001/books', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(book)
                })
                    .then((res) => res.json())
                    .then((data) => {
                        // console.log(data);
                        if (data.insertedId) {
                            toast.success(`${formData.name} is added successfully`, {
                                position: "top-right",
                            });
                            navigate('/dashboard/allBooks');
                        }
                        e.target.reset();
                    });

                // const data = await result.json();
                // console.log("Book Data Found", data);
                // console.log("Book Name =", formData.name);
                // if (data.success) {
                //     toast.success(`${formData.name} is added successfully`);
                //     // navigate('/dashboard/myproducts');
                // } else {
                //     toast.error('Failed to add book.');
                // }
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
            <div className='w-10/12 p-7'>
                <h2 className="text-3xl md:text-center text-left font-bold">Add a Book</h2>
                <form onSubmit={handleSubmit} className="border shadow-lg py-2 px-6 mt-3 flex flex-col md:flex-row">
                    <div>
                        <div className="form-control w-full max-w-xs border p-2 border-indigo-400 mb-3">
                            <div className='flex input-bordered rounded-none'>
                                <label className="label"> <span className="label-text">Book Name:</span></label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full max-w-xs rounded-none bg-white"
                                />
                            </div>
                            {errors.name && <p className='text-red-500 text-xs'>{errors.name}</p>}
                        </div>

                        <div className='flex justify-center w-full max-w-xs items-center border p-2 border-indigo-400 mb-3'>
                            <div className="form-control w-11/12 max-w-xs mr-4 mt-1">
                                <label className="label"> <span className="label-text">Resell Price</span></label>
                                <input
                                    type="text"
                                    name="resalePrice"
                                    value={formData.resalePrice}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full max-w-xs rounded-none bg-white"
                                />
                                {errors.resalePrice && <p className='text-red-600 text-xs'>{errors.resalePrice}</p>}
                            </div>
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
                                {errors.image && <p className='text-red-500 text-xs'>{errors.image}</p>}
                            </div>
                        </div>
                    </div>

                    <div className='ml-0 md:ml-12'>
                        <div className="form-control w-full max-w-xs border p-2 border-indigo-400 mb-3">
                            <div className='flex justify-center items-center max-w-xs'>
                                <label className="label"> <span className="label-text">Product Category:</span></label>
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
                                <label className="label"> <span className="label-text">Description:</span></label>
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="input input-bordered w-full max-w-xs rounded-none bg-white"
                                />
                            </div>
                        </div>
                        <input className='btn btn-info md:w-80 w-64 rounded-none mt-1' value="Add Product" type="submit" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InsertBooksPage;