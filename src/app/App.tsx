import React, {useEffect} from 'react';
import './App.css';
import IconButton from '@mui/material/IconButton/IconButton';
import {Menu} from '@mui/icons-material';
import {useAppSelector} from './store';
import {ErrorSnackbar} from 'common/components/ErrorSnackbar/ErrorSnackbar';
import {authMe, logout, selectIsLoggedIn} from 'features/auth/model/authSlice';
import {useDispatch} from 'react-redux';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import LinearProgress from '@material-ui/core/LinearProgress';
import {selectIsInitialized, selectStatus} from 'app/appSlice';
import {AppRoutes} from 'app/AppRoutes';

type Props = {
    demo?: boolean;
};

function App({demo = false}: Props) {
    const dispatch = useDispatch(); //useAppDispatch() не работает
    const status = useAppSelector<string | null>(selectStatus);
    const isInitialized = useAppSelector<boolean>(selectIsInitialized);
    const isLoggedIn = useAppSelector(selectIsLoggedIn);

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
                <AppRoutes demo={demo}/>
            </div>
        </Container>
    );
}

export default App;
