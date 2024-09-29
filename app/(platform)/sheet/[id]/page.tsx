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

import axios from '@/util/axios'

// TODO should this use a hard id, or a user-specific id?

interface Sheet {
    id: number,
    user_id: number,
    title: string
}

interface Element {
    id: number
}

export default function SheetPage({ params }: { params: { id: number } }) {
    const [sheet, setSheet] = useState<Sheet>({id: params.id, user_id: 1, title: ''});
    const [isEditing, setIsEditing] = useState(false);
    const [elements, setElements] = useState<Element[]>([]);

    const handleAddElement = () => {
        axios.post(`/sheets/${sheet.id}/elements`).then((res) => setElements(elements.concat(res.data)));
    }
    const handleDeleteElement = (id: number) => {
        return () => axios.delete(`/sheets/${sheet.id}/elements/${id}`).then(() => setElements(elements.filter((element) => element.id != id)));
    }

    useEffect(() => {
        axios.get(`/sheets/${sheet.id}`).then((res) => setSheet(res.data));
        axios.get(`/sheets/${sheet.id}/elements`).then((res) => setElements(res.data));
    }, []);

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;
        const reorderedItems = Array.from(elements);
        const [movedItem] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, movedItem);
        setElements(reorderedItems);
    };

    const addIcon = <Icon path={mdiPlus} size={1} className="inline" />;
    const deleteIcon = <Icon path={mdiDelete} size={1} className="inline" />;
    const dragIcon = <Icon path={mdiDrag} size={1} className="inline" />;

    return (
        <Card className="w-1/2 m-4">
            <CardHeader className="flex justify-between">
                <div className="w-1/2 border-b">title: {sheet.title}</div>
                <Button onPress={() => setIsEditing(!isEditing)}>Edit this sheet</Button>
            </CardHeader>
            <Divider />
            <CardBody>
                {isEditing ? <Button onPress={handleAddElement}>add element</Button> : ''}
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="droppable">
                        {(provided) => (
                            <ul className="bg-slate-100 p-4" {...provided.droppableProps} ref={provided.innerRef}>
                                {elements.map((element, index) => (
                                    <Draggable key={element.id} draggableId={String(element.id)} index={index}>
                                        {(provided) => (
                                            <li className="bg-slate-300 m-1"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                {isEditing ? dragIcon : ''}
                                                {isEditing ? addIcon : ''}
                                                {element.id} content here
                                                {isEditing ? <Button onPress={handleDeleteElement(element.id)}>{deleteIcon}</Button> : ''}
                                            </li>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            </CardBody>
            <Divider />
            <CardFooter>
                <p>My sheet id: {sheet.id}</p>
                <p>user_id: {sheet.user_id}</p>
            </CardFooter>
        </Card>
    )
}
