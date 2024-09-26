'use client'

// TODO move state to child components?
import {useEffect, useState} from 'react'

import Link from 'next/link'
import {Button} from '@nextui-org/button'
import {Card, CardHeader, CardBody, CardFooter} from '@nextui-org/card'

import axios from '../../util/axios'

interface Sheet {
    id: number,
    user_id: number
}

export default function DashboardPage() {
    // TODO make a type for these
    const [sheets, setSheets] = useState<Sheet[]>([]);
    /* const [games, setGames] = useState([]); */

    useEffect(() => {
        console.log("refreshing sheets on mount?")
        // TODO should I check to see if sheets is empty, first?
        axios.get('/sheets').then((response) => setSheets(response.data));
    }, []);

    const handleAddSheet = () => {
        axios.post('/sheets');
    }

    return (
        <div>
            <h1 className="text-4xl">Dashboard</h1>
            <div>
                <h1 className="text-2xl">Sheets</h1>
                <Button onPress={handleAddSheet}>Add/create sheet</Button>
                <div className="flex">
                    {sheets.map((sheet) => {
                        return <Card key={sheet.id}>
                            <CardHeader>sheet #{sheet.id}</CardHeader>
                            <CardBody>user_id{sheet.user_id}</CardBody>
                            <CardFooter>
                                <Link href={`/sheet/${sheet.id}`}><Button>goto {sheet.id}</Button></Link>
                            </CardFooter>
                        </Card>
                    })}
                </div>
            </div>
            <div>
                <h1 className="text-2xl">Games</h1>
                <Button>Add/create game</Button>
                <Card>list of games</Card>
                <Link href="/game"><Button>goto game page (debug)</Button></Link>
            </div>
        </div>
    )
}
