import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import heart from '../img/heart (2).png'

const NewArrivals = () => {
    const [posts, setPosts] = useState([]);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/posts')
            .then(response => {
                setPosts(response.data.slice(0, 12));
                // setLoading(false);
            })
            .catch(error => {
                console.log(error);
                // setLoading(false);
            });
    }, []);
     
 
    return (

        < div className='new-arival'>
            <div className=" text-center items-center  pt-10 ">
                <h1 className="italic">New Arrivals</h1>
            </div>
            <div className="grid   container grid-cols-1 pt-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">


                {posts.map(product => (
                    <Link to={`/product/${product._id}`} key={product._id} className="bg-white rounded-sm shadow-md p-2  ">
                        <div className="overflow-hidden relative rounded-sm">
                            <img src={product.img} alt={product.title} className="w-full h-[300px] object-cover   transform hover:scale-110 transition-transform duration-300" />
                            <span className="absolute top-2 left-2 bg-gray-200 text-red-400 text-xs   px-2 py-1 rounded">Sale</span>
                            <button className="absolute top-2 right-2 p-2   hover:text-red-500">
                                <img className='w-4' src={heart} alt="" />
                            </button>
                        </div>

                        <div className="">
                            <div className="flex space-x-1 pt-2">
                                {product.color.map(color => (
                                    <button
                                        key={color}
                                        aria-label={`Select ${color}`}
                                        className='relative w-8 h-8 rounded-sm border-2 border-gray hover:border-[3px] hover:border-gray duration-75'
                                        style={{ backgroundColor: color.toLowerCase() }}
                                    >

                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-lg product-card__title text-start pt-3 font-semibold text-gray-900">
                                {product.title.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()).substring(0, 20)}{product.title.length > 20 ? '...' : ''}
                            </h2>
                        </div>
                        <div className="flex justify-between items-center  ">
                            <p className=" btn-2 bg-white text-black   ">
                                AUSTRALIAN MADE
                            </p>

                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default NewArrivals;
