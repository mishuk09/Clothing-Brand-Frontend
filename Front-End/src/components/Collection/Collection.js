import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Collection = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [filterOpen, setFilterOpen] = useState(false);
    const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('wishlist')) || {});
    const [filters, setFilters] = useState({ color: '', priceRange: [0, 1000] });

    useEffect(() => {
        axios.get('http://localhost:5000/posts')
            .then(response => {
                setPosts(response.data);
                setFilteredPosts(response.data);
            })
            .catch(error => console.log(error));
    }, []);

    const toggleFilterPanel = () => {
        setFilterOpen(!filterOpen);
    };

    const handleWishlist = (productId) => {
        const updatedWishlist = { ...wishlist, [productId]: !wishlist[productId] };
        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    };

    const applyFilters = () => {
        const { color, priceRange } = filters;
        const filtered = posts.filter(product =>
            (!color || product.color.includes(color)) &&
            (product.price >= priceRange[0] && product.price <= priceRange[1])
        );
        setFilteredPosts(filtered);
    };

    const handleFilterChange = (type, value) => {
        setFilters(prev => ({ ...prev, [type]: value }));
    };

    useEffect(() => {
        applyFilters();
    }, [filters]);

    return (
        <div className="container collection pb-10">
            <div className="text-center pt-10">
                <p className="text-lg font-semibold text-start pl-4">Collections / Weekend Edit</p>
                <h1 className="text-3xl italic font-bold mt-2 text-start pl-4">Weekend Edit</h1>
                <div className="flex justify-start gap-8 mt-4 pl-4">
                    <button onClick={toggleFilterPanel} className="text-gray-500 hover:text-black">Filter</button>
                    <button className="text-gray-500 hover:text-black">Sort</button>
                    <button className="text-gray-500 hover:text-black">Alphabetically, A-Z</button>
                </div>
            </div>
            <div className="flex">
                {/* Filter Panel */}
                {filterOpen && (
                    <div className="w-64 bg-gray-100 p-4 shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Filter Options</h2>
                        <div className="mb-4">
                            <label className="block mb-2">Color</label>
                            <select
                                onChange={(e) => handleFilterChange('color', e.target.value)}
                                className="w-full p-2 border rounded"
                            >
                                <option value="">All</option>
                                <option value="red">Red</option>
                                <option value="blue">Blue</option>
                                <option value="green">Green</option>
                                {/* Add other colors as needed */}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Price Range</label>
                            <input
                                type="range"
                                min="0"
                                max="1000"
                                step="50"
                                value={filters.priceRange[1]}
                                onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                                className="w-full"
                            />
                            <p className="text-sm">Up to ${filters.priceRange[1]}</p>
                        </div>
                        <button
                            onClick={applyFilters}
                            className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-600"
                        >
                            Apply Filters
                        </button>
                    </div>
                )}

                {/* Products Grid */}
                <div className="container grid grid-cols-4 mt-6 mx-auto gap-6 px-4">
                    {filteredPosts.map(product => (
                        <div key={product._id} className="relative bg-white rounded-sm shadow-md">
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
                                <FontAwesomeIcon className={`w-4 ${wishlist[product._id] ? 'text-red-600' : 'text-gray-400'}`} icon={faHeart} />
                            </button>
                            <div className="ps-2">
                                <div className="flex space-x-1 pt-2">
                                    {product.color.map(color => (
                                        <button
                                            key={color}
                                            aria-label={`Select ${color}`}
                                            className="relative w-8 h-8 rounded-sm border-2 border-gray hover:border-[3px] hover:border-white duration-75"
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
        </div>
    );
};

export default Collection;
