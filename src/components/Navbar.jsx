import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <nav className='flex justify-between items-center px-4 bg-white'>
            <div>
                <Image 
                src={"/assets/study_logo.png"}
                height= {130}
                width={130}
                alt='Image'/>
            </div>
            <div>
                <ul>
                <li className='flex gap-2 md:gap-4'>
                    <Link href={'/'}>Home</Link>
                    <Link href={'/rooms'}>Rooms</Link>
                    <Link href={'/add-room'}>Add Room</Link>
                    <Link href={'/my-listings'}>My Listings</Link>
                    <Link href={'/my-bookings'}>My Bookings</Link>
                    
                    <Link href={'/profile'}>Profile</Link>
                </li>
            </ul>
            </div>
            
            <div>
                <ul className='flex gap-2'>                
                <li><Link href={'/login'}>Login</Link></li>
                <li><Link href={'/sign-up'}>Sign up</Link></li>
            </ul>
            </div>
        </nav>
    );
};

export default Navbar;