import React, {memo} from 'react';
import {Checkbox} from '@mui/material';
import {EditableSpan} from 'common/components/EditableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from '@mui/icons-material';
import {useTasks} from 'common/components/Task/hooks/useTasks';
import {TaskPriorities, TaskStatuses} from 'common/enums/enums';

type TaskType = {
    id: string;
    title: string;
    description: string | null;
    todoListId: string;
    order: number;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string | null;
    deadline: string | null;
    addedDate: string;
};

export type TaskWithReduxType = {
    task: TaskType;
    todolistId: string;
};

const Task = memo((props: TaskWithReduxType) => {
    const {onChangeHandler, onTitleChangeHandler, onClickHandler} = useTasks({...props});
    const {task} = props

    return (
        <div className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
            <Checkbox checked={task.status === TaskStatuses.Completed} color="primary" onChange={onChangeHandler}/>

            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
});

export default Task;
