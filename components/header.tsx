import {cookies} from 'next/headers'
import Link from 'next/link'

import {Avatar} from '@nextui-org/avatar'
import {Button} from '@nextui-org/button'

import LogoutButton from './LogoutButton'

export default function Header() {
    const cookieStore = cookies();
    const id = cookieStore.get('userId')?.value;

    return (
        <div className="h-16 flex justify-between bg-slate-300">
            <div>
                <Link href="/">
                    <Button>ROOT</Button>
                </Link>
                <Link href="/dashboard">
                    <Button>Dashboard</Button>
                </Link>
                <Link href="/login"><Button>Login</Button></Link>
                <LogoutButton />
            </div>
            <Avatar name={id} />
        </div>
    )
}
