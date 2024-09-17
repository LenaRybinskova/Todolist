import React, {useEffect, useState} from 'react';
import {todolistAPI} from 'features/TodolistsList/api/todolists/todolistsApi';
import {tasksApi} from 'features/TodolistsList/api/tasks/tasksApi';

export default {
    title: 'API',
};

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        todolistAPI.getTodolists().then((res) => setState(res.data));
    }, []);
    return <div>{JSON.stringify(state)}</div>;
};
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const title = 'NEW NEW TITLE';
        todolistAPI.createTodolist(title).then((res) => setState(res.data));
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = '3b0a6682-62e4-4b5b-8e89-033e79d142a1';
        todolistAPI.deleteTodolist(todolistId).then((res) => setState(res.data));
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = 'b0823b25-723b-401c-852d-c5840b593c0a';
        const title = '2222222222222222';
        const args = {todolistId, title}
        todolistAPI.updateTodolist(args).then((res) => setState(res.data));
    }, []);

    return <div>{JSON.stringify(state)}</div>;
};

export const GetTasks = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = 'b0823b25-723b-401c-852d-c5840b593c0a';
        tasksApi.getTasks(todolistId).then((res) => setState(res.data));
    }, []);
    return <div>{JSON.stringify(state)}</div>;
};
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = 'b0823b25-723b-401c-852d-c5840b593c0a';
        const title = 'LENA11111';
        const args={todolistId,title}

        tasksApi.createTask(args).then((res) => setState(res.data));
    }, []);
    return <div>{JSON.stringify(state)}</div>;
};
export const DeleteTasks = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = 'b0823b25-723b-401c-852d-c5840b593c0a';
        const taskId = 'ec37aec1-6ac0-470c-8ac0-8bcf62bb30f3';
        tasksApi.deleteTask({todolistId, taskId}).then((res) => setState(res.data));
    }, []);
    return <div>{JSON.stringify(state)}</div>;
};
export const UpdateTasks = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        const todolistId = 'b0823b25-723b-401c-852d-c5840b593c0a';
        const taskId = '77626f72-b49d-46e5-a1ec-d23dc003b96b';
        const model = {
            title: 'NEW TITLE 555',
            description: '',
            order: 0,
            status: 0,
            priority: 0,
            startDate: '',
            deadline: '',
        };
        tasksApi.updateTask({todolistId, taskId, model}).then((res) => setState(res.data));
    }, []);
    return <div>{JSON.stringify(state)}</div>;
};
