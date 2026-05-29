'use client'
import { authClient } from '@/lib/auth-client';
import { Avatar, Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {

    const {
        data: session,
        // isPending, //loading state
        // error, //error object
        // refetch //refetch the session
    } = authClient.useSession()

    const user = session?.user
    console.log(user);

    const handleSignOut = async () => {
        await authClient.signOut();
    }

    return (
        <nav className='flex justify-between items-center px-4 bg-white'>
            <div>
                <Image
                    src={"/assets/study_logo.png"}
                    height={130}
                    width={130}
                    alt='Image' />
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
                    {user ? <>
                        <li>
                            <Avatar>
                                <Avatar.Image referrerPolicy='no-referrer' alt="John Doe" src={user?.image} />
                                <Avatar.Fallback className='text-xl font-medium'>{user.name[0]}</Avatar.Fallback>
                            </Avatar>
                        </li>
                        <li>
                            <Button onClick={handleSignOut} className={"rounded-none"}>Logout</Button>
                        </li>
                    </> : <>
                        <li><Link href={'/login'}>Login</Link></li>
                        <li><Link href={'/signup'}>Sign up</Link></li>
                    </>}

                </ul>
            </div>
        </nav>
    );
};

export default Navbar;