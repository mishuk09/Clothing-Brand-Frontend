import React from 'react';
import { Link } from 'react-router-dom';
import ShopourBasic from '../Home/ShopourBasics';
import ShopByCat from './ShopByCat';

const ShopbySize = () => {
    const sizes = {
        XS: { label: "XS", link: "/shop/xs" },
        S: { label: "S", link: "/shop/s" },
        M: { label: "M", link: "/shop/m" },
        L: { label: "L", link: "/shop/l" },
        XL: { label: "XL", link: "/shop/xl" },
        XXL: { label: "XXL", link: "/shop/xxl" },
        "3XL": { label: "3XL", link: "/shop/3xl" },
        "ALL": { label: "ALL", link: "/shop/all" }
    };

    return (
        <div>
            <div className="text-center items-center pt-10">
                <h1 className="text-3xl uppercase shop-by-size">SHOP BY SIZE</h1>
            </div>

            <div className="grid mt-14 mb-10 container grid-cols-4 gap-4">
                {Object.keys(sizes).map(size => (
                    <Link
                        key={size}
                        to={sizes[size].link} // Use the link from the sizes object
                        className="flex items-center justify-center p-2 text-4xl shop-btn rounded  transition duration-200"
                    >
                        {sizes[size].label} {/* Display the size label */}
                    </Link>
                ))}
            </div>

        </div>
    );
};

export default ShopbySize;
