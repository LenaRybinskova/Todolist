import {useAppSelector} from 'app/store';
import {useCallback, useEffect} from 'react';
import {addTask, fetchTasks, selectTasksByFilter} from 'features/TodolistsList/model/tasks/tasksSlice';
import {
    removeTodolist,
    TodolistDomainType,
    todolistsActions,
    todolistsThunks
} from 'features/TodolistsList/model/todolists/todolistSlice';
import {useDispatch} from 'react-redux';

export const useTodolist = ({id, filter, title}: TodolistDomainType, demo?: boolean) => {
    /*  let tasks = useAppSelector<TaskType[]>((state) => state.tasks[id]);*/

    const dispatch = useDispatch(); // useAppDispatch не работает
    const tasks = useAppSelector((state) => selectTasksByFilter(state, filter, id))

    useEffect(() => {
        if (!demo) {
            dispatch(fetchTasks(id));
        } else {
            return;
        }
    }, []);

    const addTaskCallback = useCallback(
        (title: string) => {
            dispatch(addTask({title, todolistId: id}));
        },
        [dispatch],
    );

    const deleteTodolist = () => {
        dispatch(removeTodolist(id));
    };
    const changeTodolistTitle = useCallback(
        (title: string) => {
            dispatch(todolistsThunks.changeTitleTodolistTC(id, {title: title}));
        },
        [dispatch, id, title],
    );

    const onAllClickHandler = useCallback(
        () =>
            dispatch(
                todolistsActions.updateTodolist({
                    todolistId: id,
                    model: {filter: 'all'},
                }),
            ),
        [dispatch, id],
    );
    const onActiveClickHandler = useCallback(
        () =>
            dispatch(
                todolistsActions.updateTodolist({
                    todolistId: id,
                    model: {filter: 'active'},
                }),
            ),
        [dispatch, id],
    );
    const onCompletedClickHandler = useCallback(
        () =>
            dispatch(
                todolistsActions.updateTodolist({
                    todolistId: id,
                    model: {filter: 'completed'},
                }),
            ),
        [dispatch, id],
    );


    /* // это у нас как бы расчет математический, его надо обернуть в useMemo()
     tasks = useMemo(() => {
       if (filter === "active") {
         tasks = tasks.filter((task) => task.status === TaskStatuses.New);
       }
       if (filter === "completed") {
         tasks = tasks.filter((task) => task.status === TaskStatuses.Completed);
       }
       return tasks;
     }, [tasks, filter]);
   */

    return {
        title,
        changeTodolistTitle,
        deleteTodolist,
        addTaskCallback,
        tasks,
        onAllClickHandler,
        onActiveClickHandler,
        onCompletedClickHandler,
        id,
        filter,
    };
};
