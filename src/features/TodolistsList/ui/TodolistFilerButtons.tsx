import React from 'react';
import ButtonContainer from 'common/components/Button/ButtonContainer';
import {useDispatch} from 'react-redux';
import {FilterValuesType, todolistsActions} from 'features/TodolistsList/model/todolists/todolistSlice';


type Props = {
    filter: FilterValuesType,
    todolistId: string,
}

export const TodolistFilerButtons = ({filter, todolistId}: Props) => {

    const dispatch = useDispatch();

    const tasksFilterHandler = (filter: FilterValuesType) => {
        dispatch(todolistsActions.updateTodolist({todolistId, model: {filter}}))
    }

    return (
        <>
            <ButtonContainer variant={filter === 'all' ? 'outlined' : 'text'} onClick={() => tasksFilterHandler('all')}
                             color={'inherit'}>
                All
            </ButtonContainer>
            <ButtonContainer
                variant={filter === 'active' ? 'outlined' : 'text'}
                onClick={() => tasksFilterHandler('active')}
                color={'primary'}>
                Active
            </ButtonContainer>
            <ButtonContainer
                variant={filter === 'completed' ? 'outlined' : 'text'}
                onClick={() => tasksFilterHandler('completed')}
                color={'secondary'}>
                Completed
            </ButtonContainer>
        </>
    );
};

