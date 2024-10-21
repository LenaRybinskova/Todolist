import {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Task} from './Task';
import React, {useState} from 'react';
import {TaskPriorities, TaskStatuses} from '../api/tasks-api';
import {todolistId1} from '../AppWithRedux/id-utils';

// TOGGLE НЕ РАБОТАЕТ
const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/TaskWithRedux',
    component: Task,
    parameters: {layout: 'centered'},
    tags: ['autodocs'],
    argTypes: {
        removeTask: {action: 'removeTask'},
        changeTaskStatus: {action: 'changeTaskStatus'},
        changeTaskTitle: {action: 'changeTaskTitle'}
    },
    args: {
        task: {id: '1', title: 'молоко', status: TaskStatuses.Completed,
            description: '',
            todoListId: todolistId1,
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
            addedDate: ''},
        todolistId: '1111111111111111'
    }
}

export default meta;
type Story = StoryObj<typeof Task>;

//1 история
export const TaskIsDoneStory: Story = {};

//2 история
export const TaskNotIsDoneStory: Story = {
    args: {
        task: {id: '2', title: 'хлеб', status: TaskStatuses.New,
            description: '',
            todoListId: todolistId1,
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
            addedDate: ''},
        todolistId: '2222222222222222',
    },
};

// чтобы оживить компоненту и коллбеки работали придется создать новую комп Таск c стейтом
const TaskToggle = ()=>{
    const [task, setTask]=useState({id: '1', title: 'молоко', status: TaskStatuses.Completed,
        description: '',
        todoListId: todolistId1,
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        addedDate: ''})

    return <Task
        task={task}
        todolistId={"1111111111111111"}
        changeTaskStatus={(id,status,todolistId)=>setTask({...task,status:TaskStatuses.New})}
        changeTaskTitle={(taskId, newTitle,todolistId)=>setTask({...task,title:newTitle})}
        removeTask={action("Task removed")}/>
}

//3 история, засунули ее в класс
/*
export const TaskToggleStory:Story={
    render: ()=><TaskToggle/>
}*/

//3 история, засунули ее в функцию
export const TaskToggleStory=()=><TaskToggle/>