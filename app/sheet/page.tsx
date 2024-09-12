'use client'
// TODO this page should show the last-opened sheet

import axios from 'axios';

export default function Page() {
    axios.get('/');
    console.log("Hello?");
    return <p>Hello from the sheet page!</p>
}
