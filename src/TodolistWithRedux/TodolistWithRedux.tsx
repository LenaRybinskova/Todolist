import React from 'react';
import {AddItemForm} from '../AddItemsForm/AddItemForm';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from '@mui/icons-material';
import ButtonContainer from '../ButtonWithRedux/ButtonWithRedux';
import TaskWithRedux from '../Task/TaskWithRedux';
import {UseTodolistWithRedux} from './hooks/useTodolistWithRedux';
import {TodolistDomainType} from '../state/todolists-reducer';


type PropsType = {
    todolist: TodolistDomainType
}

export const TodolistWithRedux = React.memo(({todolist}: PropsType) => {

    const {title,changeTodolistTitle,removeTodolist,addTask,tasks,onAllClickHandler,onActiveClickHandler, onCompletedClickHandler,id,filter}=UseTodolistWithRedux({...todolist})


    return <div>
        <h3><EditableSpan value={title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {tasks.map(t => <TaskWithRedux key={t.id} task={t} todolistId={id}/>)}
        </div>
        <div>
            <ButtonContainer variant={filter === 'all' ? 'outlined' : 'text'} onClick={onAllClickHandler} color={'inherit'}>All</ButtonContainer>
            <ButtonContainer variant={filter === 'active' ? 'outlined' : 'text'} onClick={onActiveClickHandler} color={'primary'}>Active</ButtonContainer>
            <ButtonContainer variant={filter === 'completed' ? 'outlined' : 'text'} onClick={onCompletedClickHandler} color={'secondary'}>Completed</ButtonContainer>
        </div>
    </div>
})


