import React from 'react';
import home from '../img/home/home.webp';
import New from '../Items/New';
import Newarrival from './Newarrival';

const Home = () => {
    return (
        <div className=''>
            <div className="relative flex items-center justify-center text-center">
                <img
                    src={home}
                    alt="Banner"
                    className="w-full h-auto object-cover"
                />
                {/* Black overlay */}
                <div className="absolute inset-0 bg-black opacity-40"></div>

                {/* Text content */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white p-4 max-w-[600px] w-full">
                        <h1 className="  home-title font-lato">THE LIGHTEST FABRIC YOU WILL EVER WEAR</h1>
                        <button className=" btn bg-white text-black   ">
                            SHOP NOW
                        </button>
                    </div>
                </div>
            </div>



            <div className=" text-center items-center mt-10 ">
                <h1 className="italic">New Arrivals</h1>
                <Newarrival />
            </div>

            <New />
        </div>
    );
};

export default Home;
