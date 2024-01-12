import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../../state/store';
import {useCallback} from 'react';
import {addTodolistAC} from '../../state/todolists-reducer';
import {TodolistType} from '../AppWithRedux';

export const useAppWithRedux=()=>{
    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

    const dispatch = useDispatch()

    const addTodolist=useCallback((title: string)=> {
        dispatch(addTodolistAC(title))},[dispatch])

    /*    function removeTask(id: string, todolistId: string) {
            dispatch(removeTaskAC(id, todolistId))
        }

        function addTask(title: string, todolistId: string) {
            dispatch(addTaskAC(title, todolistId))
        }

        function changeStatus(id: string, isDone: boolean, todolistId: string) {
            dispatch(changeTaskStatusAC(id, isDone, todolistId))
        }

        function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
            dispatch(changeTaskTitleAC(id, newTitle, todolistId))
        }

        function changeFilter(value: FilterValuesType, todolistId: string) {
            dispatch(changeTodolistFilterAC(todolistId, value))
        }

        function removeTodolist(id: string) {
            let action = removeTodolistAC(id)
            dispatch(action)
        }

        function changeTodolistTitle(id: string, title: string) {
            dispatch(changeTodolistTitleAC(id, title))
        }*/

    //let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks) // таски нам тут не нужны

    return {addTodolist,todolists}
}