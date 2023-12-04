import React, {ChangeEvent, memo} from 'react';
import {Checkbox} from '@mui/material';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from '@mui/icons-material';
import {useDispatch} from 'react-redux';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from './state/tasks-reducer';

export type TaskType = {
    task: { id: string, title: string, isDone: boolean }
    todolistId:string
}

const TaskWithRedux = memo((props: TaskType) => {
    console.log("TaskWithRedux", props.task.title)
// компорненту TaskWithRedux можно было написать двумя способами:
    //1. передать в нее таксИД и тудулист ИД и вытянуть таски по юзСелекетору и тогда юзМемо не нужно.
    //2. передать в нее объект таски(как у меня и написано)  и тудулист ИД  и обернуть в юзМемо. В этом  кейсе лучше этот вар

    const dispatch = useDispatch()
    const onClickHandler = () => dispatch(removeTaskAC(props.task.id, props.todolistId))
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(props.task.id, newIsDoneValue, props.todolistId))
    }
    const onTitleChangeHandler = (newValue: string) => {
        dispatch(changeTaskTitleAC(props.task.id, newValue, props.todolistId))
    }

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