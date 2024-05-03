import {Dispatch} from 'redux';
import {appActions} from '../AppWithRedux/app-reducer';

export const handleServerAppError = (data: any, dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(appActions.setAppError({error: data.messages[0]})) // вывели в попап то что от сервера
    } else {
        dispatch(appActions.setAppError({error: 'some error occured'})) // вывели в попап хоть что то
    }
    dispatch(appActions.setAppStatus({status: 'failed'})) // закончили крутилку
}


export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
    dispatch(appActions.setAppError({error: 'some error occured, CATCH'})) // вывели в попап
    dispatch(appActions.setAppStatus({status: 'failed'})) // закончили крутилку
}