import React from 'react';
import { Link } from 'react-router-dom';

const Offsection = () => {
    return (
        <Link to='/outlet-store' className='offer-section mt-10 mb-10 flex justify-center items-center h-[200px]'>
            <div className='text-center text-[50px] text-white uppercase'>
                up to 70% off
            </div>
        </Link>

    );
};

export default Offsection;