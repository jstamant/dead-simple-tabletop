'use client'

import {Button} from "@nextui-org/button";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Divider} from "@nextui-org/divider";
import {Input} from "@nextui-org/input";

import {PressEvent} from '@react-types/shared'

import axios from 'axios'

export default function Login() {
    const handleCreateAccount = (e: PressEvent) => {
        console.log(e)
        console.log('creating user account clicked!')
        axios.post('http://localhost:3001/user', {username: "testadmin", password: "test"});
    }
    const handleLogin = (e: PressEvent) => {
        console.log(e)
        console.log('login button clicked!')
        axios.post('http://localhost:3001/login', {username: "testadmin", password: "test"});
    }
    return (
        <Card className="w-96">
            <CardHeader>Login</CardHeader>
            <Divider />
            <CardBody>This is a login box!</CardBody>
            <Input label="Email" size="sm" />
            <Input label="Password" size="sm" type="password" />
            <Divider />
            <CardFooter className="flex justify-center">
                <Button className="w-1/2" onPress={handleLogin}>Login</Button>
                <Button className="w-1/2" onPress={handleCreateAccount}>Create Account</Button>
            </CardFooter>
        </Card>
    )
}
