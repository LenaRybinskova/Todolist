import {Dispatch} from 'redux';
import {setAppErrorAC, setAppStatusAC, SetErrorACType, SetStatusACType} from '../AppWithRedux/app-reducer';

export const handleServerAppError = (data: any, dispatch: Dispatch<SetErrorACType | SetStatusACType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0])) // вывели в попап то что от сервера
    } else {
        dispatch(setAppErrorAC('some error occured')) // вывели в попап хоть что то
    }
    dispatch(setAppStatusAC('failed')) // закончили крутилку
}


export const handleServerNetworkError=(error:{message:string}, dispatch:Dispatch<SetErrorACType | SetStatusACType>)=>{
    dispatch(setAppErrorAC('some error occured, CATCH')) // вывели в попап
    dispatch(setAppStatusAC("failed")) // закончили крутилку
}