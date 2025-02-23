import style from './Column.module.scss';
import Task from "@/app/dnd/Task";
import {Droppable} from "react-beautiful-dnd";


const Column = (props) => {

    console.log('[5] 🌻: ', props)
    return (
        <div className={style.container}>
            <div className='text-2xl text-amber-500'>{props.column.title}</div>
            <Droppable droppableId={props.column.id}>
                {provided => (
                    <div className={style.taskList} {...provided.droppableProps} ref={provided.innerRef}>
                        {props.tasks.map((task, index) =>
                            <Task key={task.id} task={task} index={index}/>
                        )}
                        {provided.placeholder}
                    </div>
                )}

            </Droppable>
        </div>
    );
};

export default Column;
