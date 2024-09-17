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

export type Props = {
    task: TaskType;
    todolistId: string;
};

const Task = memo(({task, todolistId}: Props) => {

    const {onChangeHandler, onTitleChangeHandler, onClickHandler} = useTasks({task, todolistId});

    const isTaskCompleted = task.status === TaskStatuses.Completed

    return (
        <div className={isTaskCompleted ? 'is-done' : ''}>
            <Checkbox checked={isTaskCompleted} color="primary" onChange={onChangeHandler}/>

            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
});

export default Task;
