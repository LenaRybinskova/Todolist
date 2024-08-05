import { appActions } from "app/appSlice";
import { AppDispatch } from "app/store";
import axios from "axios";

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
