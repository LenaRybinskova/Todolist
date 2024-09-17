import React from 'react';
import {EditableSpan} from 'common/components/EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from '@mui/icons-material';
import {
    removeTodolist,
    TodolistDomainType,
    todolistsThunks
} from 'features/TodolistsList/model/todolists/todolistSlice';
import {useDispatch} from 'react-redux';


type Props = {
    todolist: TodolistDomainType;
}

export const TodolistTitle = ({todolist}: Props) => {

    const {id, title} = todolist

    const dispatch = useDispatch();

    const deleteTodolistHandler = () => {
        dispatch(removeTodolist(id));
    };

    const changeTodolistTitleHandler =
        (title: string) => {
            const data = {todolistId: id, title}
            dispatch(todolistsThunks.changeTitleTodolistTC(data))
        }


    return (
        <h3>
            <EditableSpan value={title} onChange={changeTodolistTitleHandler}/>
            <IconButton onClick={deleteTodolistHandler}>
                <Delete/>
            </IconButton>
        </h3>
    );
};
