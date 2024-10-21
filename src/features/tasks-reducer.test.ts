import {
    addTaskAC,
    removeTaskAC,
    tasksReducer,
    TasksStateType, updateTaskAC
} from './tasks-reducer';
import {createTodolistAC, removeTodolistAC} from './todolists-reducer';
import {TaskPriorities, TaskStatuses, TaskType} from '../api/tasks-api';
import { TodolistType} from '../api/todolists-api';
import {todolistId1, todolistId2} from '../AppWithRedux/id-utils';

let startState: TasksStateType


beforeEach(() => {
    startState = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New,
                description: '',
                todoListId: todolistId1,
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: ''},
            { id: "2", title: "JS", status: TaskStatuses.Completed,
                description: '',
                todoListId: todolistId1,
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '' },
            { id: "3", title: "React", status: TaskStatuses.New,
                description: '',
                todoListId: todolistId1,
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '' }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New,
                description: '',
                todoListId: todolistId1,
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '' },
            { id: "2", title: "milk", status: TaskStatuses.Completed,
                description: '',
                todoListId: todolistId1,
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '' },
            { id: "3", title: "tea", status: TaskStatuses.New,
                description: '',
                todoListId: todolistId1,
                order: 0,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                addedDate: '' }
        ]
    };

})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("2", "todolistId2");
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
    //expect(endState["todolistId2"][0].id).toBe("1");
    //expect(endState["todolistId2"][1].id).toBe("3");

});

test('correct task should be added to correct array', () => {

const newTask:TaskType = {
    id: "newTaskId",
    title: "juce",
    description: "",
    todoListId: "todolistId2",
    order: 0,
    status: TaskStatuses.New,
    priority: TaskPriorities.Low,
    startDate: "",
    deadline: "",
    addedDate: ""
}
    const action = addTaskAC(newTask);
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {

    const action = updateTaskAC("todolistId2","2", {status:TaskStatuses.New} );

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});

test('title of specified task should be changed', () => {

    const action = updateTaskAC("todolistId2", "2", {title:"Milkyway"} );
    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("Milkyway");
    expect(endState["todolistId1"][1].title).toBe("JS");
});

test('new property with new array should be added when new todolist is added', () => {

    const newTodolist:TodolistType = {
        id: "newTodolistId",
        addedDate:"",
        order:0,
        title: "newTodolistTitle"
    }

    const action = createTodolistAC(newTodolist);
    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toStrictEqual([]);
});

test('propertry with todolistId should be deleted', () => {

    const action = removeTodolistAC("todolistId2");
    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).toBeUndefined();
});




