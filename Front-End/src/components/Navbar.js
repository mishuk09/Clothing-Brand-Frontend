import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import mainlogo from './logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass, faUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Cart from './Cart'; // Import the Cart component

const Navbar = ({ toggleCart, isCartOpen }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div>
            <div className="border-b shadow-md">
                <div className="container mx-auto flex justify-between items-center py-4">
                    <div className="navbar-logo">
                        <Link to='/'>
                            <img className='w-[120px]' src={mainlogo} alt="Logo" />
                        </Link>
                    </div>
                    <div className="flex items-center lg:hidden">
                        <div className="navbar-icons flex gap-6">
                            <div><FontAwesomeIcon size='xl' icon={faMagnifyingGlass} /></div>
                            <div onClick={toggleCart} className="cursor-pointer">
                                <FontAwesomeIcon size='xl' icon={faCartShopping} />
                            </div>
                            <div>
                                <Link to={isAuthenticated ? '/dashboard' : '/signin'}>
                                    <FontAwesomeIcon size='xl' icon={faUser} />
                                </Link>
                            </div>
                        </div>
                        <button className="ml-4" onClick={toggleMobileMenu}>
                            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} size="xl" />
                        </button>
                    </div>
                    <div className="hidden text-gray-500 lg:flex lg:items-center lg:space-x-4 md:justify-center">
                        <ul className="flex space-x-10 me-10">
                            <li className='relative group'>
                                <Link to='/new' className="focus:outline-none">NEW</Link>
                                <ul className="absolute hidden group-hover:block bg-white shadow-lg transition-all duration-300 ease-in-out mt-2">
                                    <li><Link className="block px-4 py-2 hover:bg-gray-100" to='/new/shoes'>Shoes</Link></li>
                                    <li><Link className="block px-4 py-2 hover:bg-gray-100" to='/new/clothes'>Clothes</Link></li>
                                </ul>
                            </li>
                            <li className='relative group'>
                                <Link to='/shoes' className="focus:outline-none">SHOES</Link>
                                <ul className="absolute hidden group-hover:block bg-white shadow-lg transition-all duration-300 ease-in-out mt-2">
                                    <li><Link className="block px-4 py-2 hover:bg-gray-100" to='/shoes/sneakers'>Sneakers</Link></li>
                                    <li><Link className="block px-4 py-2 hover:bg-gray-100" to='/shoes/boots'>Boots</Link></li>
                                </ul>
                            </li>
                            <li><Link to='/cloth'>CLOTHS</Link></li>
                            <li><Link to='/gloves'>GLOVES</Link></li>
                            <li><Link to='/kitchen'>KITCHEN</Link></li>
                        </ul>
                    </div>
                    <div className="hidden lg:flex lg:items-center lg:space-x-4 md:justify-center">
                        <div className="flex gap-6">
                            <div><FontAwesomeIcon size='xl' icon={faMagnifyingGlass} /></div>
                            <div onClick={toggleCart} className="cursor-pointer">
                                <FontAwesomeIcon size='xl' icon={faCartShopping} />
                            </div>
                            <div>
                                <Link to={isAuthenticated ? '/dashboard' : '/signin'}>
                                    <FontAwesomeIcon size='xl' icon={faUser} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex flex-col items-center justify-center lg:hidden">
                    <button className="absolute top-4 right-4 text-white" onClick={toggleMobileMenu}>
                        <FontAwesomeIcon icon={faTimes} size="2x" />
                    </button>
                    <ul className="flex flex-col items-center space-y-6">
                        <li className='text-white text-xl font-semibold'><Link to='/new' onClick={toggleMobileMenu}>New</Link></li>
                        <li className='text-white text-xl font-semibold'><Link to='/shoes' onClick={toggleMobileMenu}>Shoes</Link></li>
                        <li className='text-white text-xl font-semibold'><Link to='/cloth' onClick={toggleMobileMenu}>Clothes</Link></li>
                        <li className='text-white text-xl font-semibold'><Link to='/gloves' onClick={toggleMobileMenu}>Gloves</Link></li>
                        <li className='text-white text-xl font-semibold'><Link to='/kitchen' onClick={toggleMobileMenu}>Kitchen</Link></li>
                    </ul>
                </div>
            )}
            <Cart isOpen={isCartOpen} toggleCart={toggleCart} /> {/* Add the Cart component */}
        </div>
    );
};

export default Navbar;
