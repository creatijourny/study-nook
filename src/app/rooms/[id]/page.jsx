import { DeleteRoom } from '@/components/DeleteRoom';
import { EditModal } from '@/components/EditModal';

import { Button } from '@heroui/react';
import Image from 'next/image';



const RoomDetailsPage = async ({ params }) => {
    const { id } = await params;

    const res = await fetch(`http://localhost:5000/room/${id}`)

    if (!res.ok) {
  const errorText = await res.text();
  console.log(errorText);

  throw new Error("API request failed");
}

    const room = await res.json();

    const { imageUrl, roomName, description, floor, seat, amenities, price } = room;
    // const selectedAmenities = amenities.map(item => item.toString());

    return (
        <div className='flex flex-col md:flex-row items-center gap-5 shadow-sm max-w-7xl mx-auto'>          
            
           
            <div className="p-4">
                <Image
                    alt={roomName}
                    src={imageUrl}
                    height={500}
                    width={700}
                    className="w-full object-cover"
                />
            </div>
            <div className='w-[70vh] p-5 space-y-3'>
                <h2 className="text-xl font-bold">Name: {roomName}</h2>
                <p className='line-clamp-2'>Description: {description}</p>

                <p className="text-lg">Floor: {floor} floor</p>
                <p className="font-medium">Seat capacity: {seat} people</p>

                <p className="text-lg font-medium">Hourly rate: $ {price}/hr</p>
                <div className="flex items-center gap-2">Amenities: {JSON.stringify(amenities, null, 2)}                    

                    <span className="text-green-500">+2 more</span>
                </div>
                <div className='flex justify-start items-center gap-2'>
                    <Button variant="secondary" className="mt-2  bg-cyan-500 text-white rounded-none">Book Now</Button>

                   <EditModal room={room}/>
                   <DeleteRoom room={room}/>
                    
                </div>
            </div>
        </div>
    );
};

export default RoomDetailsPage;