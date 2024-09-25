'use client'
import {useState} from 'react'

import {Button} from "@nextui-org/button";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Divider} from "@nextui-org/divider";
import {Input} from "@nextui-org/input";

import {PressEvent} from '@react-types/shared'

import axios from 'axios'

// TODO this can be moved to a util/react.tsx library, and the generic can be changed from string to S??
// TODO add documentation
// Generic utility for updating state in a component's onChange attribute
const setField = (setState: React.Dispatch<React.SetStateAction<string>>) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
        setState(event.target.value);
    };
}

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleCreateAccount = (e: PressEvent) => {
        console.log(e)
        console.log('creating user account clicked!')
        axios.post('http://localhost:3001/user', {username: email, password: password});
    }
    const handleLogin = (e: PressEvent) => {
        console.log(e)
        console.log('login button clicked!')
        axios.post('http://localhost:3001/login', {username: email, password: password});
    }
    return (
        <Card className="w-96">
            <CardHeader>Login</CardHeader>
            <Divider />
            <CardBody>This is a login box!</CardBody>
            <Input label="Email" onChange={setField(setEmail)} size="sm" />
            <Input label="Password" onChange={setField(setPassword)} size="sm" type="password" />
            <Divider />
            <CardFooter className="flex justify-center">
                <Button className="w-1/2" onPress={handleLogin}>Login</Button>
                <Button className="w-1/2" onPress={handleCreateAccount}>Create Account</Button>
            </CardFooter>
        </Card>
    )
}
