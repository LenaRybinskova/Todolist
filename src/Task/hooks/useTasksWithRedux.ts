import {useDispatch} from 'react-redux';
import {ChangeEvent} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../../state/tasks-reducer';
import {TaskWithReduxType} from '../TaskWithRedux';
import {TaskStatuses} from '../../api/todolists-api';


export const useTasksWithRedux = ({task, todolistId}: TaskWithReduxType) => {

// компорненту TaskWithRedux можно было написать двумя способами:
    //1. передать в нее таксИД и тудулист ИД и вытянуть таски по юзСелекетору и тогда юзМемо не нужно.
    //2. передать в нее объект таски(как у меня и написано)  и тудулист ИД  и обернуть в юзМемо. В этом  кейсе лучше этот вар

    const dispatch = useDispatch()

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(task.id, newIsDoneValue ?TaskStatuses.Completed:TaskStatuses.New, todolistId))
    }
    const onTitleChangeHandler = (newValue: string) => {
        dispatch(changeTaskTitleAC(task.id, newValue, todolistId))
    }

    const onClickHandler = () => dispatch(removeTaskAC(task.id, todolistId))

    return {onChangeHandler, onTitleChangeHandler, onClickHandler}
}