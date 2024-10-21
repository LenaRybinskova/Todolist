import { useAppDispatch, useAppSelector } from "../store";
import { useCallback, useEffect } from "react";
import { TodolistDomainType } from "../../features/todolists-reducer";
import { createTodolist, getTodolists } from "../../features/todolists-sagas";
import { RequestStatusType } from "../app-reducer";
import {
  selectStatusTodolist,
  selectTodolists
} from "../../features/TodolistList/todolist-selectors";
import { selectIsLoggedIn } from "../../features/login/login-selectors";

export const useTodolisList = (demo: boolean) => {
  const todolists = useAppSelector<Array<TodolistDomainType>>(selectTodolists);
  const status = useAppSelector<RequestStatusType>(selectStatusTodolist);
  const isLoggedIn = useAppSelector<boolean>(selectIsLoggedIn);
  const dispatch = useAppDispatch();

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(createTodolist(title));
    },
    [dispatch]
  );

  useEffect(() => {
    if (!demo && isLoggedIn) {
      dispatch(getTodolists());
    } else {
      return;
    }
  }, []);

  return { addTodolist, todolists, status, isLoggedIn };
};
