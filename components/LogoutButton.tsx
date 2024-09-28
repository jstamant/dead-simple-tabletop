'use client'
/* import Link from 'next/link' */

import {Button} from '@nextui-org/button'

import axios from '../util/axios'

export default function LogoutButton() {
    const handleLogout = () => {
        axios.get('/logout');
    }

    return <Button onPress={handleLogout}>Logout</Button>
}
