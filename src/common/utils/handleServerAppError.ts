import { Dispatch } from "redux";
import { appActions } from "app/appSlice";

/**
 *
 * @param data - ответ сервера
 * @param dispatch
 * @param isShowGlobalAppError - флаг для отображения глобальной ошибки (всплывающего окна)
 */

export const handleServerAppError = (data: any, dispatch: Dispatch, isShowGlobalAppError:boolean=true) => {
  if(isShowGlobalAppError){
    if (data.messages.length) {
      dispatch(appActions.setAppError({ error: data.messages[0] })); // вывели в попап то что от сервера
    } else {
      dispatch(appActions.setAppError({ error: "some error occured" })); // вывели в попап хоть что то
    }
  }

  dispatch(appActions.setAppStatus({ status: "failed" })); // закончили крутилку
};
