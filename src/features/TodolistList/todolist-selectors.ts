import {AppRootStateType} from '../../AppWithRedux/store';

export const selectTodolists = (state: AppRootStateType) => state.todolists
export const selectStatusTodolist = (state: AppRootStateType) => state.app.status

export const selectTodolist = (state: AppRootStateType, todolistId: string) => {
    return state.todolists.filter((tl) => tl.id === todolistId);
};