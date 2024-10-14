import React from 'react';
import {AddItemForm} from 'common/components/AddItemsForm/AddItemForm';
import {Todolist} from 'features/TodolistsList/ui/Todolist';
import {Navigate} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import {useTodolisList} from 'features/TodolistsList/lib/todolistsList/useTodolisList';

type Props = {
    demo?: boolean;
};

const TodolistList = ({demo = false}: Props) => {

    const {addTodolist, todolists, status, isLoggedIn} = useTodolisList(demo);

    if (!isLoggedIn) {
        return <Navigate to={'/auth'}/>;
    }
    return (
        <>
            <Grid container style={{margin: '20px'}}>
                <AddItemForm addItem={addTodolist} disabled={status === 'loading'}/>
            </Grid>
            <Grid container spacing={3}>
                {todolists.map((tl: any) => {
                    return (
                        <Grid key={tl.id} item xs={12} sm={6} md={4}>
                            <Paper style={{padding: '10px', minHeight: '400px', position: 'relative'}}>
                                <Todolist todolist={tl} demo={demo}/>
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
};

export default TodolistList;
