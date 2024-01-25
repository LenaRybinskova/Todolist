import {Provider} from 'react-redux';
import {combineReducers, createStore} from 'redux';
import {tasksReducer} from './tasks-reducer';
import { todolistsReducer} from './todolists-reducer';
import {v1} from 'uuid';
import {AppRootStateType} from './store';
import {TaskPriorities, TaskStatuses} from '../api/todolists-api';
import {todolistId1, todolistId2} from '../AppWithRedux/id-utils';

// заново как бы создаем стор, конкретно для сторибук
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: todolistId1, title: 'What to learn', filter: 'all', order: 0, addedDate: ''},
        {id: todolistId2, title: 'What to buy', filter: 'all', order: 0, addedDate: ''}
    ],
    tasks:{
        [todolistId1]: [
            {
                id: v1(),
                title: 'CSS',
                status: TaskStatuses.New,
                description: '',
                todoListId: todolistId1,
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: v1(),
                title: 'JS',
                status: TaskStatuses.Completed,
                description: '',
                todoListId: todolistId1,
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: v1(),
                title: 'React',
                status: TaskStatuses.New,
                description: '',
                todoListId: todolistId1,
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: v1(),
                title: 'Redux',
                status: TaskStatuses.New,
                description: '',
                todoListId: todolistId1,
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: ''
            }
        ],
        [todolistId2]: [
            {
                id: v1(),
                title: 'milk',
                status: TaskStatuses.Completed,
                description: '',
                todoListId: todolistId2,
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: v1(),
                title: 'bread',
                status: TaskStatuses.Completed,
                description: '',
                todoListId: todolistId2,
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: ''
            },
            {
                id: v1(),
                title: 'cheese',
                status: TaskStatuses.New,
                description: '',
                todoListId: todolistId2,
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: ''
            }
        ]
    }
}

export const storyBookStore = createStore(rootReducer,initialGlobalState as AppRootStateType);

// for decorator
export const ReduxStoreProviderDecorator = (storyFn:()=>React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}