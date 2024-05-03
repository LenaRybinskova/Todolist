import { TodolistDomainType, todolistsActions, todolistSlice } from "features/todolistSlice";
import { tasksSlice, TasksStateType } from "features/tasksSlice";
import { TodolistType } from "api/todolists-api";

test("ids should be equals", () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: Array<TodolistDomainType> = [];

  const newTodolist: TodolistType = {
    id: "newTodolistId",
    addedDate: "",
    order: 0,
    title: "newTodolistTitle",
  };
  const action = todolistsActions.createTodolist({ todolist: newTodolist });
  const endTasksState = tasksSlice(startTasksState, action);
  const endTodolistsState = todolistSlice(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolist.id);
  expect(idFromTodolists).toBe(action.payload.todolist.id);
});
