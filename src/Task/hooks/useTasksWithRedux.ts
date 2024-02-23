import {ChangeEvent} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, removeTaskTC, updateTaskTC} from '../../state/tasks-reducer';
import {TaskWithReduxType} from '../TaskWithRedux';
import {TaskStatuses} from '../../api/todolists-api';
import {useAppDispatch} from '../../state/store';


export const useTasksWithRedux = ({task, todolistId}: TaskWithReduxType) => {

    const dispatch = useAppDispatch()

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        let status=newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTaskTC(todolistId, task.id,{status:status} ))
    }
    const onTitleChangeHandler = (newValue: string) => {
        dispatch(updateTaskTC(todolistId,task.id, {title:newValue}))
    }

    const onClickHandler = () => dispatch(removeTaskTC(task.id, todolistId))

    return {onChangeHandler, onTitleChangeHandler, onClickHandler}
}