'use client'
import {useState} from 'react'
import {useRouter} from 'next/navigation'

import {Button} from "@nextui-org/button";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Divider} from "@nextui-org/divider";
import {Input} from "@nextui-org/input";

import axios from '../util/axios'

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
    const router = useRouter();
    // TODO need to implement email validation
    // TODO need to implement password validation
    const handleCreateAccount = () => {
        axios.post('/users', {username: email, password: password});
        clearFields();
        // TODO implement the proper creation flow for this...
    }
    const handleLogin = () => {
        axios.post('/login', {username: email, password: password})
             .then(() => {
                 clearFields(); // TODO this is redundant if you're navigating away...
                 router.push('/dashboard');
             });
    }
    const clearFields = (): void => {
        setEmail('');
        setPassword('');
    }
    return (
        <Card className="w-96">
            <CardHeader>Login</CardHeader>
            <Divider />
            <CardBody className="p-2">
                <Input label="Email" value={email} onChange={setField(setEmail)} size="sm" />
                <Input label="Password" value={password} onChange={setField(setPassword)} size="sm" type="password" />
            </CardBody>
            <Divider />
            <CardFooter className="flex justify-center">
                <Button className="w-1/2" onPress={handleLogin}>Login</Button>
                <Button className="w-1/2" onPress={handleCreateAccount}>Create Account</Button>
            </CardFooter>
        </Card>
    )
}
