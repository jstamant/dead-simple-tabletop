'use client'

import {useEffect, useState} from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

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
    const [fields, setFields] = useState([{id: '1', content: '1 with text'}, {id: '2', content: '2 with text'}, {id: '3', content: '3 with text'}]);


    useEffect(() => {
        axios.get(`/sheets/${sheet.id}`).then((res) => setSheet(res.data));
    }, []);

    const handleOnDragEnd = (result) => {
        console.log('attempting to reoarder!')
        if (!result.destination) return;
        const reorderedItems = Array.from(fields);
        const [movedItem] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, movedItem);
        setFields(reorderedItems);
    };

    const dragIcon = <Icon path={mdiDrag} size={1} className="inline" />;

    return (
        <div className="flex m-4">
            <Card className="w-1/2">
                <CardHeader>title: {sheet.title}</CardHeader>
                <Divider />
                <CardBody>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided) => (
                                <ul className="bg-slate-100 p-4" {...provided.droppableProps} ref={provided.innerRef}>
                                    {fields.map((field, index) => (
                                        <Draggable key={field.id} draggableId={field.id} index={index}>
                                            {(provided) => (
                                                <li className="bg-slate-300 m-1"
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {field.content}
                                                </li>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <div>{isEditing ? dragIcon : ''} 1 field</div>
                    <div>{isEditing ? dragIcon : ''} 2 field</div>
                    <div>{isEditing ? dragIcon : ''} 3 field</div>
                    <div>{isEditing ? dragIcon : ''} 4 field</div>
                    <div>{isEditing ? dragIcon : ''} 5 field</div>
                    <div>{isEditing ? dragIcon : ''} 6 field</div>
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
