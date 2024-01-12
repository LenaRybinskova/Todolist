import React, {ChangeEvent, memo} from 'react';
import {Checkbox} from '@mui/material';
import {EditableSpan} from '../EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from '@mui/icons-material';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../state/tasks-reducer';
import {useTasksWithRedux} from './hooks/useTasksWithRedux';

export type TaskWithReduxType = {
    task: { id: string, title: string, isDone: boolean }
    todolistId: string
}

const TaskWithRedux = memo((props: TaskWithReduxType) => {

    const {onChangeHandler, onTitleChangeHandler, onClickHandler} = useTasksWithRedux({...props})

    return (
        <div className={props.task.isDone ? 'is-done' : ''}>
            <Checkbox
                checked={props.task.isDone}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan value={props.task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
});

export default TaskWithRedux;