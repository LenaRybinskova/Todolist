import { Dispatch } from "redux";
import { appActions } from "AppWithRedux/appSlice";
import { AppDispatch } from "AppWithRedux/store";
import axios from "axios";

export const handleServerAppError = (data: any, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(appActions.setAppError({ error: data.messages[0] })); // вывели в попап то что от сервера
  } else {
    dispatch(appActions.setAppError({ error: "some error occured" })); // вывели в попап хоть что то
  }
  dispatch(appActions.setAppStatus({ status: "failed" })); // закончили крутилку
};

/*export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
  dispatch(appActions.setAppError({ error: error.message ? error.message : "some error occured, CATCH" })); // вывели в попап
  dispatch(appActions.setAppStatus({ status: "failed" })); // закончили крутилку
};*/

export const handleServerNetworkError = (err: unknown, dispatch: AppDispatch): void => {
  let errorMessage = "Some error occurred";

  // err это тип Аксиос ошибки?
  if (axios.isAxiosError(err)) {
    // err.response есть в ответе сервера? значит выводим что сервер ответил, если такого нет, значит на сервер даже не ушел запрос(инет отруб), значит берем err?.message, если и этого в ответе нет, просто выводим заглушку "Some error occurred"
    errorMessage = err.response?.data?.message || err?.message || errorMessage;
    //Проверка на наличие нативной ошибки, напр мапим undefined
  } else if (err instanceof Error) {
    errorMessage = `Native error: ${err.message}`;
    //Какой-то непонятный кейс
  } else {
    errorMessage = JSON.stringify(err);
  }

  dispatch(appActions.setAppError({ error: errorMessage }));
  dispatch(appActions.setAppStatus({ status: "failed" }));
};
