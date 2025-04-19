import React from 'react';

const Footer2 = () => {
    return (
        <footer className="bg-gray-800 text-white py-4 text-center">
            <div className="max-w-screen-xl mx-auto">
                <p className="m-0 text-sm">© {new Date().getFullYear()} SSSC. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer2;
