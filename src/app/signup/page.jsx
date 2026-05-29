"use client";
import { FcGoogle } from "react-icons/fc";
import { Card, Separator } from '@heroui/react';
import React from 'react';
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import { toast } from 'react-toastify';



const SignUpPage = () => {

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signUp.email({
            email: user.email,
            password: user.password,
            name: user.name,
            image: user.image
        })
        if (!error) {
            toast.success("Successfully registered!")
            redirect('/');
            
        }

        if (error) {
            toast.error("Email or password is incorrect", {
                position: "top-right",
                autoClose: 3000,
            });
        };
    }
    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google"
        })
    }
    return (
        <div className='max-w-7xl mx-auto'>
            <div className='text-center mb-4'>
                <h1 className='text-2xl font-bold'>Please Sign Up</h1>
                <p>Enjoy reading with Studynook</p>
            </div>
            <Card className='border rounded-md'>
                <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4 space-y-3 p-3">
                    <TextField
                        isRequired
                        name="name"
                        type="text"

                    >
                        <Label>Name</Label>
                        <Input placeholder="Enter your name" />
                        <FieldError />
                    </TextField>
                    <TextField
                        name="image"
                        type="url"

                    >
                        <Label>Image URL</Label>
                        <Input placeholder="Image url" />
                        <FieldError />
                    </TextField>
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label>Email</Label>
                        <Input placeholder="john@example.com" />
                        <FieldError />
                    </TextField>
                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
                            }
                            return null;
                        }}
                    >
                        <Label>Password</Label>
                        <Input placeholder="Enter your password" />
                        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                        <FieldError />
                    </TextField>
                    <div className="flex justify-center">
                        <Button type="submit" className={'w-full rounded-none bg-cyan-500'}>

                            Create account
                        </Button>
                        

                    </div>
                </Form>
                <div className='flex justify-center items-center gap-3'>
                    <Separator />
                    <div className='whitespace-nowrap'>Or</div>
                    <Separator />                    
                </div>
                <div>
                    <Button onClick={handleGoogleSignIn} variant="outline" className={"w-full rounded-none"}><FcGoogle /> Sign in with Google</Button>
                </div>


            </Card>
            
        </div>
    );
};

export default SignUpPage;