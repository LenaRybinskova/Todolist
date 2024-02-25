import React from 'react';
import {useTodolisList} from '../../AppWithRedux/hooks/useTodolisList';
import {AddItemForm} from '../../components/AddItemsForm/AddItemForm';
import {Grid, Paper} from '@mui/material';
import {TodolistWithRedux} from '../TodolistWithRedux/TodolistWithRedux';

const TodolistList = () => {
    const {addTodolist, todolists} = useTodolisList()

    return (
            <>
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
            </>
        )
};

export default TodolistList;