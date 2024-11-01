import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import heart from '../img/heart (2).png';

const NewArrivals = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/posts')
            .then(response => {
                setPosts(response.data.slice(0, 12));
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 4
        },
        desktop: {
            breakpoint: { max: 1024, min: 768 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 768, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    return (
        <div className='new-arival pb-6'>
            <div className="text-center items-center pt-10">
                <h1 className="italic">New Arrivals</h1>
            </div>
            <Carousel
                responsive={responsive}
                infinite={false}
                autoPlay={false}
                itemClass="px-2" // Adds horizontal padding between items
                containerClass="container mt-6 mx-auto px-4" // Ensures the carousel is centered and has side padding
            >
                {posts.map(product => (
                    <Link to={`/product/${product._id}`} key={product._id} className="bg-white rounded-sm shadow-md  ">
                        <div className="overflow-hidden relative rounded-sm">
                            <img src={product.img} alt={product.title} className="w-full h-[350px] object-cover transform hover:scale-110 transition-transform duration-300" />
                            <span className="absolute top-2 left-2 bg-gray-200 text-red-400 text-xs px-2 py-1 rounded">Sale</span>
                            <button className="absolute top-2 right-2 p-2 hover:text-red-500">
                                <img className='w-4' src={heart} alt="" />
                            </button>
                        </div>
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
                        <div className="flex justify-between items-center">
                            <p className="btn-2 text-black">AUSTRALIAN MADE</p>
                        </div>
                    </Link>
                ))}
            </Carousel>
        </div>
    );
};

export default NewArrivals;
