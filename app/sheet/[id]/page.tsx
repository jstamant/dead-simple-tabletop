'use client'

import {useEffect, useState} from 'react'

import {Card, CardHeader, CardBody, CardFooter} from '@nextui-org/card'
import {Divider} from '@nextui-org/divider'
import {Button} from '@nextui-org/button'

import Icon from '@mdi/react'
import { mdiDrag } from '@mdi/js'

import axios from '../../../util/axios'

// TODO should this use a hard id, or a user-specific id?

interface Sheet {
    id: number,
    user_id: number,
    title: string
}

export default function SheetPage({ params }: { params: { id: number } }) {
    const [sheet, setSheet] = useState<Sheet>({id: params.id, user_id: 1, title: ''});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        axios.get(`/sheets/${sheet.id}`).then((res) => setSheet(res.data));
    }, []);

    const dragIcon = <Icon path={mdiDrag} size={1} className="inline" />;

    return (
        <div className="flex m-4">
            <Card className="w-1/2">
                <CardHeader>title: {sheet.title}</CardHeader>
                <Divider />
                <CardBody>
                    <div>{isEditing ? dragIcon : ''} one field</div>
                    <div>{isEditing ? dragIcon : ''} one field</div>
                    <div>{isEditing ? dragIcon : ''} one field</div>
                    <div>{isEditing ? dragIcon : ''} one field</div>
                    <div>{isEditing ? dragIcon : ''} one field</div>
                    <div>{isEditing ? dragIcon : ''} one field</div>
                </CardBody>
                <Divider />
                <CardFooter>
                    <p>My sheet id: {sheet.id}</p>
                    <p>user_id: {sheet.user_id}</p>
                </CardFooter>
            </Card>
            <Button onPress={() => setIsEditing(!isEditing)}>Edit this sheet</Button>
        </div>
    )
}
