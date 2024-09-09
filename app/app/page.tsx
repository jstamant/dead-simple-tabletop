'use client'

import axios from 'axios';

export default function Page() {
    axios.get('/');
    console.log("Hello?");
    return <p>Hello from the app page!</p>
}
