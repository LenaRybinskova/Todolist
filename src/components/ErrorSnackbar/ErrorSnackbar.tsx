import * as React from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import {useAppDispatch, useAppSelector} from '../../AppWithRedux/store';
import {setAppErrorAC, setAppStatusAC} from '../../AppWithRedux/app-reducer';



export function ErrorSnackbar() {

    const  error = useAppSelector<string | null>(state => state.app.error)
    const dispatch=useAppDispatch()

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        // если гдето мимо кликаем, то не уберется сообщение
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppStatusAC("succeeded"))
        dispatch(setAppErrorAC(null))
    };


    return (
        <Box sx={{width: 500}}>
            {/*            {buttons}*/}
            <Snackbar
                anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                open={error !==null}
                onClose={handleClose}
                message={error}
                key={'bottom' + 'center'}
                autoHideDuration={3000}
            />
        </Box>
    );
}