import React from "react";
import Link from "next/link";


const NotFound = () => {
    return (
        <div className="h-[80vh] flex justify-center items-center flex-col">
            <h2 className="text-5xl font-bold text-red-500 mb-6">This page is not found.</h2>
            <Link href={'/'}>
            <button className="btn bg-blue-500 text-white px-3 py-1.5 rounded text-lg">Back to Home</button>
            </Link>
        </div>
    );
};

export default NotFound;