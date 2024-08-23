import { useCallback, useEffect } from "react";
import { createTodolistTC, getTodolistsTC, TodolistDomainType } from "features/TodolistsList/todolistSlice";
import { RequestStatusType } from "app/appSlice";
import { selectStatusTodolist, selectTodolists } from "features/TodolistsList/todolist.selectors";
import { useDispatch } from "react-redux";
import { useAppSelector } from "app/store";
import {selectIsLoggedIn} from 'features/auth/model/authSlice';

export const useTodolisList = (demo: boolean) => {
  const todolists = useAppSelector<Array<TodolistDomainType>>(selectTodolists);
  const status = useAppSelector<RequestStatusType>(selectStatusTodolist);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useDispatch(); //useAppDispatch() не работает

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(createTodolistTC(title));
    },
    [dispatch],
  );

  useEffect(() => {
    // запрос за ТЛ пойдет только если залогинены
    if (!demo && isLoggedIn) {
      dispatch(getTodolistsTC());
    } else {
      return;
    }
  }, []);

  return { addTodolist, todolists, status, isLoggedIn };
};
