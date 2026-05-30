import { BookingCancelAlert } from "@/components/BookingCancelAlert";
import { auth } from "@/lib/auth";
import { Button } from "@heroui/react";
import { headers } from "next/headers";
import Image from "next/image";


const MyBookingPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })
    const user = session?.user
    // console.log(user);

    const res = await fetch(`http://localhost:5000/bookings/${user?.id}`)

    const myBookings = await res.json();
    console.log(myBookings);

//     const isCancel = (booking) => {
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const bookingDate = new Date(booking.date);

//     return (
//         (booking.status || "confirmed") === "confirmed" &&
//         bookingDate >= today
//     );
// };

    return (
        <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold">My Bookings</h2>

            <div className="shadow-sm space-y-3">
                {
                    myBookings.map(booking => <div className="flex gap-5 items-center border p-5" key={booking._id}>
                        <Image
                            alt={booking.roomName}
                            src={booking.imageUrl}
                            height={200}
                            width={240}
                        />
                        <div className="space-y-3">
                            <div className="flex gap-3">
                                <h3 className="text-xl font-bold">{booking.roomName}</h3>
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-medium ${(booking.status || "confirmed") === "confirmed"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                        }`}
                                >
                                    {booking.status || "confirmed"}
                                </span>
                            </div>
                            <p>Date: {booking.date}</p>
                            <p>Start time: {booking.startTime}</p>
                            <p>End time: {booking.endTime}</p>
                            <p className="font-bold">Total cost: ${booking.totalCost}</p>
                            <p>Booking Id: {booking._id}</p>
                        </div>

                        <BookingCancelAlert 
                        booking={booking}
                        bookingId={booking._id} />

                        
                    </div>)
                }

            </div>

        </div>


    );
};

export default MyBookingPage;