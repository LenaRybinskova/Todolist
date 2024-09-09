import React, {useEffect} from 'react';
import './App.css';
import IconButton from '@mui/material/IconButton/IconButton';
import {Menu} from '@mui/icons-material';
import TodolistList from 'features/TodolistsList/ui/TodolistList';
import {useAppSelector} from './store';
import {ErrorSnackbar} from 'common/components/ErrorSnackbar/ErrorSnackbar';
import {Login} from 'features/auth/ui/Login';
import {Navigate, Route, Routes} from 'react-router-dom';
import {authMe, logout, selectIsLoggedIn} from 'features/auth/model/authSlice';
import {useDispatch} from 'react-redux';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import LinearProgress from '@material-ui/core/LinearProgress';
import {selectIsInitialized, selectStatus} from 'app/appSlice';

type AppPropsType = {
    demo?: boolean;
};

function App({demo = false}: AppPropsType) {
    const dispatch = useDispatch(); //useAppDispatch() не работает
    const status = useAppSelector<string | null>(selectStatus);
    const isInitialized = useAppSelector<boolean>(selectIsInitialized);
    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    // после CircularProgress сработает юзЭффект
    useEffect(() => {
        dispatch(authMe());
    }, []);

    //если прил не проиниц =>крутилка и дальше useEffect с authMeTC() в кот проверка куки и тд
    if (!isInitialized) {
        return <div>Loading..</div>;
    }

    const logoutHandler = () => {
        dispatch(logout());
    };

    return (
        <Container fixed style={{maxWidth: '1200px', marginTop: '20px'}}>
            <div className="App">
                <AppBar position="static" style={{position: 'relative'}}>
                    <Toolbar style={{display: 'flex', justifyContent: 'space-between'}}>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        {/*          <Typography variant="h6">News</Typography>*/}
                        {isLoggedIn && (
                            <Button onClick={logoutHandler} color="inherit">
                                Log out
                            </Button>
                        )}
                    </Toolbar>
                    {status === 'loading' && (
                        <div style={{position: 'absolute', bottom: 0, width: '100%'}}>
                            <LinearProgress/>
                        </div>
                    )}
                    <ErrorSnackbar/>
                </AppBar>

                <Routes>
                    <Route path={'/'} element={<TodolistList demo={demo}/>}/>
                    <Route path={'/auth'} element={<Login/>}/>
                    <Route path={'/404'} element={<h1>PAGE NOT FOUND</h1>}></Route>
                    <Route path={'*'} element={<Navigate to={'/404'}/>}/>
                </Routes>
            </div>
        </Container>
    );
}

export default App;
