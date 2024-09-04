import React from 'react';
import {AddItemForm} from 'common/components/AddItemsForm/AddItemForm';
import {EditableSpan} from 'common/components/EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from '@mui/icons-material';
import ButtonContainer from 'common/components/Button/ButtonContainer';
import Task from 'common/components/Task/Task';
import {useTodolist} from 'features/TodolistsList/lib/todolist/useTodolist';
import {TodolistDomainType} from 'features/TodolistsList/model/todolists/todolistSlice';

type PropsType = {
    todolist: TodolistDomainType;
    demo?: boolean;
};

export const Todolist:React.FC<PropsType> = React.memo(({todolist, demo}) => {
    const {
        title,
        changeTodolistTitle,
        removeTodolist,
        addTaskCallback,
        tasks,
        onAllClickHandler,
        onActiveClickHandler,
        onCompletedClickHandler,
        id,
        filter,
    } = useTodolist({...todolist}, demo);

    return (
        <div>
            <h3>
                <EditableSpan value={title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete/>
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === 'loading'}/>
            <div>
                {tasks.map((task) => (
                    <Task key={task.id} task={task} todolistId={id}/>
                ))}
            </div>
            <div style={{position: 'absolute', bottom: '15px', left: '20px'}}>
                <ButtonContainer variant={filter === 'all' ? 'outlined' : 'text'} onClick={onAllClickHandler}
                                 color={'inherit'}>
                    All
                </ButtonContainer>
                <ButtonContainer
                    variant={filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>
                    Active
                </ButtonContainer>
                <ButtonContainer
                    variant={filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>
                    Completed
                </ButtonContainer>
            </div>
        </div>
    );
});
