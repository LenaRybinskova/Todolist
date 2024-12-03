import React, {ReactElement} from 'react';
import {AddItemForm} from 'components/AddItemsForm/AddItemForm';
import {Grid, Paper} from '@mui/material';
import {Todolist} from '../TodolistWithRedux/Todolist';
import {Navigate} from 'react-router-dom';
import {useAppSelector} from 'AppWithRedux/store';
import {RequestStatusType} from 'AppWithRedux/appSlice';
import {selectStatusTodolist} from 'features/TodolistList/todolist-selectors';
import {useAddTodolistMutation, useGetTodolistsQuery} from 'api/todolists-api';
import {selectIsLoggedIn} from 'features/login/login-selectors';

type TodolistListType = {
  demo?: boolean;
};
const TodolistList: React.FC<TodolistListType> = ({ demo = false }): ReactElement => {

    //const todolists = useAppSelector<Array<TodolistDomainType>>(selectTodolists);
    // const dispatch = useDispatch(); //useAppDispatch() не работает
    const status = useAppSelector<RequestStatusType>(selectStatusTodolist);
    const isLoggedIn = useAppSelector<boolean>(selectIsLoggedIn);


    const {data:getTodolists} = useGetTodolistsQuery()
    const [addTodolist]=useAddTodolistMutation()

    console.log("getTodolists", getTodolists)

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


  //если не залогиненты - редирект на login
  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }
  return (
    <>
      <Grid container style={{ margin: "20px" }}>
        <AddItemForm addItem={addTodolistHandle} disabled={status === "loading"} />
      </Grid>
      <Grid container spacing={3}>
        {getTodolists?.map((tl) => {
          return (
            <Grid key={tl.id} item xs={12} sm={6} md={4}>
              <Paper style={{ padding: "10px", minHeight: "400px"} }>
                <Todolist todolist={tl} demo={demo} />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default TodolistList;
