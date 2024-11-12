import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import heart from '../img/heart (2).png';
import dash from '../img/dashboard.png';
import logout from '../img/logout.png';
import pack from '../img/package (3).png';
import pin from '../img/pin.png';
import user from '../img/user.png';

const Dashboard = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("tab1");
    const [editFormVisible, setEditFormVisible] = useState(null);
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        gender: '',
        email: '',
        mobile: '',
        address: '',
        newPassword: '',
        confirmPassword: '',
    });

    // Function to toggle the edit form visibility
    const toggleEditForm = (formType) => {
        // If the formType is already visible, close it; otherwise, open the corresponding form
        if (editFormVisible === formType) {
            setEditFormVisible(null); // Close the form
        } else {
            setEditFormVisible(formType); // Open the selected form
        }
    };


    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/signin');
                return;
            }

            try {
                const response = await axios.get('http://localhost:5000/dashboard', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProfile(response.data.profile);
            } catch (error) {
                console.error('Error fetching data:', error.response ? error.response.data : error.message);
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    navigate('/signin');
                }
            }
        };

        fetchData();
    }, [navigate]);


    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.id]: e.target.value,
        });
    };


    const handleSave = async () => {
        const token = localStorage.getItem('token');
        try {
            await axios.put(
                'http://localhost:5000/update-profile',
                {
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    gender: profile.gender,
                    email: profile.email,
                    mobile: profile.mobile,
                    address: profile.address,
                    newPassword: profile.newPassword === profile.confirmPassword ? profile.newPassword : null,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert('Profile updated successfully!');
        } catch (error) {
            console.error('Error updating profile:', error.response ? error.response.data : error.message);
        }
    };


    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('name');
        localStorage.removeItem('address');
        localStorage.removeItem('cartItems');

        navigate('/signin');
    };

    return (
        <div className="min-h-screen flex flex-col   px-4">

            <main className="flex-grow container mx-auto px-4  ">
                <div className="shop-head border-b h-[120px] sm:h-[120px] flex items-center text-center justify-center relative">
                    <div className="flex relative shop-h-text custom-container flex-col h-auto w-full text-center justify-center">
                        <p className="text-[20px] sm:text-[26px] lg:text-[30px] font-bold">My Account</p>
                        <span className="text-center text-[12px] cart-access lg:text-[14px]">
                            <span>Home /</span> Account
                        </span>
                    </div>
                    <div className="overlay1"></div>
                </div>

                <div className="tabs custom-container  profile-head">

                    <div className="dashbord-parent md:px-1 lg:px-3 bg-white">
                        <div className="tab-links h-[200px] grid rounded">
                            <div
                                className={`flex items-center text-center cursor-pointer p-2 rounded ${activeTab === "tab1" ? "bg-gray-200 text-black" : "bg-white"
                                    }`}
                                onClick={() => handleTabClick("tab1")}
                            >
                                <div className='flex items-center'><img className='w-4 h-4 me-2' src={user} alt="" /> Profile</div>
                            </div>
                            <div
                                className={`flex items-center text-center cursor-pointer p-2 rounded ${activeTab === "tab2" ? "bg-gray-200 text-black" : "bg-white"
                                    }`}
                                onClick={() => handleTabClick("tab2")}
                            >
                                <div className='flex items-center'><img className='w-4 h-4 me-2' src={pack} alt="" /> Orders</div>
                            </div>
                            <div
                                className={`flex items-center text-center cursor-pointer p-2 rounded ${activeTab === "tab3" ? "bg-gray-200 text-black" : "bg-white"
                                    }`}
                                onClick={() => handleTabClick("tab3")}
                            >
                                <div className='flex items-center'><img className='w-4 h-4 me-2' src={pin} alt="" />Your Address</div>
                            </div>
                            <div
                                className={`flex items-center text-center cursor-pointer p-2 rounded ${activeTab === "tab4" ? "bg-gray-200 text-black" : "bg-white"
                                    }`}
                                onClick={() => handleTabClick("tab4")}
                            >
                                <div className='flex items-center'><img className='w-4 h-4 me-2' src={heart} alt="" />Your Wishlist</div>
                            </div>
                            <div
                                className="flex items-center text-center cursor-pointer p-2 rounded   text-black"
                                onClick={handleLogout}
                            >
                                <div className='flex items-center'><img className='w-4 h-4 me-2' src={logout} alt="" />Log Out</div>
                            </div>
                        </div>
                    </div>

                    <div className="tab-content-2 bg-white mb-[100px] md:border-l">
                        {activeTab === "tab1" && (
                            <div className="tab">
                                <h2 className="text-gray-600">Welcome <span className="font-semibold">{profile.lastName}</span></h2>

                                <p className="text-[18px] font-medium mt-7">Personal Information</p>
                                <div className="mb-8">
                                    <div className="sm:flex gap-6 personal-inout text-[14px] mt-3">
                                        <input
                                            className="border outline-none px-2"
                                            placeholder="First Name"
                                            type="text"
                                            id="firstName"
                                            value={profile.firstName}
                                            onChange={handleChange}
                                        />
                                        <input
                                            className="border outline-none mt-4 sm:mt-0 px-2"
                                            placeholder="Last Name"
                                            type="text"
                                            id="lastName"
                                            value={profile.lastName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <p className="text-[18px] font-medium">Your Gender</p>
                                <div className="flex gap-4 mt-3">
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Male"
                                            checked={profile.gender === 'Male'}
                                            onChange={() => setProfile({ ...profile, gender: 'Male' })}
                                        /> Male
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="Female"
                                            checked={profile.gender === 'Female'}
                                            onChange={() => setProfile({ ...profile, gender: 'Female' })}
                                        /> Female
                                    </label>
                                </div>
                                <div className="w-1/2  gap-6 personal-inout text-[14px] mt-3">
                                    <p className="text-[18px] font-medium mt-8">Email Address</p>
                                    <input
                                        className="border outline-none px-2 mt-3"
                                        placeholder="Email"
                                        type="email"
                                        id="email"
                                        value={profile.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-1/2  gap-6 personal-inout text-[14px] mt-3">

                                    <p className="text-[18px] font-medium mt-8">Mobile Number</p>
                                    <input
                                        className="border outline-none px-2 mt-3"
                                        placeholder="Mobile Number"
                                        type="text"
                                        id="mobile"
                                        value={profile.mobile}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="w-1/2  gap-6 personal-inout text-[14px] mt-3">

                                    <p className="text-[18px] font-medium mt-8">Your Address</p>
                                    <input
                                        className="border outline-none px-2 mt-3"
                                        placeholder="Address"
                                        type="text"
                                        id="address"
                                        value={profile.address}
                                        onChange={handleChange}
                                    />
                                </div>

                                <p className="text-[18px] font-medium mt-8">Reset Password</p>
                                <div className="sm:flex gap-6 personal-inout text-[14px] mt-3">
                                    <input
                                        className="border outline-none px-2 mt-3"
                                        placeholder="New Password"
                                        type="password"
                                        id="newPassword"
                                        value={profile.newPassword}
                                        onChange={handleChange}
                                    />
                                    <input
                                        className="border outline-none px-2 mt-3"
                                        placeholder="Confirm New Password"
                                        type="password"
                                        id="confirmPassword"
                                        value={profile.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button onClick={handleSave} className="mt-6 rounded-md edit-btn-2">Save</button>
                            </div>
                        )}
                        {activeTab === "tab2" && (
                            <div className="tab">


                                <p class="sm:text-[24px] text-[20px] font-medium mt-0">Order's history</p>


                                <div class=" flex flex-col gap-6 mt-6 ">

                                    <div class="w-full  h-10 px-4  hidden  cart-headline-3 bg-slate-50">
                                        <div>PRODUCT</div>
                                        <div class="hidden  items-center text-center justify-center  sm:flex">QUANTITY</div>
                                        <div class="hidden  items-center text-center justify-center  sm:flex">TOTAL</div>
                                        <div class="hidden  items-center text-center justify-end sm:flex">EDIT</div>

                                    </div>



                                    <div class="rounded bg-white">

                                        <div
                                            class="flex  flex-col sm:items-center  sm:flex-row order-cart-d border-t border-r border-l rounded-t   justify-between">
                                            <div class="flex gap-14 ">
                                                <div class="">
                                                    <div class="flex lg:flex-col    ">
                                                        <p class="text-[12px] order-t text-gray-600">Order Placed</p>
                                                        <p class="text-[12px] ms-2 order-child lg:ms-0  text font-semibold"> Nov 2,
                                                            2022
                                                        </p>
                                                    </div>
                                                    <div class=" flex lg:hidden  ">
                                                        <p class="text-[12px] order-t text-gray-600 ">Ship to</p>
                                                        <p class="text-[12px] order-child   ms-2 lg:ms-0  font-semibold">Irakli
                                                            Lolashvili</p>
                                                    </div>
                                                    <div class="flex lg:hidden">
                                                        <p class="text-[14px] order-t text-gray-600 ">Total</p>
                                                        <p class="text-[14px] order-child ms-2 lg:ms-0  font-semibold">Rs 157.76</p>
                                                    </div>
                                                </div>

                                                <div class="hidden lg:block">
                                                    <p class="text-[12px] order-t text-gray-600 ">Total</p>
                                                    <p class="text-[12px] order-child  ms-2 lg:ms-0  font-semibold">Rs 157.76</p>
                                                </div>
                                                <div class="hidden lg:block">
                                                    <p class="text-[12px] order-t text-gray-600 ">Ship to</p>
                                                    <p class="text-[12px]  order-child ms-2 lg:ms-0  font-semibold">Irakli
                                                        Lolashvili
                                                    </p>
                                                </div>
                                            </div>
                                            <div class=" items-center mt-2 sm:mt-0  text-center justify-center ">
                                                <p
                                                    class="text-[14px] order-tt items-center flex text-center sm:justify-end font-semibold">
                                                    Order # 633-6030190-2564
                                                </p>
                                                <div class="flex items-center justify-start sm:justify-end text-gray-600 text-[12px]">
                                                    <a href="/track/track.html" class="underline     ">
                                                        View order details
                                                    </a>
                                                </div>
                                            </div>

                                        </div>

                                        <div id="item1" class="cart-body-child relative order-cart-d  rounded-b border  text-[14px]  ">

                                            <div
                                                class="    w-[100px] md:w-[120px]    h-[100px] md:h-full overflow-hidden   flex  md:items-center   ">
                                                <img class="w-[100px] h-[100px]  hover:scale-105 duration-300    "
                                                    src="/images/home/top/EE.png" alt="" />
                                            </div>
                                            <div class="  cart-body-child5">
                                                <div
                                                    class=" w-[100%]  relative     flex lg:items-center lg: lg:justify-center mt-2 lg:mt-0  lg:pt-0">

                                                    <div class="   ps-1 pe-2 pt-0 md:pt-0    duration-150   w-full">

                                                        <a href="/products/products.html" class="text-[16px] font-medium cart-p-title">
                                                            Apple iPhone 12 Pro Max 128GB-Unlocked
                                                        </a>

                                                        <div class="lg:flex hidden   items-center price-color   lg:mt-0">
                                                            <p class="text-[14px] font-semibold  me-2 cursor-auto  ">Color: Brown
                                                            </p>

                                                        </div>

                                                    </div>


                                                </div>
                                                <div
                                                    class=" h-auto lg:h-full px-1 text-[14px]  flex lg:items-center lg:text-center lg:justify-center">
                                                    Qty: 1
                                                </div>
                                                <div
                                                    class=" h-auto lg:h-full px-1 text-[14px] order-price-c  flex lg:items-center lg:text-center lg:justify-center">
                                                    Rs 157.76
                                                </div>
                                                <div
                                                    class="  pb-2 sm:pb-0 h-auto lg:h-full   flex    lg:items-center lg:text-center lg:justify-center">
                                                    <div class="flex  items-center price-color     sm:mt-0">
                                                        <p id="phone-total"
                                                            class=" text-[14px] ps-1   phone-total font-semibold   cursor-auto  ">
                                                            Shiping</p>

                                                    </div>
                                                </div>
                                                <div
                                                    class=" h-auto lg:h-full mb-2 lg:mb-0 px-1 lg:px-2 text-[14px]    flex lg:items-center lg:text-center lg:justify-end">
                                                    Deliver on 10 Nov 2022
                                                </div>
                                            </div>





                                        </div>
                                    </div>

                                    <div class="rounded bg-white">

                                        <div
                                            class="flex  flex-col sm:items-center  sm:flex-row order-cart-d border-t border-r border-l rounded-t   justify-between">
                                            <div class="flex gap-14 ">
                                                <div class="">
                                                    <div class="flex lg:flex-col    ">
                                                        <p class="text-[12px] order-t text-gray-600">Order Placed</p>
                                                        <p class="text-[12px] ms-2 order-child lg:ms-0  text font-semibold"> Nov 2,
                                                            2022
                                                        </p>
                                                    </div>
                                                    <div class=" flex lg:hidden  ">
                                                        <p class="text-[12px] order-t text-gray-600 ">Ship to</p>
                                                        <p class="text-[12px] order-child   ms-2 lg:ms-0  font-semibold">Irakli
                                                            Lolashvili</p>
                                                    </div>
                                                    <div class="flex lg:hidden">
                                                        <p class="text-[14px] order-t text-gray-600 ">Total</p>
                                                        <p class="text-[14px] order-child ms-2 lg:ms-0  font-semibold">Rs 157.76</p>
                                                    </div>
                                                </div>

                                                <div class="hidden lg:block">
                                                    <p class="text-[12px] order-t text-gray-600 ">Total</p>
                                                    <p class="text-[12px] order-child  ms-2 lg:ms-0  font-semibold">Rs 157.76</p>
                                                </div>
                                                <div class="hidden lg:block">
                                                    <p class="text-[12px] order-t text-gray-600 ">Ship to</p>
                                                    <p class="text-[12px]  order-child ms-2 lg:ms-0  font-semibold">Irakli
                                                        Lolashvili
                                                    </p>
                                                </div>
                                            </div>
                                            <div class=" items-center mt-2 sm:mt-0  text-center justify-center ">
                                                <p
                                                    class="text-[14px] order-tt items-center flex text-center sm:justify-end font-semibold">
                                                    Order # 633-6030190-2564
                                                </p>
                                                <div class="flex items-center justify-start sm:justify-end text-gray-600 text-[12px]">
                                                    <a href="/track/track.html" class="underline     ">
                                                        View order details
                                                    </a>
                                                </div>
                                            </div>

                                        </div>

                                        <div id="item1" class="cart-body-child relative order-cart-d  rounded-b border  text-[14px]  ">

                                            <div
                                                class="    w-[100px] md:w-[120px]    h-[100px] md:h-full overflow-hidden   flex  md:items-center   ">
                                                <img class="w-[100px] h-[100px]  hover:scale-105 duration-300    "
                                                    src="/images/home/top/EE.png" alt="" />
                                            </div>
                                            <div class="  cart-body-child5">
                                                <div
                                                    class=" w-[100%]  relative     flex lg:items-center lg: lg:justify-center mt-2 lg:mt-0  lg:pt-0">

                                                    <div class="   ps-1 pe-2 pt-0 md:pt-0    duration-150   w-full">

                                                        <a href="/products/products.html" class="text-[16px] font-medium cart-p-title">
                                                            Apple iPhone 12 Pro Max 128GB-Unlocked
                                                        </a>

                                                        <div class="lg:flex hidden   items-center price-color   lg:mt-0">
                                                            <p class="text-[14px] font-semibold  me-2 cursor-auto  ">Color: Brown
                                                            </p>

                                                        </div>

                                                    </div>


                                                </div>
                                                <div
                                                    class=" h-auto lg:h-full px-1 text-[14px]  flex lg:items-center lg:text-center lg:justify-center">
                                                    Qty: 1
                                                </div>
                                                <div
                                                    class=" h-auto lg:h-full px-1 text-[14px] order-price-c  flex lg:items-center lg:text-center lg:justify-center">
                                                    Rs 157.76
                                                </div>
                                                <div
                                                    class="  pb-2 sm:pb-0 h-auto lg:h-full   flex    lg:items-center lg:text-center lg:justify-center">
                                                    <div class="flex  items-center price-color     sm:mt-0">
                                                        <p id="phone-total"
                                                            class=" text-[14px] ps-1   phone-total font-semibold   cursor-auto  ">
                                                            Delivered</p>

                                                    </div>
                                                </div>
                                                <div
                                                    class=" h-auto lg:h-full mb-2 lg:mb-0 px-1 lg:px-2 text-[14px]    flex lg:items-center lg:text-center lg:justify-end">
                                                    Delivered 10 Nov 2022
                                                </div>
                                            </div>




                                        </div>
                                    </div>




                                </div>

                            </div>
                        )}
                        {activeTab === "tab3" && (
                            <div className="tab">
                                <p className="sm:text-[24px] text-[20px] font-medium">Your Address (1)</p>

                                <div className="address-div mt-6 md:flex md:gap-3">
                                    {/* Default Address Card */}
                                    <div className="w-full h-[full] border rounded-md">
                                        <div className="w-[100%] md:w-[100%] relative h-[270px] md:h-[320px] lg:h-[270px] border rounded">
                                            <div className="w-full h-12 bg-slate-100 flex items-center px-6">
                                                Default addresses
                                            </div>
                                            <div className="address-details px-6 pt-4 pb-4">
                                                <p className="pt-1 font-semibold">Hasan Mahmud</p>
                                                <p className="pt-1">batlil54@gmail.com</p>
                                                <p className="pt-1">Atlas, Vomra, UNITED KINGDOM.</p>
                                                <p className="pt-1">Address 2: 123 Main St</p>
                                                <p className="pt-1">Phone: +766 657637643</p>
                                            </div>
                                            <div className="flex editbtn w-full gap-3 px-6">
                                                <div
                                                    className="editbtn1 w-full flex items-center text-center justify-center bg-slate-100 border rounded-full h-10 cursor-pointer"
                                                    onClick={() => toggleEditForm("default")}
                                                >
                                                    EDIT
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Shipping Address Card */}
                                    <div className="w-full mt-4 md:mt-0 h-[full] border rounded-md">
                                        <div className="w-[100%] md:w-[100%] h-[270px] md:h-[320px] relative lg:h-[270px] border rounded">
                                            <div className="w-full h-12 bg-slate-100 flex items-center px-6">
                                                Shipping addresses
                                            </div>
                                            <div className="shipping-address-details px-6 pt-4 pb-4">
                                                <p className="pt-1 font-semibold">Hasan Mahmud</p>
                                                <p className="pt-1">ankur54@gmail.com</p>
                                                <p className="pt-1">Atlas, Vomra, UNITED KINGDOM.</p>
                                                <p className="pt-1">Address 2: 456 Elm St</p>
                                                <p className="pt-1">Phone: +766 657637643</p>
                                            </div>
                                            <div className="flex editbtn-one w-full gap-3 px-6">
                                                <div
                                                    className="editbtn-two w-full flex items-center text-center justify-center bg-slate-100 border rounded-full h-10 cursor-pointer"
                                                    onClick={() => toggleEditForm("shipping")}
                                                >
                                                    EDIT
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Edit Form for Default Address */}
                                {editFormVisible === "default" && (
                                    <div className="edit-form w-full mt-6">
                                        <p>Default Address</p>
                                        <form id="editAddressForm">
                                            <input
                                                className="w-full h-10 px-2 text-[14px] outline-none  border rounded mt-2"
                                                type="text"
                                                name="name"
                                                placeholder="Name"
                                            />
                                            <input
                                                className="w-full h-10 px-2 text-[14px] outline-none border rounded mt-2"
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                            />
                                            <input
                                                className="w-full h-10 px-2 text-[14px] outline-none border rounded mt-2"
                                                type="text"
                                                name="address"
                                                placeholder="Address"
                                            />
                                            <input
                                                className="w-full h-10 px-2 text-[14px] outline-none border rounded mt-2"
                                                type="text"
                                                name="address2"
                                                placeholder="Address 2"
                                            />
                                            <input
                                                className="w-full h-10 px-2 text-[14px] outline-none border rounded mt-2"
                                                type="text"
                                                name="phone"
                                                placeholder="Phone"
                                            />
                                            <button className="rounded-full mt-4" type="submit">
                                                Update
                                            </button>
                                        </form>
                                    </div>
                                )}

                                {/* Edit Form for Shipping Address */}
                                {editFormVisible === "shipping" && (
                                    <div className="edit-shipping-form w-full mt-6">
                                        <p>Shiping Address</p>
                                        <form id="editShippingAddressForm">
                                            <input
                                                className="w-full h-10 px-2 text-[14px] outline-none  border rounded mt-2"
                                                type="text"
                                                name="name"
                                                placeholder="Name"
                                            />
                                            <input
                                                className="w-full h-10 px-2 text-[14px] outline-none border rounded mt-2"
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                            />
                                            <input
                                                className="w-full h-10 px-2 text-[14px] outline-none border rounded mt-2"
                                                type="text"
                                                name="address"
                                                placeholder="Address"
                                            />
                                            <input
                                                className="w-full h-10 px-2 text-[14px] outline-none border rounded mt-2"
                                                type="text"
                                                name="address2"
                                                placeholder="Address 2"
                                            />
                                            <input
                                                className="w-full h-10 px-2 text-[14px] outline-none border rounded mt-2"
                                                type="text"
                                                name="phone"
                                                placeholder="Phone"
                                            />
                                            <button className="rounded-full mt-4" type="submit">
                                                Update
                                            </button>
                                        </form>
                                    </div>
                                )}
                            </div>

                        )}
                        {activeTab === "tab4" && (
                            <div className="tab">
                                <p>Your Wishlist content goes here</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
