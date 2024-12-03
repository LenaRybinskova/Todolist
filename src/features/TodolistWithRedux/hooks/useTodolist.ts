import { useAppSelector } from "AppWithRedux/store";
import { useCallback, useEffect, useMemo } from "react";
import { addTaskTC, getTaskTC } from "features/tasksSlice";
import { TodolistDomainType, todolistsActions } from "features/todolistSlice";
import {TaskStatuses, TaskType, useDeleteTodolistMutation, useUpdateTodolistMutation} from 'api/todolists-api';
import { useDispatch } from "react-redux";

export const UseTodolist = ({ id, filter, title }: TodolistDomainType, demo?: boolean) => {
/*    let tasks:any=[]*/
/*  let tasks = useAppSelector<Array<TaskType>>((state) => state.tasks[id]);*/
/*  console.log("TASKS", tasks)*/

  const dispatch = useDispatch(); // useAppDispatch не работает
    const [deleteTodolist]= useDeleteTodolistMutation()
    const [updateTodolist]= useUpdateTodolistMutation()

  // useEffect(() => {
  //   if (!demo) {
  //     dispatch(getTaskTC(id));
  //   } else {
  //     return;
  //   }
  // }, []);

/*
  const addTask = (title: string) => {
      dispatch(addTaskTC(title, id))
  }
*/



  const removeTodolist = () => {
    // dispatch(removeTodolistTC(id));
      deleteTodolist(id)
  };
  const changeTodolistTitle = useCallback(
    (title: string) => {
      // dispatch(changeTitleTodolistTC(id, { title: title }));
        updateTodolist({id, title})

    },
    [dispatch, id, title],
  );

  const onAllClickHandler = useCallback(
    () =>
      dispatch(
        todolistsActions.updateTodolist({
          todolistId: id,
          model: { filter: "all" },
        }),
      ),
    [dispatch, id],
  );
  const onActiveClickHandler = useCallback(
    () =>
      dispatch(
        todolistsActions.updateTodolist({
          todolistId: id,
          model: { filter: "active" },
        }),
      ),
    [dispatch, id],
  );
  const onCompletedClickHandler = useCallback(
    () =>
      dispatch(
        todolistsActions.updateTodolist({
          todolistId: id,
          model: { filter: "completed" },
        }),
      ),
    [dispatch, id],
  );

 /* // это у нас как бы расчет математический, его надо обернуть в useMemo()
  tasks = useMemo(() => {
    if (filter === "active") {
      tasks = tasks.filter((t:any) => t.status === TaskStatuses.New);
    }
    if (filter === "completed") {
      tasks = tasks.filter((t:any) => t.status === TaskStatuses.Completed);
    }
    return tasks;
  }, [tasks, filter]);

*/
  return {
    title,
    changeTodolistTitle,
    removeTodolist,
/*    addTask,*/
    /*tasks,*/
    onAllClickHandler,
    onActiveClickHandler,
    onCompletedClickHandler,
    id,
    filter,
  };
};
