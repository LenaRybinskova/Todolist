import {CreateTodolistACType, GetTodolistACType, RemoveTodolistActionType} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from '../api/todolists-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';


export type TasksStateType = {
    [key: string]: Array<TaskType>
}

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type GetTasksACType = ReturnType<typeof getTasksAC>
export type UpdateTaskACType = ReturnType<typeof updateTaskAC>


type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType | ChangeTaskTitleActionType | RemoveTodolistActionType | GetTodolistACType | GetTasksACType | UpdateTaskACType | CreateTodolistACType

// isDone заменили на status, у новых тасок по умолчанию priority: TaskPriorities.Low
const initialState = {
    /*  [todolistId1]: [
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
      ]*/
}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'SET-TODOLISTS':
            const copyState = {...state};
            action.todolists.forEach(tl => {
                copyState[tl.id] = []
            })
            return copyState;
        case 'GET-TASKS':
            return {...state, [action.tlId]: action.tasks}
        case 'REMOVE-TASK': {
            return {...state, [action.todolistId]: state[action.todolistId].filter(tl => tl.id !== action.taskId)}
        }
        case 'ADD-TASK': {
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}
        }
        case 'UPDATE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].map(t => t.id === action.taskId ? {...t,...action.model} : t)}

        case "CREATE-TODOLIST":
            return {...state, [action.todolist.id]:[]}
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
export const addTaskAC = (task: TaskType) => {
    return {type: 'ADD-TASK', task} as const
}
export const changeTaskStatusAC = (taskId: string, status: number, todolistId: string) => {
    return {type: 'CHANGE-TASK-STATUS', status, todolistId, taskId} as const
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const
}
export const getTasksAC = (tasks: TaskType[], tlId: string) => {
    return {
        type: 'GET-TASKS',
        tlId,
        tasks
    } as const
}
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateTaskDomainType) => {
    return {
        type: 'UPDATE-TASK',
        todolistId,
        taskId,
        model
    } as const
}
//TC-----------
export const getTaskTC = (tlId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.getTasks(tlId).then(res => dispatch(getTasksAC(res.data.items, tlId)))
    }
}
export const addTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.createTask(todolistId, title)
            .then(res => dispatch(addTaskAC(res.data.data.item)))
    }
}
export const removeTaskTC = (taskId: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then(res => dispatch(removeTaskAC(taskId, todolistId)))
    }
}


export type UpdateTaskDomainType = {
    title?: string,
    description?: string,
    status?: TaskStatuses,
    priority?: TaskPriorities,
    startDate?: string
    deadline?: string
}
export const updateTaskTC = (todolistId: string, taskId: string, model: UpdateTaskDomainType) => {


    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            console.log('task is not exist')
            return
        }


        const apiModel: UpdateTaskModelType = {
            title: task.title,
            status: task.status,
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            order:task.order,
            ...model}

        todolistAPI.updateTask(todolistId, taskId, apiModel).then(res => dispatch(updateTaskAC(todolistId, taskId, model)))
    }
}

