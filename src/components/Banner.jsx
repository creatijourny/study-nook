import Link from 'next/link';
import React from 'react';

const Banner = () => {
    return (
        <div>
                 <div className="bg-[url('/assets/cozy-library.jpg')] h-[60vh] w-full bg-cover bg-no-repeat bg-center flex items-center rounded shadow-2xl my-4">
                 {/* className="bg-[url('https://i.ibb.co.com/BHqGKDxQ/hero-image.png')] h-[60vh] w-full bg-cover bg-no-repeat bg-center flex items-center rounded shadow-2xl my-4" */}
      {/* bg-[url('/assets/banner.png')] */}
      {/* Overlay */}
      <div className="w-full h-full rounded-lg bg-black/50 flex items-center">
        <div className="max-w-7xl mx-auto px-6 text-white">
          <h1 className="text-4xl text-center md:text-6xl font-bold mb-6 max-w-2xl">
            Book a room,<br />Find your <span className='text-orange-500'>Reading</span> Pleasure
          </h1>

          <div className="flex justify-center mt-8">
            <Link href='/all-books'>             
              <button className="text-white text-3xl border border-purple-400 font-semibold bg-transparent px-8 py-1.5 rounded-full cursor-pointer">Explore Rooms</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
    
        </div>
    );
};

export default Banner;