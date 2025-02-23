'use client'
import React, {useState} from 'react';
import Column from "@/app/dnd/Column";
import {DragDropContext} from 'react-beautiful-dnd';


const Dnd = () => {

    const [state] = useState({
        tasks: {
            'task-1': {id: 'task-1', content: 'Это задача №1'},
            'task-2': {id: 'task-2', content: 'Это задача №2'},
            'task-3': {id: 'task-3', content: 'Это задача №3'},
            'task-4': {id: 'task-4', content: 'Это задача №4'},
            'task-5': {id: 'task-5', content: 'Это задача №5'},
        },
        columns: {
            'column-1': {id: 'column-1', title: 'To Do', tasksId: ['task-1', 'task-2', 'task-3', 'task-4', 'task-5']}
        },
        columnOrder: ['column-1'],
    });

    const onDragEnd = (res) => {
        console.log('[24] 🍄: ', res)
    }


    return (
        <DragDropContext
            onDragEnd={onDragEnd}
        >
            <div className='h-full max-w-3xl mx-auto w-full'>
                {state && state.columnOrder.map(columnId => {
                    const column = state.columns[columnId];
                    const tasks = column.tasksId.map(taskId => state.tasks[taskId])
                    return <Column key={column.id} column={column} tasks={tasks}/>
                })}
            </div>
        </DragDropContext>

    );
};

export default Dnd;
