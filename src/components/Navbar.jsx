import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <nav className='flex justify-between items-center p-5 bg-white'>
            <div>
                <Image 
                src={"/assets/study_logo.png"}
                height= {150}
                width={150}
                alt='Image'/>
            </div>
            <ul>
                <li className='flex gap-4'>
                    <Link href={'/'}>Home</Link>
                    <Link href={'/all-rooms'}>All Rooms</Link>
                    <Link href={'/my-bookings'}>My Bookings</Link>
                    <Link href={'/add-room'}>Add Room</Link>
                    <Link href={'/profile'}>Profile</Link>
                </li>
            </ul>
            
            <ul className='flex gap-2'>                
                <li><Link href={'/login'}>Login</Link></li>
                <li><Link href={'/sign-up'}>Sign up</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;