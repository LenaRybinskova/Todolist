import {ChangeEvent} from 'react';
import {removeTask, updateTask} from 'features/TodolistsList/model/tasks/tasksSlice';
import {useDispatch} from 'react-redux';
import {TaskStatuses} from 'common/enums/enums';
import {TaskType} from 'features/TodolistsList/api/tasks/tasksApi.types';

type Props = {
    task: TaskType,
    todolistId: string
}

export const useTasks = ({task, todolistId}: Props) => {
    const dispatch = useDispatch(); // useAppDispatch() не работает

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = event.currentTarget.checked;
        let status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New;
        dispatch(updateTask({todolistId, taskId: task.id, model: {status: status}}));
    };
    const onTitleChangeHandler = (newValue: string) => {
        dispatch(updateTask({todolistId, taskId: task.id, model: {title: newValue}}));
    };

    const onClickHandler = () => dispatch(removeTask({taskId: task.id, todolistId}));

    return {onChangeHandler, onTitleChangeHandler, onClickHandler};
};
