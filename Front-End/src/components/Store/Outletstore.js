import React from 'react';
import ShopbySize from './ShopbySize';
import ShopourBasic from '../Home/ShopourBasics';
import ShopByCat from './ShopByCat';

const Outletstore = () => {
    return (
        <div>
            <div className='outlet-section    mb-10  flex flex-col justify-center items-center h-[400px]'>
                <div className='text-center text-[60px] text-white uppercase'>
                    up to 70% off
                </div>
                <div>
                    <button className='h-10 w-full shop-sell-outlet mt-6 px-4 bg-gray-300  rounded-sm'>SHOP THE SELL</button>
                </div>
            </div>

            <div>
                <ShopbySize />
            </div>
            <div>
                <ShopourBasic />
            </div>
            <div>
                <ShopByCat />
            </div>
        </div>
    );
};

export default Outletstore;