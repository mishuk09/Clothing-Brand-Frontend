import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../CartContext';

const ProductPage = ({ toggleCart }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get(`http://localhost:5000/posts/${id}`)
      .then(response => {
        const productData = response.data;
        setProduct(productData);
        setSelectedColor(productData.color[0]); // Default to first color
        setSelectedSize(productData.size[0]); // Default to first size
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching product data:', error);
        setLoading(false);
      });
  }, [id]);

  const handleQuantityChange = (increment) => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity + increment));
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      img: product.img,
      color: selectedColor,
      size: selectedSize,
      price: product.newPrice,
      quantity
    });
    toggleCart(); // Open cart when item is added
  };

  const stripHtmlTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };

  return (
    <div className="container mt-10 mb-20 mx-auto p-4">
      {
        loading ? (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:space-x-8">
            <div className="md:w-1/2">
              <img
                className="w-full h-auto rounded-lg shadow-md"
                src={product.img}
                alt={product.title}
              />
            </div>
            <div className="md:w-1/2 mt-4 md:mt-0">
              <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
              <div className='flex items-center'>
                <p className="text-xl mr-4 font-semibold mb-1 text-red-500">रू {product.newPrice}</p>
                <p className="text-sm font-semibold mb-1 text-gray-700 line-through">रू {product.oldPrice}</p>
              </div>
              <p className="text-green-500 font-bold mb-4">
                {Math.round(((product.oldPrice - product.newPrice) / product.oldPrice) * 100)}% OFF
              </p>
              <p className="text-gray-600 mb-4">Shipping is calculated at checkout</p>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-semibold text-gray-700">Color</label>
                <div className="flex space-x-2">
                  {product.color.map(color => (
                    <button
                      key={color}
                      aria-label={`Select ${color}`}
                      className={`relative w-10 h-10 rounded-full border ${selectedColor === color ? 'ring-2 ring-blue-500' : ''}`}
                      style={{ backgroundColor: color.toLowerCase() }}
                      onClick={() => setSelectedColor(color)}
                    >
                      {selectedColor === color && (
                        <span className="absolute inset-0 flex items-center justify-center text-white font-bold">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="block mb-2 text-sm font-semibold text-gray-700">Size</label>
                <div className="flex space-x-2">
                  {product.size.map(size => (
                    <button
                      key={size}
                      aria-label={`Select size ${size}`}
                      className={`w-10 h-10 flex items-center justify-center text-base rounded-full border ${selectedSize === size ? 'bg-blue-500 text-white' : 'bg-white text-gray-700'}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4 flex items-center">
                <label className="block text-sm font-semibold text-gray-700 mr-4">Quantity</label>
                <button
                  aria-label="Decrease quantity"
                  className="px-4 py-2 bg-gray-200 rounded-l-lg"
                  onClick={() => handleQuantityChange(-1)}
                >-</button>
                <input
                  type="number"
                  value={quantity}
                  readOnly
                  className="w-16 p-2 border-t border-b text-center"
                />
                <button
                  aria-label="Increase quantity"
                  className="px-4 py-2 bg-gray-200 rounded-r-lg"
                  onClick={() => handleQuantityChange(1)}
                >+</button>
              </div>

              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>

              <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Description</h2>
                <p className="text-gray-700 mb-2">{stripHtmlTags(product.description)}</p>
                {/* Add more product details if needed */}
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default ProductPage;
