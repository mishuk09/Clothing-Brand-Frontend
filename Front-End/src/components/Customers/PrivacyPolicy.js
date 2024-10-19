import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="container mx-auto px-4 py-10">
            <h2 className="text-3xl font-semibold mb-6">Privacy Policy</h2>
            <div className="space-y-6">
                <div className="bg-gray-50 p-6 border rounded-md">
                    <h3 className="font-semibold mb-2">Introduction</h3>
                    <p>We are committed to protecting your privacy. This policy explains how we collect, use, and share your personal information.</p>
                </div>
                <div className="bg-gray-50 p-6 border rounded-md">
                    <h3 className="font-semibold mb-2">Information Collection</h3>
                    <p>We collect information you provide directly to us, such as when you create an account, place an order, or subscribe to our newsletter.</p>
                </div>
                <div className="bg-gray-50 p-6 border rounded-md">
                    <h3 className="font-semibold mb-2">Information Use</h3>
                    <p>We use your information to process orders, provide customer support, and improve our services.</p>
                </div>
                <div className="bg-gray-50 p-6 border rounded-md">
                    <h3 className="font-semibold mb-2">Information Sharing</h3>
                    <p>We do not share your personal information with third parties, except as necessary to provide our services or as required by law.</p>
                </div>
                <div className="bg-gray-50 p-6 border rounded-md">
                    <h3 className="font-semibold mb-2">Your Rights</h3>
                    <p>You have the right to access, update, or delete your personal information. Contact us for assistance.</p>
                </div>
            </div>
        </div>
    );
}

export default PrivacyPolicy;
