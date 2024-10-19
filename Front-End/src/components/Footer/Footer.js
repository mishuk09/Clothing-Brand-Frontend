import React from 'react';

const Footer = () => {
    return (

        <div>

            <div id='footer' class=' footer-section   bottom-0 w-full'>
                <div class='bg-slate-50 h-auto   w-full  '>
                    <div class='custom-container footer-grid  pb-4 gap-3 w-[100%]'>
                        <div class='w-full h-full flex flex-col overflow-hidden'>
                            <p class="text-black pt-12 pb-3 text-[15px] font-bold">Nepal Mart Online Shopping</p>
                            <p class="text-justify pe-6 text-[14px]">Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. Porro eius doloremque doloribus quos, </p>
                            <p class="text-xl sm:text-2xl font-semibold mt-3 mb-2 number">+977 65764763</p>
                            <p class="text-justify pe-6 text-[14px]">Lorem ipsum dolor sit amet consectetur adipisicing
                                elit. </p>
                            <div class="flex gap-2 mt-3">
                                <p class="rounded-full border-3 flex items-center text-center justify-center w-10 h-10"><i
                                    class="fa-brands fa-facebook-f"></i></p>
                                <p class="rounded-full border-3 flex items-center text-center justify-center w-10 h-10"><i
                                    class="fa-brands fa-youtube"></i></p>
                                <p class="rounded-full border-3 flex items-center text-center justify-center w-10 h-10"><i
                                    class="fa-brands fa-twitter"></i></p>
                                <p class="rounded-full border-3 flex items-center text-center justify-center w-10 h-10"><i
                                    class="fa-brands fa-square-instagram"></i></p>
                                <p class="rounded-full border-3 flex items-center text-center justify-center w-10 h-10"><i
                                    class="fa-brands fa-square-whatsapp"></i></p>
                            </div>
                        </div>

                        <div class='w-full footer-service h-full leading-6 flex flex-col overflow-hidden'>
                            <p class="text-black cursor-pointer pt-4 md:pt-12 pb-3 text-[15px] font-bold">About us
                            </p>
                            <a href="/Tearms & Condition/privacy.html" class="text-[14px]   cursor-pointer pb-1">Privacy &
                                policy</a>
                            <a href="/Tearms & Condition/about.html" class="text-[14px] cursor-pointer pb-1">About us</a>
                            <a href="/Tearms & Condition/fourzero.html" class="text-[14px] cursor-pointer pb-1">404</a>
                            <a href="/Tearms & Condition/contact.html" class="text-[14px] cursor-pointer pb-1">Contact
                                us</a>
                            <a href="/Tearms & Condition/fags.html" class="text-[14px] cursor-pointer pb-1">FAQ's</a>
                            <a href="#" class="text-[14px] cursor-pointer pb-1">My Account</a>
                        </div>

                        <div class='w-full footer-service h-full leading-6 flex flex-col overflow-hidden'>
                            <p class="text-black cursor-pointer pt-4 md:pt-12 pb-3 text-[15px] font-bold">Shop By Outletshop
                            </p>
                            <a href="" class="text-[14px] cursor-pointer pb-1">Help & FAQs</a>
                            <a href="#" class="text-[14px] cursor-pointer pb-1">Order Tracking</a>
                            <a href="#" class="text-[14px] cursor-pointer pb-1">Shipping & Delivery</a>
                            <a href="#" class="text-[14px] cursor-pointer pb-1">Order History</a>
                            <a href="#" class="text-[14px] cursor-pointer pb-1">Advanced Search</a>
                            <a href="#" class="text-[14px] cursor-pointer pb-1">My Account</a>
                        </div>

                        <div class='grid   w-[100%]'>
                            <div class='w-full h-full flex flex-col overflow-hidden'>
                                <p
                                    class="text-black   duration-200 cursor-pointer pt-4 md:pt-12 pb-3 text-[17px] font-bold">
                                    Sign
                                    Up to Newsletter</p>
                                <div class="grid text-sm">
                                    <p class="text-[14px] cursor-pointer pb-6 text-justify">Get all the latest information
                                        on events, sales and offers. Sign up for the newsletter:</p>

                                    <div class=" lg:flex gap-1">

                                        <input type="text"
                                            class="border w-full rounded-full h-10 outline-none px-4 text-gray-6    00"
                                            placeholder="Email Address" />
                                        <button
                                            class="w-full subscribe-btn   h-10 px-4 mt-4 lg:mt-0 text-white font-bold rounded-full">
                                            SUBSCRIBE
                                        </button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="bg-slate-50 ">

                    <div
                        class="custom-container bg-slate-50 mb-6 md:mb-0 md:flex text-center pt-3 flex-row  justify-between items-center w-full h-20">
                        <div class="text-[14px] py-2">© Prime eCommerce. 2021. All Rights Reserved</div>
                        <div class="text-[14px] py-2">Web designed and IT partner Prime IT Sewa</div>

                        <div class="flex gap-3  items-center text-center justify-center">
                            <img class=" w-14" src="/images/footer/es.png" alt="" />
                            <img class=" w-14" src="/images/footer/im.png" alt="" />
                            <img class=" w-14" src="/images/footer/kh.png" alt="" />
                            <img class=" w-8" src="/images/footer/un.png" alt="" />
                            <img class=" w-14" src="/images/footer/visa.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Footer;