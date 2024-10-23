import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NewArrivals = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/posts')
            .then(response => {
                setPosts(response.data.slice(0, 12));
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });
    }, []);
    const items = [
        {
            id: 1,
            image: 'https://via.placeholder.com/150', // Replace with your image URL
            title: 'Item 1',
            colors: ['black', 'blue'], // Available colors
        },
        {
            id: 2,
            image: 'https://via.placeholder.com/150',
            title: 'Item 2',
            colors: ['black'], // Available colors
        },
        {
            id: 3,
            image: 'https://via.placeholder.com/150',
            title: 'Item 3',
            colors: ['blue', 'green'], // Available colors
        },
        {
            id: 4,
            image: 'https://via.placeholder.com/150',
            title: 'Item 4',
            colors: ['green'], // Available colors
        },
    ];

    // Function to render color indicators
    const renderColors = (colors) => (
        <div className="flex space-x-1 mt-1">
            {colors.map((color, index) => (
                <span
                    key={index}
                    className="w-4 h-4 rounded-full"
                    style={{
                        backgroundColor: color,
                        border: '1px solid gray',
                    }}
                />
            ))}
        </div>
    );

    return (
        <div className="grid container grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
            {/* {posts.map((item) => (
                <div key={item.id} className="relative border border-gray-300 rounded-lg shadow-lg overflow-hidden">
                    <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                    <span className="absolute top-2 left-2 bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded">Sale</span>
                    <button className="absolute top-2 right-2 p-2 text-gray-500 hover:text-red-500">
                        <FaHeart />
                    </button>
                    <div className="p-4">
                        <h3 className="text-lg font-semibold">
                            {item.colors.includes('black') ? (
                                <span className="text-black">{item.title}</span>
                            ) : (
                                <span className="text-blue-600">{item.title}</span>
                            )}
                        </h3>
                        <p className="text-sm text-gray-500">Australian Made</p>
                        {renderColors(item.colors)} 
                    </div>
                </div>
            ))} */}


            {posts.map(product => (
                <Link to={`/product/${product._id}`} key={product._id} className="bg-white rounded-sm shadow-md p-2  ">
                    <div className="overflow-hidden rounded-sm">
                        <img src={product.img} alt={product.title} className="w-full h-[300px] object-cover   transform hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h2 className="text-lg pt-4 font-semibold text-gray-900">
                        {product.title.toLowerCase().replace(/\b\w/g, c => c.toUpperCase()).substring(0, 40)}{product.title.length > 40 ? '...' : ''}
                    </h2>
                    <div className="flex justify-between items-center mt-2">
                        <div className='flex items-center'>
                            <span className="mr-4 text-lg font-semibold text-red-500">रू {product.newPrice}</span>
                            <span className="text-sm font-semibold text-gray-700 line-through">रू {product.oldPrice}</span>
                        </div>
                        <div>
                            <span className="text-green-500 font-bold">
                                {Math.round(((product.oldPrice - product.newPrice) / product.oldPrice) * 100)}% OFF
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default NewArrivals;
