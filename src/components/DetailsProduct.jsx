import React from 'react'
import { useState, useEffect } from 'react';
import { BsCart } from 'react-icons/bs';
import { FaStar } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from '../App';
import { addToCart } from '../redux/slices/cart-slice';
import { AiFillStar } from 'react-icons/ai';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Toast } from './Toast';
import toast, { Toaster } from 'react-hot-toast';
import { comment } from 'postcss';

function DetailsProduct({ productID }) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    let navigate = useNavigate();
    const dispatch = useDispatch();
    const authUser = useSelector(state => state.auth.user);
    const [product, setProduct] = useState({});
    const [qty, setQty] = useState(1);
    const [src, setSrc] = useState("");

    const [zoom, setZoom] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    // const token = authUser.token;
    // const email = authUser.email;

    const getComments = () => {
        fetch(`${API_URL}/Comments?productId=${productID}`)
            .then((res) => res.json())
            .then((comments) => {
                setComments(comments);
            })
    }

    useEffect(() => {
        fetch(`${API_URL}/Products/${productID}`)
            .then((res) => res.json())
            .then((product) => {
                setProduct(product);
                setComments(product.comments);
                setZoom({
                    backgroundImage: `url(${product.pictureUrl})`,
                    backgroundPosition: '0% 0%'
                })
                setSrc(product.pictureUrl);
            })
        // getComments()
    }, [productID])

    const uploadData = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('productId', productID);
        formData.append('text', newComment);
        formData.append('buyerEmail', authUser.email);

        try {
            if (newComment !== "") {
                await axios.post(`${API_URL}/Comments`,
                    formData, {
                    headers: {
                        'Authorization': `Bearer ${authUser.token}`
                    },
                }).then(() => {
                    toast.success('Comment added successfully');
                    getComments();
                    setNewComment("");
                })
            } else {
                toast.error("comment is empty");
            }
        } catch (err) {
            console.log(err);
        }
    }

    const addRating = async () => {
        const formRating = new FormData();
        formRating.append('productId', productID);
        formRating.append('Value', rating);
        formRating.append('buyerEmail', authUser.email);
        console.log({
            productId: productID,
            Value: rating,

        })
        try {
            if (rating !== "") {
                await axios.post(`${API_URL}/Rating/${productID}`,
                    formRating, {
                    headers: {
                        'Authorization': `Bearer ${authUser.token}`
                    },
                }).then(() => {
                    toast.success('Rating added successfully');

                    // setRating(0);
                })
            } else {
                toast.error("Rating is empty");
            }
        } catch (err) {
            console.log(err);
        }
    }

    // make zoom for image whn hover
    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.target.getBoundingClientRect()
        const x = (e.pageX - left) / width * 100
        const y = (e.pageY - top) / height * 100
        setZoom({ backgroundImage: `url(${src})`, backgroundPosition: `${x}% ${y}%` })
    }


    const changeMainImg = (e) => {
        document.querySelector(".main_img img").src = e.target.src;
        setSrc(e.target.src)
    }
    const handleSignIn = () => {
        Swal.fire({
            title: "You don't have Access to add Comment, Please Sign In?",
            showDenyButton: true,
            confirmButtonText: 'Sign In',
            denyButtonText: `return`,
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/login");
            }
        })
    }
    return (
        <div className='product_details py-10'>
            <div className='container'>
                <Link onClick={() => navigate(-1)} className="text-white bg-main-color hover:bg-indigo-700 inline-block  font-medium rounded text-sm px-5 py-2.5">Back</Link>
                <div className='product-details flex justify-between flex-col md:flex-row pt-5'>
                    <div className='product-image w-full  md:w-1/2 py-5 flex gap-2 select-none rounded p-5'>
                        <div className='all_images w-2/12 flex flex-col gap-3'>
                            <div className="border p-1 rounded cursor-pointer ">
                                <img src={product.pictureUrl} alt={`image-${product.name}`} onClick={(e) => { changeMainImg(e) }}></img>
                            </div>
                            {
                                product.images && product.images.map((img, idx) => {
                                    return <div key={idx} className="border p-1 rounded cursor-pointer">
                                        <img src={img.name} alt={idx} onClick={(e) => { changeMainImg(e) }}></img>
                                    </div>
                                })
                            }
                        </div>
                        <div className='relative w-full overflow-hidden bg-gray-50'>
                            <figure className='main_img' onMouseMove={handleMouseMove} style={zoom} >
                                <img src={product.pictureUrl} className="w-full mb-10 h-full" alt={product.name} />
                            </figure>
                        </div>
                    </div>
                    <div className='product-data w-full md:w-1/2 p-5'>
                        <h2 className='text-3xl md:text-4xl'>{`${product.name}`}</h2>
                        <div className='flex items-center gap-1.5 mt-2 bg-gray-50 shadow-sm rounded py-1 px-3 w-max'>
                            <FaStar className=" text-yellow-400" />
                            <span>{product.rating}</span>
                        </div>
                        <div className='mt-6 flex flex-col'>
                            <b className='text-neutral-800'>Description</b>
                            <span className='text-neutral-600'>{product.description}</span>
                        </div>
                        <div className='mt-4 text-sm'>
                            <p><span className='text-neutral-700'>Availability: </span><span className='font-semibold'>{product.available ? `In Stock` : "Out of stock"}</span></p>
                            <p><span className='text-neutral-700'>Brand: </span> <span className='font-semibold'>{product.productBrand}</span></p>
                        </div>
                        <div className='mt-6 flex items-center'>
                            <span className='font-bold text-xl'>${product.price}</span>
                        </div>
                        <div className='flex gap-3 mt-6 w-full flex-wrap'>
                            <input type="number" value={qty} onChange={(e) => setQty(e.target.value)} min="1" className='p-2 border focus:outline-none text-neutral-600 rounded' />
                            <button onClick={() => dispatch(addToCart({ ...product, quantity: Number.parseInt(qty) }))} className='flex items-center gap-2 py-2 px-10 bg-main-color hover:bg-indigo-700 text-white rounded group'>
                                <BsCart className='group-hover:animate-bounce' />
                                <span> Add to cart</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* start rating component */}
                <div className="star-rating">
                    {[...Array(5)].map((star, index) => {
                        index += 1;
                        return (
                            <button
                                type="button"
                                key={index}
                                className={`bg-transparent border-none ${index <= (hover || rating) ? "text-yellow-600" : "text-black"}`}
                                onClick={() => setRating(index)}
                                onMouseEnter={() => setHover(index)}
                                onMouseLeave={() => setHover(rating)}
                            >
                                <span className="star text-4xl">&#9733;</span>
                            </button>
                        );
                    })}
                    <div>
                        <button type='submit' onClick={() => addRating()}
                            className="text-white bg-main-color focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                            Add Rating
                        </button>
                    </div>
                </div>



                <div className='mt-10 p-5'>
                    <div className=' py-6 px-3 mt-5'>
                        <h5 className='text-xl font-bold'>All comments</h5>
                        {
                            comments.length ?
                                comments.map(comment => {
                                    return (
                                        <div className='all_comments shadow-md bg-gray-50 mt-5 py-3 pt-0 flex flex-col gap-x-5 gap-y-2' key={comment.id}>
                                            <div className='username items-center flex gap-3 p-2 w-fit m-2 border-b border-b-main-color'>
                                                <span className='font-bold'>{comment.buyerEmail}</span>
                                                <span className='flex gap-2 p-1 items-center rounded'>4.7 <AiFillStar className='text-yellow-400' /></span>
                                            </div>
                                            <div className='ml-6 rounded p-2'>{comment.text}</div>
                                        </div>
                                    )
                                })
                                : <p>Don't have any comments</p>
                        }
                    </div>
                    {
                        authUser ? <form onSubmit={uploadData} className='add_comment mb-8'>
                            <h5 className='text-xl font-bold mb-4'>Add New Comment</h5>
                            <div className='flex gap-3 justify-between'>
                                <div className='userName bg-main-color text-white rounded-full w-10 h-10 flex justify-center items-center' title={authUser.email}>{authUser.displayName.slice(0, 2).toUpperCase()}</div>
                                <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)} id="description" rows="6" className="focus:outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-main-color focus:border-main-color " placeholder="Write a Comment..."></textarea>
                            </div>
                            <div className='flex justify-end mt-3'>
                                <button type="submit" className="text-white bg-main-color focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                    Add Comment
                                </button>
                            </div>
                        </form> :
                            <div className='add_comment mb-8'>
                                <h5 className='text-xl font-bold mb-4'>Add New Comment</h5>
                                <div className='flex gap-3 justify-between'>
                                    <div className='userName bg-main-color text-white rounded-full w-10 h-10 flex justify-center items-center' title="Anonymous">A</div>
                                    <textarea disabled id="description" rows="6" className="focus:outline-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-main-color focus:border-main-color " placeholder="Please sign in to add comment..."></textarea>
                                </div>
                                <div className='flex justify-end mt-3'>
                                    <button type="submit" onClick={() => handleSignIn()} className="text-white bg-main-color focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                                        Add Comment
                                    </button>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default DetailsProduct