import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import mainlogo from './logo.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMagnifyingGlass, faUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Cart from './Cart'; // Import the Cart component
import { useCart } from './CartContext'; // Import the useCart hook
import people from './people.png';
import cart from './shopping.png';
import search from './search.png';
import SearchTab from './SearchTab';

const Navbar = ({ toggleCart, isCartOpen }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { cartItems } = useCart(); // Access cart items from the context
    const [showSearch, setShowSearch] = useState(false);


    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
    const toggleSearch = () => setShowSearch(!showSearch);

    return (
        <div className=' '>
            <div className="border-b shadow-md">
                <div className="container mx-auto flex justify-between items-center py-2">
                    <div className="navbar-logo">
                        <Link to='/'>
                            <img className='w-[110px]' src={mainlogo} alt="Logo" />
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

                        <ul class="nav-links">


                            <li class="relative group pb-1">
                                <a href="#" class="desktop-item">NEW ARRIVAL</a>
                                <label for="showMega" class="mobile-item">Mega Menu</label>


                            </li>

                            <li className=' '>
                                <a href="#" class="desktop-item">MEN</a>
                                <label for="showMega" class="mobile-item">Mega Menu</label>
                                <div class="mega-box">
                                    <div class="content  ">
                                        <div class="row">
                                            <img src="https://fadzrinmadu.github.io/hosted-assets/responsive-mega-menu-and-dropdown-menu-using-only-html-and-css/img.jpg" alt="" />
                                        </div>
                                        <div class="row">
                                            <header>Design Services</header>
                                            <ul class="mega-links">
                                                <li><a href="#">Graphics</a></li>
                                                <li><a href="#">Vectors</a></li>
                                                <li><a href="#">Business cards</a></li>
                                                <li><a href="#">Custom logo</a></li>
                                            </ul>
                                        </div>
                                        <div class="row">
                                            <header>Email Services</header>
                                            <ul class="mega-links">
                                                <li><a href="#">Personal Email</a></li>
                                                <li><a href="#">Business Email</a></li>
                                                <li><a href="#">Mobile Email</a></li>
                                                <li><a href="#">Web Marketing</a></li>
                                            </ul>
                                        </div>
                                        <div class="row">
                                            <header>Security services</header>
                                            <ul class="mega-links">
                                                <li><a href="#">Site Seal</a></li>
                                                <li><a href="#">VPS Hosting</a></li>
                                                <li><a href="#">Privacy Seal</a></li>
                                                <li><a href="#">Website design</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <span class="absolute bottom-0 left-0 w-0 h-[1px] bg-gray-500 transition-all duration-500 ease-out group-hover:w-full"></span>

                            </li>

                            <li>
                                <a href="#" class="desktop-item">WOMEN</a>
                                <label for="showMega" class="mobile-item">Mega Menu</label>
                                <div class="mega-box">
                                    <div class="content">
                                        <div class="row">
                                            <img src="https://fadzrinmadu.github.io/hosted-assets/responsive-mega-menu-and-dropdown-menu-using-only-html-and-css/img.jpg" alt="" />
                                        </div>
                                        <div class="row">
                                            <header>Design Services</header>
                                            <ul class="mega-links">
                                                <li><a href="#">Graphics</a></li>
                                                <li><a href="#">Vectors</a></li>
                                                <li><a href="#">Business cards</a></li>
                                                <li><a href="#">Custom logo</a></li>
                                            </ul>
                                        </div>
                                        <div class="row">
                                            <header>Email Services</header>
                                            <ul class="mega-links">
                                                <li><a href="#">Personal Email</a></li>
                                                <li><a href="#">Business Email</a></li>
                                                <li><a href="#">Mobile Email</a></li>
                                                <li><a href="#">Web Marketing</a></li>
                                            </ul>
                                        </div>
                                        <div class="row">
                                            <header>Security services</header>
                                            <ul class="mega-links">
                                                <li><a href="#">Site Seal</a></li>
                                                <li><a href="#">VPS Hosting</a></li>
                                                <li><a href="#">Privacy Seal</a></li>
                                                <li><a href="#">Website design</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </li>



                        </ul>
                    </div>
                    <div className="hidden lg:flex lg:items-center lg:space-x-4 md:justify-center">
                        <div className="flex gap-6">
                            <div><img className='w-6' onClick={toggleSearch} src={search} alt="" /></div>
                            {showSearch && <SearchTab closeSearch={toggleSearch} />}
                            <div onClick={toggleCart} className="cursor-pointer relative">
                                <img className='w-6' src={cart} alt="" />
                                {/* Display the number of items in the cart */}
                                {cartItems.length > 0 && (
                                    <span className="absolute w-4 bg-gray-600 top-0 right-0 text-center text-xs font-semibold text-white rounded-full px-1">
                                        {cartItems.length}
                                    </span>

                                )}
                            </div>
                            <div>
                                <Link to={isAuthenticated ? '/dashboard' : '/signin'}>
                                    <img className='w-6' src={people} alt="" />
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
