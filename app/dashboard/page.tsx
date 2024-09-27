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
interface Game {
    id: number,
    name: string
}


export default function DashboardPage() {
    // TODO make a type for these
    const [sheets, setSheets] = useState<Sheet[]>([]);
    const [games, setGames] = useState<Game[]>([]);

    useEffect(() => {
        console.log("refreshing sheets and games on mount?")
        // TODO should I check to see if sheets is empty, first?
        axios.get('/sheets').then((response) => setSheets(response.data));
        axios.get('/games').then((response) => setGames(response.data));
    }, []);

    const handleAddSheet = () => {
        axios.post('/sheets').then((res) => setSheets([...sheets, res.data]));
    }
    const handleDeleteSheet = (id: number) => {
        return () => {
            axios.delete(`/sheets/${id}`).then(() => setSheets(sheets.filter((sheet) => sheet.id != id)));
        }
    }

    const handleAddGame = () => {
        axios.post('/games').then((res) => setGames([...games, res.data]));
    }
    const handleDeleteGame = (id: number) => {
        return () => {
            axios.delete(`/games/${id}`).then(() => setGames(games.filter((game) => game.id != id)));
        }
    }

    return (
        <div>
            <h1 className="text-4xl">Dashboard</h1>
            <div>
                <h1 className="text-2xl">Sheets</h1>
                <Button onPress={handleAddSheet}>Add/create sheet</Button>
                <div className="flex">
                    {sheets.map((sheet) => {
                        return <Card key={sheet.id} className="m-4">
                            <CardHeader>sheet #{sheet.id}</CardHeader>
                            <CardBody>user_id{sheet.user_id}</CardBody>
                            <CardFooter>
                                <Link href={`/sheet/${sheet.id}`}><Button>goto {sheet.id}</Button></Link>
                                <Button onPress={handleDeleteSheet(sheet.id)}>delete</Button>
                            </CardFooter>
                        </Card>
                    })}
                </div>
            </div>
            <div>
                <h1 className="text-2xl">Games</h1>
                <Button onPress={handleAddGame}>Add/create game</Button>
                <div className="flex">
                    {games.map((game) => {
                        return <Card key={game.id} className="m-4">
                            <CardHeader>game #{game.id}</CardHeader>
                            <CardBody>user_id{game.user_id}</CardBody>
                            <CardFooter>
                                <Link href={`/games/${game.id}`}><Button>goto {game.id}</Button></Link>
                                <Button onPress={handleDeleteGame(game.id)}>delete</Button>
                            </CardFooter>
                        </Card>
                    })}
                </div>
            </div>
        </div>
    )
}
