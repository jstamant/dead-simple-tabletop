'use client'
// TODO this page should show the specific character sheet
// should this use a hard id, or a user-specific id?

import axios from 'axios';

export default function Page({ params }: { params: { id: number } }) {
    axios.get('/');
    console.log("Hello?");
    return <div>My sheet id: {params.id}</div>
}
