import {
    changeTitleTodolist,
    createTodolist,
    removeTodolist,
    TodolistDomainType,
    todolistsActions,
    todolistSlice
} from 'features/TodolistsList/model/todolists/todolistSlice';


let startState: TodolistDomainType[];

beforeEach(() => {
    startState = [
        {id: 'todolistId1', title: 'What to learn', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'},
        {id: 'todolistId2', title: 'What to buy', filter: 'all', order: 0, addedDate: '', entityStatus: 'idle'}]
});

test('A new todolist should be correctly added to the todolists array', () => {
    type Action = Omit<ReturnType<typeof createTodolist.fulfilled>, 'meta'>;

    const action: Action = {
        type: createTodolist.fulfilled.type,
        payload: {
            todolist: {
                id: 'newTodolistId',
                addedDate: '',
                order: 0,
                title: 'newTodolistTitle',
            }
        }
    };

    const endState = todolistSlice(startState, action)

    expect(endState[0].id).toBe('newTodolistId');
    expect(endState[0].filter).toBe('all');
    expect(endState[0].entityStatus).toBe('idle');
});

test('The todolist should be correctly removed from the todolists array', () => {
    type Action = Omit<ReturnType<typeof removeTodolist.fulfilled>, 'meta'>;

    const action: Action = {
        type: removeTodolist.fulfilled.type,
        payload: {
            todolistId: 'todolistId1'
        }
    };

    const endState = todolistSlice(startState, action)

    expect(endState[0].id).toBe('todolistId2');
    expect(endState.length).toBe(1);
});

test('The todolist title should be updated', () => {
    type Action = Omit<ReturnType<typeof changeTitleTodolist.fulfilled>, 'meta'>;

    const action: Action = {
        type: changeTitleTodolist.fulfilled.type,
        payload: {
            todolistId: 'todolistId1',
            title: 'UpdatedTitle'
        }
    };

    const endState = todolistSlice(startState, action)

    expect(endState[0].title).toBe('UpdatedTitle');
    expect(endState[0].id).toBe('todolistId1');
    expect(endState[1].title).toBe('What to buy');
});

test('The todolist filter should be updated', () => {
    type Action = Omit<ReturnType<typeof todolistsActions.updateTodolist>, 'meta'>;

    const action: Action = {
        type: todolistsActions.updateTodolist.type,
        payload: {
            todolistId: 'todolistId1',
            model: {filter: 'active'}
        }
    };

    const endState = todolistSlice(startState, action)

    expect(endState[0].filter).toBe('active');
    expect(endState[1].filter).toBe('all');
});

test('The todolist Entity Status should be updated', () => {
    type Action = Omit<ReturnType<typeof todolistsActions.changeTodolistEntityStatus>, 'meta'>;

    const action: Action = {
        type: todolistsActions.changeTodolistEntityStatus.type,
        payload: {
            id: 'todolistId1',
            entityStatus: 'loading',
        }
    };

    const endState = todolistSlice(startState, action)

    expect(endState[0].entityStatus).toBe('loading');
    expect(endState[1].entityStatus).toBe('idle');
});