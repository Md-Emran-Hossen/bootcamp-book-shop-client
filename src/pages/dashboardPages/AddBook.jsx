// import { useQuery } from '@tanstack/react-query';
import { useContext, useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import {useForm} from 'react-hook-form';
// import Loading from '../../Shared/Loading/Loading';
import toast from 'react-hot-toast';
import { AuthContext } from '../../provider/AuthProvider';
import { Helmet } from 'react-helmet-async';
// import useSeller from '../../../hooks/useSeller';
// import useTitle from '../../../hooks/useTitle';

const AddBook = () => {
    const { user } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);
    const [categoryObject, setCategoryObject] = useState({});
    const navigate = useNavigate();
  
    const imageHostKey = import.meta.env.VITE_IMAGEBB_KEY;

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {  category: '' }
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch('https://bootcamp-book-shop-server-psi.vercel.app/categories');
                const data = await res.json();
                setCategories(data);

                // Create category object after fetching categories
                // as we need to insert category._id while adding product into DB.
                const tempCategoryObject = {};
                data.forEach(category => {
                    tempCategoryObject[category.name] = category._id;
                });
                setCategoryObject(tempCategoryObject);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);


    const handleAddProduct = data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgData => {
                if (imgData.success) {
                    // console.log(data);
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
                    }

                    // save product information to the database
                    fetch('https://bootcamp-book-shop-server-psi.vercel.app/books', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                        },
                        body: JSON.stringify(book)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result);
                            toast.success(`${data.bookName} is added successfully`);
                            navigate("/dashboard/allBooks")
                        })
                }
            })


    }
    return (
        <div>
             <Helmet>
                <title> Book Shop | Add Book </title>
            </Helmet>
            <div className='w-10/12 p-7'>
                <h2 className="text-2xl text-[#FF652E] md:text-center text-left font-bold">Add a Product</h2>
                <form onSubmit={handleSubmit(handleAddProduct)} className="border shadow-lg py-2 px-6 mt-3 flex flex-col md:flex-row">
                    <div>
                        <div className="form-control w-full max-w-xs border p-2 border-indigo-400 mb-3">
                            <div className='flex input-bordered rounded-none'>
                                <label className="label"> <span className="label-text ">Book Name:</span></label>

                                <input type="text" {...register("bookName", {
                                    required: "Book Name is Required"
                                })}
                                    className="input input-bordered w-full max-w-xs rounded-none bg-white" />
                            </div>
                            {errors.bookName && <p className='text-red-500 text-xs'>{errors.bookName.message}</p>}
                        </div>

                        <div className='flex justify-center w-full max-w-xs items-center border p-2 border-indigo-400 mb-3'>
                            <div className="form-control w-11/12 max-w-xs mr-4 mt-1">
                                <label className="label"> <span className="label-text ">Resell Price</span></label>

                                <input type="text" {...register("resalePrice", {
                                    required: "Resale Price Required"
                                })} className="input input-bordered w-full max-w-xs rounded-none bg-white" />
                                {errors.resalePrice && <p className='text-red-600 text-xs'>{errors.resalePrice.message}</p>}
                            </div>

                        </div>

                        <div className="form-control w-full max-w-xs border p-2 border-indigo-400 mb-3">
                            <div className='flex justify-center items-center  max-w-xs'>
                                <label className="label"> <span className="label-text">Upload Photo:</span></label>
                                <input type="file" {...register("image", {
                                    required: "Photo is Required"
                                })} className="input input-bordered w-full max-w-xs p-1 rounded-none bg-white" />
                                {errors.image && <p className='text-red-500 text-xs'>{errors.image.message}</p>}
                            </div>
                        </div>


                        <div className="form-control w-full max-w-xs border p-2 border-indigo-400 mb-3">
                            <div className='flex input-bordered rounded-none'>
                                <label className="label"> <span className="label-text ">Author:</span></label>

                                <input type="text" {...register("author", {
                                    required: "Author is Required"
                                })}
                                    className="input input-bordered w-full max-w-xs rounded-none bg-white" />
                            </div>
                            {errors.author && <p className='text-red-500 text-xs'>{errors.author.message}</p>}
                        </div>


                        <div className="form-control w-full max-w-xs border p-2 border-indigo-400 mb-3">
                            <div className='flex input-bordered rounded-none'>
                                <label className="label"> <span className="label-text ">Publisher:</span></label>

                                <input type="text" {...register("publisher", {
                                    required: "Publisher is Required"
                                })}
                                    className="input input-bordered w-full max-w-xs rounded-none bg-white" />
                            </div>
                            {errors.publisher && <p className='text-red-500 text-xs'>{errors.publisher.message}</p>}
                        </div>



                        <div className="form-control w-full max-w-xs border p-2 border-indigo-400 mb-3">
                            <div className='flex input-bordered rounded-none'>
                                <label className="label"> <span className="label-text ">Rating:</span></label>

                                <input type="text" {...register("rating", {
                                    required: "Rating is Required"
                                })}
                                    className="input input-bordered w-full max-w-xs rounded-none bg-white" />
                            </div>
                            {errors.rating && <p className='text-red-500 text-xs'>{errors.rating.message}</p>}
                        </div>



                        <div className="form-control w-full max-w-xs border p-2 border-indigo-400 mb-3">
                            <div className='flex input-bordered rounded-none'>
                                <label className="label"> <span className="label-text ">Book Name:</span></label>

                                <input type="text" {...register("totalPages", {
                                    required: "Page number is Required"
                                })}
                                    className="input input-bordered w-full max-w-xs rounded-none bg-white" />
                            </div>
                            {errors.totalPages && <p className='text-red-500 text-xs'>{errors.totalPages.message}</p>}
                        </div>



                    </div>

                    <div className='ml-0 md:ml-12'>
                        <div className="form-control w-full max-w-xs border p-2 border-indigo-400 mb-3">
                            <div className='flex justify-center items-center  max-w-xs'>
                                <label className="label"> <span className="label-text">Product Category:</span></label>
                                <select
                                    {...register('category', {
                                        required: "Category is Required"
                                    })}

                                    className="input input-bordered w-full max-w-xs rounded-none text-sm bg-white">
                                    <option disabled value="">
                                        select category
                                    </option>
                                    {

                                        Object.keys(categoryObject)?.map((category, index) => <option
                                            key={index}
                                            value={category}>
                                            {category}</option>)
                                    }
                                </select>
                            </div>
                            {errors.category && <p className='text-red-500 text-xs'>{errors.category.message}</p>}
                        </div>

                        <div className="form-control w-full max-w-xs border p-2 border-indigo-400 mb-3">
                            <div className='flex input-bordered rounded-none'>
                                <label className="label"> <span className="label-text ">Review:</span></label>

                                <input type="text" {...register("review", {
                                    required: false
                                })}
                                    className="input input-bordered w-full max-w-xs rounded-none bg-white" />
                            </div>
                        </div>
                        <input className='btn btn-info md:w-80 w-64 rounded-none mt-1' value="Add Book" type="submit" />
                    </div>
                </form>
            </div >
        </div >
    );
};

export default AddBook;