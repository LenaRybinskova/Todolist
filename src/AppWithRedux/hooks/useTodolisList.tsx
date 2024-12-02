import { useAppSelector } from "../store";
import { useCallback, useEffect } from "react";

import { RequestStatusType } from "AppWithRedux/appSlice";
import { selectStatusTodolist, selectTodolists } from "features/TodolistList/todolist-selectors";
import { selectIsLoggedIn } from "features/login/login-selectors";
import { useDispatch } from "react-redux";
import {useAddTodolistMutation, useGetTodolistsQuery} from 'api/todolists-api';

export const useTodolisList = (demo: boolean) => {
  //const todolists = useAppSelector<Array<TodolistDomainType>>(selectTodolists);
  const status = useAppSelector<RequestStatusType>(selectStatusTodolist);
  const isLoggedIn = useAppSelector<boolean>(selectIsLoggedIn);
  // const dispatch = useDispatch(); //useAppDispatch() не работает

  const {data:getTodolists} = useGetTodolistsQuery()
  const [addTodolist]=useAddTodolistMutation()

  // const addTodolist = useCallback(
  //   (title: string) => {
  //     dispatch(createTodolistTC(title));
  //   },
  //   [dispatch],
  // );

  const addTodolistHandle=(title: string)=>{
    addTodolist(title)
  }

  // useEffect(() => {
  //   // запрос за ТЛ пойдет только если залогинены
  //   if (!demo && isLoggedIn) {
  //     dispatch(getTodolistsTC());
  //   } else {
  //     return;
  //   }
  // }, []);



  return { addTodolistHandle,  status, isLoggedIn, getTodolists };
};
