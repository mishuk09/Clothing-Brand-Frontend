import React from 'react';

const FAQs = () => {
    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-semibold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
                <div className="p-4 border rounded-md bg-gray-50">
                    <h3 className="font-semibold mb-2">What is your return policy?</h3>
                    <p>You can return any item within 30 days of purchase. Make sure the item is in its original condition.</p>
                </div>
                <div className="p-4 border rounded-md bg-gray-50">
                    <h3 className="font-semibold mb-2">How can I track my order?</h3>
                    <p>Once your order is shipped, you will receive a tracking number via email. Use this number on our tracking page to see your order status.</p>
                </div>
                <div className="p-4 border rounded-md bg-gray-50">
                    <h3 className="font-semibold mb-2">Do you offer international shipping?</h3>
                    <p>Yes, we ship to most countries worldwide. Shipping costs and times vary depending on the destination.</p>
                </div>
                <div className="p-4 border rounded-md bg-gray-50">
                    <h3 className="font-semibold mb-2">Can I cancel or change my order?</h3>
                    <p>You can cancel or change your order within 24 hours of placing it. Please contact our customer service team for assistance.</p>
                </div>
            </div>
        </div>
    );
};

export default FAQs;
