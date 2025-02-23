import React from 'react';
import {Draggable} from "react-beautiful-dnd";

const Task = (props) => {
    console.log('[4] 🐬: ', props.task.id)
    return (
        <Draggable draggableId={props.task.id} index={props.index}>
            {provided => (
                <div className='border-2 p-2 mb-2 rounded-l'
                     {...provided.draggableProps}
                     {...provided.dragHandleProps}
                     ref={provided.innerRef}
                >
                    {props.task.content} + {props.task.id}
                </div>
            )}
        </Draggable>
    );
};

export default Task;
