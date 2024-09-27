'use client'
import {useEffect, useState} from 'react'

import {Card, CardHeader, CardBody, CardFooter} from '@nextui-org/card'

import axios from '../../../util/axios'

// TODO should this use a hard id, or a user-specific id?

interface Sheet {
    id: number,
    user_id: number,
    title: string
}

export default function SheetPage({ params }: { params: { id: number } }) {
    const [sheet, setSheet] = useState<Sheet>({id: params.id, user_id: 1, title: ''});

    useEffect(() => {
        axios.get(`/sheets/${sheet.id}`).then((res) => setSheet(res.data));
    }, []);

    return (
        <Card className="w-1/2 m-4">
            <CardHeader>title: {sheet.title}</CardHeader>
            <CardBody>Content</CardBody>
            <CardFooter>
                <p>My sheet id: {sheet.id}</p>
                <p>user_id: {sheet.user_id}</p>
            </CardFooter>
        </Card>
    )
}
