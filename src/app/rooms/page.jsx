import RoomCard from "@/components/RoomCard";


const AllRoomsPage = async () => {
    const res = await fetch('http://localhost:5000/room')
    const rooms = await res.json();

    console.log(rooms);
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-5">All Rooms</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">            
            {
                rooms.map(room => <RoomCard key={room._id} room={room}/>)
            }
            </div>
        </div>
    );
};

export default AllRoomsPage;