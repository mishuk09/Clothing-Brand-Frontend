import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


const Collection = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);



    const [wishlist, setWishlist] = useState(
        JSON.parse(localStorage.getItem('wishlist')) || {}
    );

    const handleWishlist = (productId) => {
        const updatedWishlist = { ...wishlist, [productId]: !wishlist[productId] };
        setWishlist(updatedWishlist);

        // Update localStorage with the new wishlist state
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    };

    useEffect(() => {
        // Sync state with localStorage on component mount
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist'));
        if (savedWishlist) {
            setWishlist(savedWishlist);
        }
    }, []);

    return (
        <div className='collection pb-10'>
            <div className="text-center items-center pt-10">
                <h1 className="italic">New Arrivals</h1>
            </div>
            <div
                className= 'container grid grid-cols-4 mt-6 mx-auto gap-6 px-4'
            >
                {posts.map(product => (
                    <div key={product._id} className="relative  bg-white rounded-sm shadow-md">
                        <Link to={`/product/${product._id}`}>
                            <div className="overflow-hidden rounded-sm">
                                <img src={product.img} alt={product.title} className="w-full h-[350px] object-cover transform hover:scale-110 transition-transform duration-300" />
                                <span className="absolute top-2 left-2 bg-gray-200 text-red-400 text-xs px-2 py-1 rounded">Sale</span>
                            </div>
                        </Link>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleWishlist(product._id);
                            }}
                            className="absolute top-2 right-2 p-2"
                        >


                            <FontAwesomeIcon className={`w-4   ${wishlist[product._id] ? 'text-red-600' : 'text-gray-400'}`} icon={faHeart} />
                        </button>
                        <div className='ps-2'>

                            <div className="flex space-x-1 pt-2">
                                {product.color.map(color => (
                                    <button
                                        key={color}
                                        aria-label={`Select ${color}`}
                                        className='relative w-8 h-8 rounded-sm border-2 border-gray hover:border-[3px] hover:border-white duration-75'
                                        style={{ backgroundColor: color.toLowerCase() }}
                                    />
                                ))}
                            </div>
                            <h2 className="text-lg product-card__title text-start pt-3 font-semibold text-gray-900">
                                {product.title.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()).substring(0, 20)}{product.title.length > 20 ? '...' : ''}
                            </h2>
                            <div className="flex mb-6 justify-between items-center">
                                <p className="btn-2 text-black">AUSTRALIAN MADE</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Collection;
