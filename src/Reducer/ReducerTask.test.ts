import {v1} from 'uuid';
import {TasksStateType} from '../App';
import {
    AddEmptyTaskAC,
    AddTaskAC,
    ChangeStatusTaskAC,
    ChangeTaskTitleAC,
    ReducerTask,
    RemoveTaskAC
} from './ReducerTask';

let IDTodolist1: string;
let IDTodolist2: string;

let IDTask1_1: string;
let IDTask1_2: string;
let IDTask2_1: string;
let IDTask2_2: string;


let startState: TasksStateType;

beforeEach(() => {
    IDTodolist1 = v1()
    IDTodolist2 = v1()

    IDTask1_1 = v1()
    IDTask1_2 = v1()
    IDTask2_1 = v1()
    IDTask2_2 = v1()

    startState = {
        [IDTodolist1]: [
            {id: IDTask1_1, title: 'HTML&CSS', isDone: true},
            {id: IDTask1_2, title: 'JS', isDone: true}
        ],
        [IDTodolist2]: [
            {id: IDTask2_1, title: 'Milk', isDone: true},
            {id: IDTask2_2, title: 'React Book', isDone: true}
        ]
    }
})

test('should be add new task in TL', () => {
    let IDTask1_3 = v1()

    const endState = ReducerTask(startState, AddTaskAC('new Task', IDTodolist1))

    expect(endState[IDTodolist1].length).toBe(3)
    expect(endState[IDTodolist1][2].title).toBe('new Task')
   /* expect(endState).toEqual({
        [IDTodolist1]: [
            {id: IDTask1_1, title: 'HTML&CSS', isDone: true},
            {id: IDTask1_2, title: 'JS', isDone: true},
            {id: IDTask1_3, title: 'new Task', isDone: false}
        ],
        [IDTodolist2]: [
            {id: IDTask2_1, title: 'Milk', isDone: true},
            {id: IDTask2_2, title: 'React Book', isDone: true}
        ]
    })*/
})

test('should be remove task from TL', () => {

    const endState = ReducerTask(startState, RemoveTaskAC(IDTask1_1, IDTodolist1));

    expect(endState[IDTodolist1].length).toBe(1)
    expect(endState[IDTodolist1][0].title).toBe('JS')
})

test('should be change task status', () => {

    const endState = ReducerTask(startState, ChangeStatusTaskAC(IDTask1_1,false,IDTodolist1));

    expect(endState[IDTodolist1].length).toBe(2)
    expect(endState[IDTodolist1][0].isDone).toBe(false)
    // как лучше делать проверку, через find или просто по индексу дойти endState[IDTodolist1][0].isDone ?
    expect(endState[IDTodolist1].find(t=>t.id===IDTask1_1)).toEqual({id: IDTask1_1, isDone: false, title: "HTML&CSS"})
})

test('should be change task title', () => {

    const endState = ReducerTask(startState, ChangeTaskTitleAC(IDTask1_1, "new title",IDTodolist1 ));

    expect(endState[IDTodolist1].length).toBe(2)
    expect(endState[IDTodolist1][0].title).toBe('new title')
    expect(endState[IDTodolist1].find(t=>t.id===IDTask1_1)).toEqual({id: IDTask1_1, title: 'new title', isDone: true})
})

test('should be create empty array of tasks for new TL', () => {

    let IDTodolist3=v1()
    const endState = ReducerTask(startState, AddEmptyTaskAC(IDTodolist3));

    expect(endState[IDTodolist3].length).toBe(0)
    expect(endState[IDTodolist3]).toEqual([])

})