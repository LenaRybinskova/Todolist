import {ChangeEvent} from 'react';
import {removeTask, updateTask} from '../../../features/tasks-sagas';
import {TaskWithReduxType} from '../TaskWithRedux';
import {TaskStatuses} from '../../../api/tasks-api';
import {useAppDispatch} from '../../../AppWithRedux/store';


export const useTasksWithRedux = ({task, todolistId}: TaskWithReduxType) => {

    const dispatch = useAppDispatch()

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        let status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTask(todolistId, task.id, {status: status}))
    }
    const onTitleChangeHandler = (newValue: string) => {
        dispatch(updateTask(todolistId, task.id, {title: newValue}))
    }

    const onClickHandler = () => dispatch(removeTask(task.id, todolistId))

    return {onChangeHandler, onTitleChangeHandler, onClickHandler}
}