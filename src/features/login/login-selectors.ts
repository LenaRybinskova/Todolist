import {AppRootStateType} from '../../AppWithRedux/store';

export const selectIsLoggedIn = (state:AppRootStateType) => state.auth.isLoggedIn