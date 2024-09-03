import { useAppSelector } from "app/store";
import { useCallback, useEffect, useMemo } from "react";
import { addTask, setTasks } from "features/TodolistsList/tasksReducer";
import { changeTitleTodolistTC, removeTodolistTC, TodolistDomainType, todolistsActions } from "features/TodolistsList/todolistSlice";
import { TaskType } from "features/TodolistsList/todolists-api";
import { useDispatch } from "react-redux";
import { TaskStatuses } from "common/enums/enums";

export const UseTodolist = ({ id, filter, title }: TodolistDomainType, demo?: boolean) => {
  let tasks = useAppSelector<Array<TaskType>>((state) => state.tasks[id]);
  console.log("filter", filter);
  const dispatch = useDispatch(); // useAppDispatch не работает

  useEffect(() => {
    if (!demo) {
      dispatch(setTasks(id));
    } else {
      return;
    }
  }, []);

  const addTaskCallback = useCallback(
    (title: string) => {
      dispatch(addTask({ title, todolistId: id }));
    },
    [dispatch],
  );

  const removeTodolist = () => {
    dispatch(removeTodolistTC(id));
  };
  const changeTodolistTitle = useCallback(
    (title: string) => {
      dispatch(changeTitleTodolistTC(id, { title: title }));
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

  // это у нас как бы расчет математический, его надо обернуть в useMemo()
  tasks = useMemo(() => {
    if (filter === "active") {
      tasks = tasks.filter((t) => t.status === TaskStatuses.New);
    }
    if (filter === "completed") {
      tasks = tasks.filter((t) => t.status === TaskStatuses.Completed);
    }
    return tasks;
  }, [tasks, filter]);

  console.log("tasksForFilter", tasks);
  return {
    title,
    changeTodolistTitle,
    removeTodolist,
    addTaskCallback,
    tasks,
    onAllClickHandler,
    onActiveClickHandler,
    onCompletedClickHandler,
    id,
    filter,
  };
};
