"use client";


import { Button, FieldError, Input, Label, Modal, Surface, TextArea, TextField } from "@heroui/react";
import Amenities from "./Amenities";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";



export function EditModal({ room }) {

    const { data: session } = authClient.useSession()    
        const user = session?.user

    const { _id, imageUrl, roomName, description, floor, seat, amenities, price } = room;

    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const room = Object.fromEntries(formData.entries())
        room.amenities = selectedAmenities;
        console.log(room);

        const res = await fetch(`http://localhost:5000/room/${_id}`, {
                method: 'PATCH',
                headers:{
                    'content-type': 'application/json'
                },
                body: JSON.stringify(room)
            })
            const data = await res.json()
            console.log(data);

    };

    const [selectedAmenities, setSelectedAmenities] = useState([]);

    const handleAmenityChange = (amenity, checked) => {
        if (checked) {
            setSelectedAmenities((prev) => [...prev, amenity]);
        } else {
            setSelectedAmenities((prev) =>
                prev.filter((item) => item !== amenity)
            );
        }

           
    };

    return (
        <Modal>
            <div>
                {user ? <Button variant='outline' className={'rounded-none px-3 py-2 bg-blue-500 text-white'}>Edit</Button> : ""}
            </div>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-2xl overflow-x-hidden">
                        <Modal.CloseTrigger />
                        <Modal.Header>

                            <Modal.Heading className="text-center mt-6 py-2 text-xl font-bold">Edit Study Room</Modal.Heading>

                        </Modal.Header>
                        <Modal.Body className="p-4">
                            <Surface variant="default">
                                <form onSubmit={onSubmit} className="p-2 space-y-5 w-full">
                                    <div className="space-y-3">
                                        {/* Image URL - Removed preview */}
                                        <div>
                                            <TextField name="imageUrl" defaultValue={imageUrl} isRequired>
                                                <Label>Image URL</Label>
                                                <Input
                                                    type="url"
                                                    placeholder="https://example.com/bali-paradise.jpg"
                                                    className="rounded-2xl"
                                                />
                                                <FieldError />
                                            </TextField>
                                        </div>
                                        <div>
                                            <TextField name="roomName" defaultValue={roomName} isRequired>
                                                <Label>Room Name</Label>
                                                <Input placeholder="Enter room name" className="rounded-2xl" />
                                                <FieldError />
                                            </TextField>
                                        </div>
                                        <div>
                                            <TextField name="description" defaultValue={description} isRequired>
                                                <Label>Description</Label>
                                                <TextArea
                                                    placeholder="Describe the travel experience..."
                                                    className="rounded-3xl"
                                                />
                                                <FieldError />
                                            </TextField>
                                        </div>


                                        <TextField name="floor" defaultValue={floor} isRequired>
                                            <Label>Floor</Label>
                                            <Input placeholder="2nd Floor" className="rounded-2xl" />
                                            <FieldError />
                                        </TextField>
                                        <TextField name="seat" type="number" defaultValue={seat} isRequired>
                                            <Label>Seat capacity</Label>
                                            <Input
                                                type="number"
                                                placeholder="2-4 people"
                                                className="rounded-2xl"
                                            />
                                            <FieldError />
                                        </TextField>


                                        <TextField name="price" type="number" defaultValue={price} isRequired>
                                            <Label>Hourly rate (USD)</Label>
                                            <Input
                                                type="number"
                                                placeholder="$ 5"
                                                className="rounded-2xl"
                                            />
                                            <FieldError />
                                        </TextField>

                                    </div>
                                    {/* Amenities - Select Component */}
                                    <Amenities defaultValue={amenities}
                                        selectedAmenities={selectedAmenities}
                                        handleAmenityChange={handleAmenityChange}

                                    />

                                    <Modal.Footer className="flex justify-end pt-4">

                                        <Button
                                            type="submit"
                                            className="bg-green-600 hover:bg-green-700 text-black px-6 py-2 rounded-full font-medium"
                                        >
                                            Save Changes
                                        </Button>
                                    </Modal.Footer>

                                </form>
                            </Surface>
                        </Modal.Body>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}