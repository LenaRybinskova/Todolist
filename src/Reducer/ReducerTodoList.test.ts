import {v1} from 'uuid';
import {
    AddTodolistAC, ChangeFilterAC,
    ChangeTodolistTitleAC,
    ReducerTodolist,
    RemoveTodolistAC,
} from './ReduserTodolist';
import {TodolistType} from '../App';

let IDTodolist1: string;
let IDTodolist2: string;
let startState: TodolistType[]

beforeEach(() => {
    IDTodolist1 = v1()
    IDTodolist2 = v1()

    startState = [
        {id: IDTodolist1, title: 'What to learn', filter: 'all'},
        {id: IDTodolist2, title: 'What to buy', filter: 'all'}
    ]
})

test('should be add new todolist', () => {

    // стартовый стейт в beforeEach
    const IDTodolist3 = v1()

    const endState = ReducerTodolist(startState, AddTodolistAC('new title', IDTodolist3))

    expect(endState.length).toBe(3)
    expect(endState[2].id).toBe(IDTodolist3)
    expect(endState[2].title).toBe('new title')
    expect(endState).toEqual([
        {id: IDTodolist1, title: 'What to learn', filter: 'all'},
        {id: IDTodolist2, title: 'What to buy', filter: 'all'},
        {id: IDTodolist3, title: 'new title', filter: 'all'}
    ])

})

test('should be remove one todolist', () => {

    // стартовый стейт в beforeEach

    const endState: TodolistType[] = ReducerTodolist(startState, RemoveTodolistAC(IDTodolist1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(IDTodolist2)
    expect(endState[0].title).toBe('What to buy')
    expect(endState).toEqual([
        {id: IDTodolist2, title: 'What to buy', filter: 'all'}
    ])

})

test('should change title todolist', () => {

    // стартовый стейт в beforeEach

    const endState: TodolistType[] = ReducerTodolist(startState, ChangeTodolistTitleAC(IDTodolist1, 'new new TITLE'))

    expect(endState.length).toBe(2)
    expect(endState[0].id).toBe(IDTodolist1)
    expect(endState[0].title).toBe('new new TITLE')
    expect(endState).toEqual([
        {id: IDTodolist1, title: 'new new TITLE', filter: 'all'},
        {id: IDTodolist2, title: 'What to buy', filter: 'all'}
    ])

})

test('should change filter todolist', () => {

    // стартовый стейт в beforeEach

    const endState: TodolistType[] = ReducerTodolist(startState, ChangeFilterAC('active', IDTodolist1))

    expect(endState.length).toBe(2)
    expect(endState[0].id).toBe(IDTodolist1)
    expect(endState[0].filter).toBe('active')
    expect(endState).toEqual([
        {id: IDTodolist1, title: 'What to learn', filter: 'active'},
        {id: IDTodolist2, title: 'What to buy', filter: 'all'}
    ])

})