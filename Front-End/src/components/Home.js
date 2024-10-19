import React from 'react';
import home from '../home.png';
import cloth from '../cloth.png';
import gloves from '../gloves.jpg';
import shoes from '../shoes.png';
import New from './Items/New';

const Home = () => {
    return (
        <div>
            <div className="relative">
                <img
                    src={home}
                    alt="Banner"
                    className="w-full h-auto object-cover"
                />
            </div>
            <div className="py-12 mt-20 bg-gray-100">
                <h2 className="text-center text-3xl md:text-4xl font-bold mb-8">Shop By Category</h2>
                <div className="max-w-6xl mt-10 mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-2 rounded-sm shadow-lg text-center">
                        <img
                            src={shoes}
                            alt="Shoes"
                            className="w-full h-[220px] object-cover mb-4"
                        />
                        <h3 className="text-xl font-semibold mb-2">Shoes</h3>
                        <p className="text-gray-700">Explore our latest collection of shoes for all occasions.</p>
                    </div>
                    <div className="bg-white p-2 rounded-lg shadow-lg text-center">
                        <img
                            src={cloth}
                            alt="Cloth"
                            className="w-full h-[220px] object-cover mb-4"
                        />
                        <h3 className="text-xl font-semibold mb-2">Clothing</h3>
                        <p className="text-gray-700">Discover stylish and comfortable clothing options.</p>
                    </div>
                    <div className="bg-white p-2 rounded-lg shadow-lg text-center">
                        <img
                            src={gloves}
                            alt="Gloves"
                            className="w-full h-[220px] object-cover mb-4"
                        />
                        <h3 className="text-xl font-semibold mb-2">Gloves</h3>
                        <p className="text-gray-700">Find the perfect gloves for every activity.</p>
                    </div>
                </div>
            </div>

            <New />
        </div>
    );
};

export default Home;
