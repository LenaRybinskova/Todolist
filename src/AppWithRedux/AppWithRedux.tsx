import React from 'react';
import '../App.css';
import {AddItemForm} from '../AddItemsForm/AddItemForm';
import {AppBar, Button, Container, Grid, Paper, Toolbar, Typography} from '@mui/material';
import IconButton from '@mui/material/IconButton/IconButton';
import {Menu} from '@mui/icons-material';
import {TodolistWithRedux} from '../TodolistWithRedux/TodolistWithRedux';
import {useAppWithRedux} from './hooks/useAppWithRedux';


function AppWithRedux() {

    const {addTodolist, todolists} = useAppWithRedux()

    /*  let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

    //let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks) // таски нам тут не нужны

      const dispatch = useDispatch()

  /!*    function removeTask(id: string, todolistId: string) {
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
      }*!/

      const addTodolist=useCallback((title: string)=> {
          dispatch(addTodolistAC(title))},[dispatch])*/
    console.log("ререндер компоненты Апп")

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(tl => {
                        return <Grid key={tl.id} item>
                            <Paper style={{padding: '10px'}}>
                                <TodolistWithRedux
                                    todolist={tl}
                                />
                            </Paper>
                        </Grid>
                    })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
