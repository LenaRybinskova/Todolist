import {createTodolist, TodolistDomainType, todolistSlice} from 'features/TodolistsList/model/todolists/todolistSlice';
import {tasksSlice, TasksStateType} from 'features/TodolistsList/model/tasks/tasksSlice';

test('ids should be equals', () => {
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

    const startTasksState: TasksStateType = {};
    const startTodolistsState: TodolistDomainType[] = [];

    const endTasksState = tasksSlice(startTasksState, action);
    const endTodolistsState = todolistSlice(startTodolistsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
});
