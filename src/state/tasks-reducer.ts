import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType} from '../api/todolists-api';
import {todolistId1, todolistId2} from '../AppWithRedux/id-utils';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType | ChangeTaskTitleActionType
    | AddTodolistActionType | RemoveTodolistActionType;

// isDone заменили на status, у новых тасок по умолчанию priority: TaskPriorities.Low
const initialState = {
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

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(tl => tl.id !== action.taskId)}
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.todolistId]: [{
                    id: v1(),
                    title: action.title,
                    description: '',
                    todoListId: action.todolistId,
                    order: 0,
                    status: TaskStatuses.New,
                    priority: TaskPriorities.Low,
                    startDate: '',
                    addedDate: '',
                    deadline: ''
                }, ...state[action.todolistId]]
            }
        }
        case 'CHANGE-TASK-STATUS': {

            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    status: action.status
                } : t)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {
                    ...t,
                    title: action.title
                } : t)

            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.todolistId]: []}
        }
        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', todolistId, taskId} as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', title, todolistId} as const
}
export const changeTaskStatusAC = (taskId: string,
                                   status: number,
                                   todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId} as const
}
export const changeTaskTitleAC = (taskId: string,
                                  title: string,
                                  todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const
}

