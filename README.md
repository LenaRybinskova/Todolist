## В проекте использовались библиотеки:
   - React
   - Redux
   - React-Redux
   - Redux-thunk
   - Redux Toolkit
   - React-router-dom
   - Axios
   - Formik
   - Jest
   - Material-UI
   - Storybook

### 21: Hot Module Replacement 

Модульная система webpack отслеживает за изм в модулях и может вызывать измненения только в них.
Нужно combineReducer отдельно выносить, если к редьюсорам и экшенам обращаемся через index.ts


### 20: обработка обшибок app в addMatcher

```
builder.addMatcher(
                (action) => {
                    return action.type.endsWith('/rejected')
                },
                (state, action: any) => {
                    state.status = 'failed'

                    if (action.payload) {
                        if (action.type === thunkTasks.addTask.rejected.type
                            || action.type === todolistsThunks.createTodolist.rejected.type
                            || action.type === appThunks.authMe.rejected.type) {
                            return
                        }
                        state.error = action.payload?.messages[0];
                    } else {
                        state.error = action.error.message ? action.error.message : 'произошла какая то ошибка'
                    }
                })
```


### 19: утилитная функция tryCatchThunk(thunkAPI, logic()=>Promise )

```
type ThunkAPI = BaseThunkAPI<AppRootStateType, unknown, AppDispatch, null | BaseResponse>

export const tryCatchThunk = async <T>(thunkAPI: ThunkAPI, logic: () => 
Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>>): 
Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
    try {
        thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}));
        return await logic()
    } catch (e) {
        handleServerAppError(e as { message: string }, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null)
    }
}

export const authMe = createAppAsyncThunks<{isLoggedIn: boolean}, undefined>(`${authSlice.name}/authMe`, async (_, thunkAPI) => {
    return tryCatchThunk(thunkAPI, async () => {
        const res = await authAPI.authMe();
        if (res.data.resultCode === ResultCode.Success) {
            thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}));
            return {isLoggedIn: true}
        } else {
            handleServerAppError(res.data, thunkAPI.dispatch, false)
            return thunkAPI.rejectWithValue(null)
        }
    }).finally(() => {
        thunkAPI.dispatch(appActions.setInitialized({isInitialized: true}))
    })
})
```

### 18: перевод ThunkCreation на createAppAsyncThunks


```
export const createAppAsyncThunks = createAsyncThunk.withTypes<{
  state: AppRootStateType;
  dispatch: AppDispatch;
  rejectValue: null | BaseResponse;
}>();

export const login = createAppAsyncThunks<any, any>(`${authSlice.name}/login`, async (args, thunkAPI) => {
    thunkAPI.dispatch(appActions.setAppStatus({status: 'loading'}))
    try {
        const res = await authAPI.login(args);
        if (res.data.resultCode === ResultCode.Success) {
            thunkAPI.dispatch(appActions.setAppStatus({status: 'succeeded'}))
            return
        } else {
            const isShowAppGlobal = !res.data.fieldsErrors.length
            handleServerAppError(res.data, thunkAPI.dispatch, isShowAppGlobal);
            return thunkAPI.rejectWithValue(null)
        }
    } catch (e) {
        handleServerNetworkError(e, thunkAPI.dispatch);
        return thunkAPI.rejectWithValue(null);
    }
})
```

### 17: redux toolkit (без изм в ТС)

### 16: formik, иниц прил со старта

### 15: axios

библиотека axios

Создаем уровень DAL c объектом TodolistAPI с методами CRUD(det, post, put, delete),типизируем то что они возвращают

Создаем instance c baseURL и настройками

Обращаемся к уровню DAL на UI

### 14: кастомные хуки

Код компоненты дб легко читаем, логику переносим в каст хуки. Импорт кастхук в компоненту и получается она более читаема.

### 12: Storybook + snapshot

```
npx storybook@latest init
```

npx sb init не ставила, выдает ошибку babelOption

storybook запускает отдельный свой сервер


```
npx cache clear -- force
```

если опять ошибка - удалить node_modules и yarn.lock

```
yarn install
```

перезап webshtorm.

поменять порт на 9009 "storybook": "storybook dev -p 9009"

Декоратор - это функция, по сути схожа с ХОК коннект,обертка со Стором,которая принимает др функцию(историю) и вызывает
ее.
Чтобы не делать такую обертку для каждой истории, есть концепция декораторов.

```
yarn add @storybook/addon-storysource --dev
```

для ui тестирования

```
yarn add puppeteer jest-puppeteer jest-image-snapshot start-server-and-test --dev
```

или

```
yarn add puppeteer jest-puppeteer jest-image-snapshot start-server-and-test jest jest-environment-jsdom --dev
```

добавить скрипты

"jest:integration": "jest -c integration/jest.config.js",
"test:integration": "start-server-and-test storybook http-get://localhost:9009 jest:integration"

создать integration папку с файлами setupTests.js

```
const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({ toMatchImageSnapshot });
```

и jest.config.js

```
 module.exports = {
   preset: 'jest-puppeteer',
   testRegex: './*\\.test\\.js$',
   setupFilesAfterEnv: ['./setupTests.js']
};
```

```
yarn run jest:integration --updateSnapshot  обновить эталонный вид
```

### 11: среда 3 занятие React.memo() , useCallback(), useMemo()

Исп в связки, все коллбеки передаваемые в компоненты, оборач в useCallback().

В список зависимостей добавляем то что есть в этой функции : пропсы, лок.стейт, диспатч.

Мат расчеты оборачиваем в useMemo()

### 10: среда 2 занятие react-redux, TodolistWithRedux
