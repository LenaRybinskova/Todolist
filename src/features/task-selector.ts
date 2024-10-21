import {AppRootStateType} from '../../src/AppWithRedux/store';

export const taskSelector = (
    state: AppRootStateType,
    todolistId: string,
    taslId: string
) => {
    return state.tasks[todolistId].find((t) => t.id === taslId);
};