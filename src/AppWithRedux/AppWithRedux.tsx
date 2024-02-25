import React from 'react';
import './App.css';
import {AppBar, Button, Container, Toolbar, Typography} from '@mui/material';
import IconButton from '@mui/material/IconButton/IconButton';
import {Menu} from '@mui/icons-material';
import TodolistList from '../features/TodolistList/TodolistList';


function AppWithRedux() {
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
                <TodolistList/>
            </Container>
        </div>
    );
}

export default AppWithRedux;
