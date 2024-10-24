import {addTaskAC, removeTaskAC} from './tasks-reducer';
import {taskAPI, TaskType} from '../api/tasks-api';
import {ResponseType} from '../api/todolists-api';
import {setAppErrorAC, setAppStatusAC} from '../AppWithRedux/app-reducer';
import {call, put} from 'redux-saga/effects';
import {addTaskSaga, removeTaskSaga} from '../../src/features/tasks-sagas';


let responseAddTask: ResponseType<{ item: TaskType }>
let responseDeleteTask: ResponseType
beforeEach(() => {
    responseAddTask = {
        data: {
            item: {
                id: '11',
                title: 'newTitle',
                description: null,
                todoListId: 'newTodolistId',
                order: 111,
                status: 0,
                priority: 0,
                startDate: null,
                deadline: null,
                addedDate: ''
            }
        },
        resultCode: 0,
        fieldsErrors: [],
        messages: []
    }
    responseDeleteTask={
        data: {},
        resultCode: 0,
        fieldsErrors: [],
        messages: []
    }

})
test('addTaskSaga success, without errors from server (resultCode === 0)', () => {
    const generator = addTaskSaga({type: 'TASKS/ADD-TASK-SAGA', title: 'newTitle', todolistId: 'newTodolistId'})

    expect(generator.next().value).toEqual(put(setAppStatusAC('loading')))
    expect(generator.next().value).toEqual(call(taskAPI.createTask, 'newTodolistId', 'newTitle'))
    expect(generator.next(responseAddTask).value).toEqual(put(addTaskAC(responseAddTask.data.item)))
    expect(generator.next().value).toEqual(put(setAppStatusAC('succeeded')))
})

test('addTaskSaga unsuccess, with errors from server(resultCode === 1)', () => {
    const generator = addTaskSaga({type: 'TASKS/ADD-TASK-SAGA', title: 'newTitle', todolistId: 'newTodolistId'})

    expect(generator.next().value).toEqual(put(setAppStatusAC('loading')))
    responseAddTask.resultCode = 1
    responseAddTask.messages = ["some error occured, else"]
    expect(generator.next().value).toEqual(call(taskAPI.createTask, 'newTodolistId', 'newTitle'))
    expect(generator.next(responseAddTask).value).toEqual(put(setAppErrorAC(responseAddTask.messages[0])))
    expect(generator.next().value).toEqual(put(setAppStatusAC('failed')))

    responseAddTask.messages = [];

    const generatorWithoutMessage = addTaskSaga({type: 'TASKS/ADD-TASK-SAGA', title: 'newTitle', todolistId: 'newTodolistId'});

    expect(generatorWithoutMessage.next().value).toEqual(put(setAppStatusAC('loading')));
    expect(generatorWithoutMessage.next().value).toEqual(call(taskAPI.createTask, 'newTodolistId', 'newTitle'));
    expect(generatorWithoutMessage.next(responseAddTask).value).toEqual(put(setAppErrorAC("some error occured, else")));
    expect(generatorWithoutMessage.next().value).toEqual(put(setAppStatusAC('failed')));
})

test('addTaskSaga unsuccess, with networkError', () => {
    const generator = addTaskSaga({type: 'TASKS/ADD-TASK-SAGA', title: 'newTitle', todolistId: 'newTodolistId'})
    expect(generator.next().value).toEqual(put(setAppStatusAC('loading')))
    expect(generator.next().value).toEqual(call(taskAPI.createTask, 'newTodolistId', 'newTitle'))
    expect(generator.throw({message: 'some error'}).value).toEqual(put(setAppErrorAC('some error occured, CATCH')))
    expect(generator.next().value).toEqual(put(setAppStatusAC('failed')))
})


test('removeTaskSaga success, without errors from server (resultCode === 0)', () => {
    const generator = removeTaskSaga({type: "TASKS/REMOVE-TASK-SAGA", taskId: '111', todolistId: 'newTodolistId'})

    expect(generator.next().value).toEqual(put(setAppStatusAC("loading")))
    expect(generator.next().value).toEqual(call(
        taskAPI.deleteTask,
        'newTodolistId',
        '111'
    ))
    expect(generator.next(responseDeleteTask).value).toEqual(put(removeTaskAC('111', 'newTodolistId')))
    expect(generator.next().value).toEqual(put(setAppStatusAC('succeeded')))
})

test('removeTaskSaga unsuccess, without errors from server (resultCode === 1)', () => {
    const generatorWithError = removeTaskSaga({type: "TASKS/REMOVE-TASK-SAGA", taskId: '111', todolistId: 'newTodolistId'})
    expect(generatorWithError.next().value).toEqual(put(setAppStatusAC("loading")))
    expect(generatorWithError.next().value).toEqual(call(
        taskAPI.deleteTask,
        'newTodolistId',
        '111'
    ))

    responseAddTask.resultCode=1
    responseAddTask.messages = ["some error occured, else"]
    expect(generatorWithError.next(responseAddTask).value).toEqual(put(setAppErrorAC(responseAddTask.messages[0])))
    expect(generatorWithError.next().value).toEqual(put(setAppStatusAC("failed")))



    const generatorWithoutMessageError = removeTaskSaga({type: "TASKS/REMOVE-TASK-SAGA", taskId: '111', todolistId: 'newTodolistId'})
    responseAddTask.messages = []
    expect(generatorWithoutMessageError.next().value).toEqual(put(setAppStatusAC("loading")))
    expect(generatorWithoutMessageError.next().value).toEqual(call(
        taskAPI.deleteTask,
        'newTodolistId',
        '111'
    ))
    expect(generatorWithoutMessageError.next(responseAddTask).value).toEqual(put(setAppErrorAC("some error occured, else")))
    expect(generatorWithoutMessageError.next().value).toEqual(put(setAppStatusAC("failed")))
})

test('removeTaskSaga unsuccess, with networkError', () => {
    const generator = removeTaskSaga({type: "TASKS/REMOVE-TASK-SAGA", taskId: '111', todolistId: 'newTodolistId'})
    expect(generator.next().value).toEqual(put(setAppStatusAC("loading")))
    expect(generator.next().value).toEqual(call(
        taskAPI.deleteTask,
        'newTodolistId',
        '111'
    ))
    expect(generator.throw({ message: "some error occured, CATCH" }).value).toEqual(put(setAppErrorAC("some error occured, CATCH")))
    expect(generator.next().value).toEqual(put(setAppStatusAC("failed")))
})