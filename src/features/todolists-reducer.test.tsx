import { FilterValuesType, TodolistDomainType, todolistsActions, todolistsReducer } from "./todolists-reducer";
import { v1 } from "uuid";

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [];

beforeEach(() => {
  todolistId1 = v1();
  todolistId2 = v1();
  startState = [
    { id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle" },
    { id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: "idle" },
  ];
});

test("correct todolist should be removed", () => {
  const endState = todolistsReducer(startState, todolistsActions.removeTodolist({ todolistId: todolistId1 }));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todolistId2);
});

test("correct todolist should be added", () => {
  let newTodolistTitle = { title: "New Todolist", id: "New Todolist Id", addedDate: "", order: 0 };

  const endState = todolistsReducer(startState, todolistsActions.createTodolist({ todolist: newTodolistTitle }));

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolistTitle.title);
  expect(endState[0].filter).toBe("all");
  expect(endState[0].id).toBeDefined();
});

test("correct todolist should change its name", () => {
  let newTodolistTitle = "New Todolist";

  const action = todolistsActions.updateTodolist({ todolistId: todolistId2, model: { title: newTodolistTitle } });

  const endState = todolistsReducer(startState, action);

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
  let newFilter: FilterValuesType = "completed";

  const action = todolistsActions.updateTodolist({ todolistId: todolistId2, model: { filter: newFilter } });
  const endState = todolistsReducer(startState, action);

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});
