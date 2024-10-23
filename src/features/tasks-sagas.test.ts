import {addTaskAC} from './tasks-reducer';
import {taskAPI, TaskType} from '../api/tasks-api';
import {ResponseType} from '../api/todolists-api';
import {setAppErrorAC, setAppStatusAC} from '../AppWithRedux/app-reducer';
import {call, put} from 'redux-saga/effects';
import {addTaskSaga} from '../../src/features/tasks-sagas';


let responseAddTask: ResponseType<{ item: TaskType }>
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