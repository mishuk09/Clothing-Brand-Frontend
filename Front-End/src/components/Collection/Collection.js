import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Collection = () => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [filterOpen, setFilterOpen] = useState(false);
    const [wishlist, setWishlist] = useState(JSON.parse(localStorage.getItem('wishlist')) || {});
    const [filters, setFilters] = useState({
        color: [],
        priceRange: [0, 1000],
        type: [],
        length: [],
        size: [],
        stock: [],
        brand: []
    });

    // Fetch posts on mount
    useEffect(() => {
        axios.get('https://clothing-brand-backend.vercel.app/posts')
            .then(response => {
                setPosts(response.data);
                setFilteredPosts(response.data); // Initial set to show all products
            })
            .catch(error => console.log(error));
    }, []);

    // Apply filters whenever filters change
    useEffect(() => {
        applyFilters();
    }, [filters]);

    const toggleFilterPanel = () => {
        setFilterOpen(!filterOpen);
    };

    const handleWishlist = (productId) => {
        const updatedWishlist = { ...wishlist, [productId]: !wishlist[productId] };
        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    };

    const applyFilters = () => {
        const { color, priceRange, type, length, size, stock, brand } = filters;

        // Filter products based on selected criteria
        const filtered = posts.filter(product => {
            return (
                (!color.length || color.includes(product.color)) &&
                (product.price >= priceRange[0] && product.price <= priceRange[1]) &&
                (!type.length || type.includes(product.type)) &&
                (!length.length || length.includes(product.length)) &&
                (!size.length || size.includes(product.size)) &&
                (!stock.length || stock.includes(product.stock > 0 ? 'in' : 'out')) &&
                (!brand.length || brand.includes(product.brand))
            );
        });

        setFilteredPosts(filtered); // Update the filtered posts
    };

    const handleCheckboxChange = (type, value) => {
        setFilters(prev => {
            const newValues = prev[type].includes(value)
                ? prev[type].filter(item => item !== value)
                : [...prev[type], value];
            return { ...prev, [type]: newValues };
        });
    };

    const handlePriceChange = (value) => {
        setFilters(prev => ({ ...prev, priceRange: [0, parseInt(value)] }));
    };

    return (
        <div className="container collection pb-10">
            <div className="text-center pt-10">
                <p className="text-lg font-semibold text-start pl-4">Collections / Weekend Edit</p>
                <h1 className="text-3xl italic font-bold mt-2 text-start pl-4">Weekend Edit</h1>
                <div className="flex justify-start gap-8 mt-4 pl-4">
                    <button onClick={toggleFilterPanel} className="text-gray-500 hover:text-black">Filter</button>
                </div>
            </div>
            <div className="flex">
                {filterOpen && (
                    <div className="w-64 bg-gray-100 p-4 shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Filter Options</h2>

                        {/* Color Filter */}
                        <div className="mb-4">
                            <label className="block mb-2">Color</label>
                            {['black', 'blue', 'red'].map(color => (
                                <label key={color} className="block">
                                    <input
                                        type="checkbox"
                                        checked={filters.color.includes(color)}
                                        onChange={() => handleCheckboxChange('color', color)}
                                    />
                                    {color.charAt(0).toUpperCase() + color.slice(1)}
                                </label>
                            ))}
                        </div>

                        {/* Price Range Filter */}
                        <div className="mb-4">
                            <label className="block mb-2">Price Range</label>
                            <input
                                type="range"
                                min="0"
                                max="1000"
                                step="50"
                                value={filters.priceRange[1]}
                                onChange={(e) => handlePriceChange(e.target.value)}
                                className="w-full"
                            />
                            <p className="text-sm">Up to ${filters.priceRange[1]}</p>
                        </div>

                        {/* Type Filter */}
                        <div className="mb-4">
                            <label className="block mb-2">Type</label>
                            {['blouse', 'jumper'].map(type => (
                                <label key={type} className="block">
                                    <input
                                        type="checkbox"
                                        checked={filters.type.includes(type)}
                                        onChange={() => handleCheckboxChange('type', type)}
                                    />
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </label>
                            ))}
                        </div>
                        {/* Additional filters can be added similarly */}
                    </div>
                )}

                {/* Products Grid */}
                <div className="container grid grid-cols-4 mt-6 mx-auto gap-6 px-4">
                    {filteredPosts.length > 0 ? (
                        filteredPosts.map(product => (
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
                                        {product.title}
                                    </h2>
                                    <div className="flex space-x-2 py-3">
                                        <span className="text-md font-semibold">{`৳${product.price}`}</span>
                                        {product.compare_at && <span className="text-gray-500 text-sm line-through">{`৳${product.compare_at}`}</span>}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center col-span-4">No products found with the selected filters.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Collection;
