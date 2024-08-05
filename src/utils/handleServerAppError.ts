import { Dispatch } from "redux";
import { appActions } from "app/appSlice";

export const handleServerAppError = (data: any, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(appActions.setAppError({ error: data.messages[0] })); // вывели в попап то что от сервера
  } else {
    dispatch(appActions.setAppError({ error: "some error occured" })); // вывели в попап хоть что то
  }
  dispatch(appActions.setAppStatus({ status: "failed" })); // закончили крутилку
};
