'use client'

import {useEffect, useState} from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

import {Card, CardHeader, CardBody, CardFooter} from '@nextui-org/card'
import {Divider} from '@nextui-org/divider'
import {Button} from '@nextui-org/button'

import Icon from '@mdi/react'
import { mdiDelete } from '@mdi/js'
import { mdiDrag } from '@mdi/js'
import { mdiPlus } from '@mdi/js'

import axios from '../../../util/axios'

// TODO should this use a hard id, or a user-specific id?

interface Sheet {
    id: number,
    user_id: number,
    title: string
}

interface Field {
    id: number
}

export default function SheetPage({ params }: { params: { id: number } }) {
    const [sheet, setSheet] = useState<Sheet>({id: params.id, user_id: 1, title: ''});
    const [isEditing, setIsEditing] = useState(false);
    const [fields, setFields] = useState<Field[]>([]);

    const handleAddElement = () => {
        axios.post(`/sheets/${sheet.id}/fields`).then((res) => setFields(fields.concat(res.data)));
    }
    const handleDeleteElement = (id: number) => {
        return () => axios.delete(`/sheets/${sheet.id}/fields/${id}`).then(() => setFields(fields.filter((field) => field.id != id)));
    }

    useEffect(() => {
        axios.get(`/sheets/${sheet.id}`).then((res) => setSheet(res.data));
        axios.get(`/sheets/${sheet.id}/fields`).then((res) => setFields(res.data));
    }, []);

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const reorderedItems = Array.from(fields);
        const [movedItem] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, movedItem);
        setFields(reorderedItems);
    };

    const addIcon = <Icon path={mdiPlus} size={1} className="inline" />;
    const deleteIcon = <Icon path={mdiDelete} size={1} className="inline" />;
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
                                        <Draggable key={field.id} draggableId={String(field.id)} index={index}>
                                            {(provided) => (
                                                <li className="bg-slate-300 m-1"
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    {field.id} content here
                                                    {isEditing ? <Button onPress={handleDeleteElement(field.id)}>{deleteIcon}</Button> : ''}
                                                </li>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                    {isEditing ? <Button onPress={handleAddElement}>addIcon</Button> : ''}
                    <div>{isEditing ? dragIcon : ''}{isEditing ? addIcon : ''} 1 field{isEditing ? deleteIcon : ''}</div>
                    <div>{isEditing ? dragIcon : ''}{isEditing ? addIcon : ''} 2 field{isEditing ? deleteIcon : ''}</div>
                    <div>{isEditing ? dragIcon : ''}{isEditing ? addIcon : ''} 3 field{isEditing ? deleteIcon : ''}</div>
                    <div>{isEditing ? dragIcon : ''}{isEditing ? addIcon : ''} 4 field{isEditing ? deleteIcon : ''}</div>
                    <div>{isEditing ? dragIcon : ''}{isEditing ? addIcon : ''} 5 field{isEditing ? deleteIcon : ''}</div>
                    <div>{isEditing ? dragIcon : ''}{isEditing ? addIcon : ''} 6 field{isEditing ? deleteIcon : ''}</div>
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
