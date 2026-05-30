"use client";

import { useMemo, useState } from "react";
import {
  Modal,
  Button,
  Input,
  
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";

export default function BookingModal({ roomName, hourlyRate }) {
    const {data: session} = authClient.useSession();
    const user = session?.user;
    
  const times = Array.from(
    { length: 13 },
    (_, i) => `${String(i + 8).padStart(2, "0")}:00`
  );

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("09:00");
  
  const availableEndTimes = useMemo(() => {
    const startIndex = times.indexOf(startTime);
    return times.slice(startIndex + 1);
  }, [startTime]);

  const duration = useMemo(() => {
    const start = Number(startTime.split(":")[0]);
    const end = Number(endTime.split(":")[0]);

    return end - start;
  }, [startTime, endTime]);

  const totalCost = duration * hourlyRate;

  const today = new Date().toISOString().split("T")[0];

  const handleBooking = async () => {
    
    const bookingData = {    
      date,
      startTime,
      endTime,
      duration,
      totalCost
      
    };
    // console.log(bookingData);

    const res = await fetch('http://localhost:5000/bookings', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(bookingData)
    })
    const data = await res.json();
    console.log(data);
  };

  return (
    <Modal>
      <Button
        variant="secondary"
        className="bg-cyan-500 text-white rounded-none"
      >
        Book Now
      </Button>

      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="max-w-lg">

            <Modal.Header>
              <Modal.Heading className="text-xl font-bold">
                Book {roomName}
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body className="space-y-5">

              <Input
                type="date"
                label="Booking Date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <div className="grid grid-cols-2 gap-4">

                <div>
                  <label className="text-sm font-medium">
                    Start Time
                  </label>

                  <select
                    className="w-full border rounded-lg p-2 mt-1"
                    value={startTime}
                    onChange={(e) => {
                      setStartTime(e.target.value);

                      const startIndex =
                        times.indexOf(e.target.value);

                      setEndTime(times[startIndex + 1]);
                    }}
                  >
                    {times.map((time) => (
                      <option key={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-sm font-medium">
                    End Time
                  </label>

                  <select
                    className="w-full border rounded-lg p-2 mt-1"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                  >
                    {availableEndTimes.map((time) => (
                      <option key={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

              </div>              

              <div className="rounded-xl bg-slate-100 p-4 space-y-2">

                <div className="flex justify-between">
                  <span>Duration</span>
                  <span>{duration} Hour(s)</span>
                </div>

                <div className="flex justify-between">
                  <span>Hourly Rate</span>
                  <span>${hourlyRate}</span>
                </div>

                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total Cost</span>
                  <span>${totalCost}</span>
                </div>

              </div>

            </Modal.Body>

            <Modal.Footer className="justify-end gap-3">

              <Button variant="outline">
                Cancel
              </Button>

              <Button
                color="primary"
                onClick={handleBooking}
              >
                Confirm Booking
              </Button>

            </Modal.Footer>

          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}