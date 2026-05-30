"use client";

import {AlertDialog, Button} from "@heroui/react";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";


export function DeleteRoom({room}) {
    const {_id, room: roomName} = room;
    const router = useRouter();

    const handleDelete = async () => {
        const res = await fetch(`http://localhost:5000/room/${_id}`, {
            method: 'DELETE',
            headers: {
                "content-type": "application/json",
            },
        });
        const data = await res.json();
        // res.redirect('/rooms')
        console.log(data);
        
        router.push('/rooms');
router.refresh();
    };

  return (
    <AlertDialog>
      <Button className={'rounded-none'} variant="danger">Delete</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-[400px]">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete room permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete the selected room. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button onClick={handleDelete} slot="close" variant="danger">
                Delete Room
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}