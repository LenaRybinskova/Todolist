import { setAppErrorAC, setAppStatusAC } from "../AppWithRedux/app-reducer";
import { put } from "redux-saga/effects";


export function* handleServerAppError(data: any) {
  if (data.messages.length) {
    yield put(setAppErrorAC(data.messages[0]));
  } else {
    yield put(setAppErrorAC("some error occured, else"));
  }
  yield put(setAppStatusAC("failed"));
}

export function* handleServerNetworkError(error: { message: string }) {
  yield put(setAppErrorAC("some error occured, CATCH"));
  yield put(setAppStatusAC("failed"));
}

// для TS было
// export const handleServerAppError = (data: any, dispatch: Dispatch<SetErrorACType | SetStatusACType>) => {
//     if (data.messages.length) {
//         dispatch(setAppErrorAC(data.messages[0]))
//     } else {
//         dispatch(setAppErrorAC('some error occured'))
//     }
//     dispatch(setAppStatusAC('failed'))
// }

// export const handleServerNetworkError=(error:{message:string}, dispatch:Dispatch<SetErrorACType | SetStatusACType>)=>{
//     dispatch(setAppErrorAC('some error occured, CATCH')) // вывели в попап
//     dispatch(setAppStatusAC("failed")) // закончили крутилку
// }
