"use client";

import {AlertDialog, Button} from "@heroui/react";

export function BookingCancelAlert({booking, bookingId}) {

  const handleCancelBooking = async () => {

    const res = await fetch(`http://localhost:5000/bookings/${bookingId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json"
      }
    })
    const data = await res.json();
    window.location.reload();
  }

const isCancel = (booking) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const bookingDate = new Date(booking.date);

    return (
        (booking.status || "confirmed") === "confirmed" &&
        bookingDate >= today
    );
};

  return (
    <AlertDialog>
      {isCancel(booking) && (
                            <Button
                                variant="outline"
                                color="danger"
                                className={'bg-red-100 text-red-500 border-none'}
                            >
                                Cancel
                            </Button>
                        )}
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Cancel Booking permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete this booking and this action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>              
              <Button onClick={handleCancelBooking} slot="close" variant="danger">
                Cancel Booking
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}