import { Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";


const RoomCard = ({ room }) => {
    const { _id, imageUrl, roomName, description, floor, seat, amenities, price } = room;
    return (
        <div className="shadow-sm p-2 space-y-2">
            <Image
                alt={roomName}
                src={imageUrl}
                height={300}
                width={350}
                className="w-full h-56 object-cover"
            />
            <h2 className="text-xl font-bold">{roomName}</h2>
            <p>Description: {description?.length > 100
                ? description.slice(0, 100) + "..."
                : description}</p>
            <div className="flex justify-between items-center">
                <p className="text-lg">{floor} floor</p>
                <p className="font-medium">{seat} people</p>
            </div>
            <p className="text-lg font-medium">Hourly rate: $ {price}/hr</p>
            <div className="flex items-center gap-2">Amenities:
                {
                    amenities.map((item) => (<div className="badge text-green-500 bg-green-100 font-bold px-2" key={item}>{item}

                    </div>))
                } <span className="text-green-500">+2 more</span>
            </div>
            <Link href={`/rooms/${_id}`}><Button variant="secondary" className="w-3/4 mt-2 bg-cyan-500 text-white">View Details</Button></Link>
        </div>
    );
};

export default RoomCard;