import React from 'react';
import './App.css';
import {AppBar, Button, Container, LinearProgress, Toolbar, Typography} from '@mui/material';
import IconButton from '@mui/material/IconButton/IconButton';
import {Menu} from '@mui/icons-material';
import TodolistList from '../features/TodolistList/TodolistList';
import {useAppSelector} from './store';
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar';
import {Login} from '../features/login/Login';
import {Route, Routes} from 'react-router-dom';


type AppPropsType = {
    demo?: boolean
}

function App({demo = false}: AppPropsType) {
    console.log('ререндер компоненты Апп')
    const status = useAppSelector<string | null>(state => state.app.status)

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
                {status === 'loading' && <LinearProgress/>}
                <ErrorSnackbar/>
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistList demo={demo}/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
