import React from 'react';
import Task from 'common/components/Task/Task';
import {TaskType} from 'features/TodolistsList/api/tasks/tasksApi.types';

type Props={
    tasks:TaskType[],
    todolistId:string
}

export const Tasks = ({tasks, todolistId}:Props) => {

    return (
        <div>
            {tasks.map((task) => (
                <Task key={task.id} task={task} todolistId={todolistId}/>
            ))}
        </div>
    );
};
