"use client";

import {Envelope} from "@gravity-ui/icons";
import {Button, FieldError, Input, Label, Modal, Surface, TextArea, TextField} from "@heroui/react";
import Amenities from "./Amenities";

export function EditRoomDetails({selectedAmenities, handleAmenityChange}) {

       const onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const room = Object.fromEntries(formData.entries())
        room.amenities = selectedAmenities;
        console.log(room);

    //    const res = await fetch('http://localhost:5000/room', {
    //         method: 'POST',
    //         headers:{
    //             'content-type': 'application/json'
    //         },
    //         body: JSON.stringify(room)
    //     })
    //     const data = await res.json()
        
    };
  return (
    <Modal>
      <Button variant="outline">Edit</Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Envelope className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Contact Us</Modal.Heading>

                <form onSubmit={onSubmit} className="p-10 space-y-5 w-3xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Image URL - Removed preview */}
                        <div className="md:col-span-2">
                            <TextField name="imageUrl" isRequired>
                                <Label>Image URL</Label>
                                <Input
                                    type="url"
                                    placeholder="https://example.com/bali-paradise.jpg"
                                    className="rounded-2xl"
                                />
                                <FieldError />
                            </TextField>
                        </div>
                        <div className="md:col-span-2">
                            <TextField name="roomName" isRequired>
                                <Label>Room Name</Label>
                                <Input placeholder="Bali Paradise" className="rounded-2xl" />
                                <FieldError />
                            </TextField>
                        </div>
                        <div className="md:col-span-2">
                            <TextField name="description" isRequired>
                                <Label>Description</Label>
                                <TextArea
                                    placeholder="Describe the travel experience..."
                                    className="rounded-3xl"
                                />
                                <FieldError />
                            </TextField>
                        </div>

                        {/* Country */}
                        <TextField name="floor" isRequired>
                            <Label>Floor</Label>
                            <Input placeholder="2nd Floor" className="rounded-2xl" />
                            <FieldError />
                        </TextField>
                        <TextField name="seat" type="number" isRequired>
                            <Label>Seat capacity</Label>
                            <Input
                                type="number"
                                placeholder="2-4 people"
                                className="rounded-2xl"
                            />
                            <FieldError />
                        </TextField>
                        <TextField name="price" type="number" isRequired>
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
                    <Amenities 
                    selectedAmenities={selectedAmenities}
                    handleAmenityChange={handleAmenityChange}
                    />
                  
                    <Button
                        type="submit"
                        variant="outline"
                        className=" rounded-none w-3/4 bg-cyan-500 text-white">
                        Submit
                    </Button>

                </form>
              
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
              
              </Surface>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button slot="close">Send Message</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}