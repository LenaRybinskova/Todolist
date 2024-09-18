import React, {useEffect} from 'react';
import {AddItemForm} from 'common/components/AddItemsForm/AddItemForm';
import {TodolistDomainType} from 'features/TodolistsList/model/todolists/todolistSlice';
import {TodolistTitle} from 'features/TodolistsList/ui/TodolistTitle';
import {Tasks} from 'features/TodolistsList/ui/Tasks';
import {TodolistFilerButtons} from 'features/TodolistsList/ui/TodolistFilerButtons';
import {useAppSelector} from 'app/store';
import { fetchTasks, selectTasksByFilter, thunkTasks} from 'features/TodolistsList/model/tasks/tasksSlice';
import {selectIsLoggedIn} from 'features/auth/model/authSlice';
import {useDispatch} from 'react-redux';
import {unwrapResult} from '@reduxjs/toolkit';

type Props = {
    todolist: TodolistDomainType;
    demo?: boolean;
};

export const Todolist = ({todolist, demo}: Props) => {

    const {id, filter} = todolist

    const dispatch = useDispatch();
    const tasks = useAppSelector((state) => selectTasksByFilter(state, filter, id))
    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    useEffect(() => {
        if (!demo && isLoggedIn) {
            dispatch(fetchTasks(id));
        } else {
            return;
        }
    }, [dispatch]);

    const addTaskCallback = (title: string):any => {
        return  dispatch(thunkTasks.addTask({ title, todolistId: todolist.id }))
    }

    return (
        <div>
            <TodolistTitle todolist={todolist}/>
            <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === 'loading'}/>
            <Tasks tasks={tasks} todolistId={id}/>
            <div style={{position: 'absolute', bottom: '15px', left: '20px'}}>
                <TodolistFilerButtons todolistId={id} filter={todolist.filter}/>
            </div>
        </div>
    );
}
