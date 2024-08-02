import { addTask, getTaskTC, tasksActions, tasksReducer, TasksStateType } from "features/tasksReducer";
import { TaskPriorities, TaskStatuses, TaskType, TodolistType } from "api/todolists-api";
import { todolistId1, todolistId2 } from "AppWithRedux/id-utils";
import { todolistsActions } from "features/todolistSlice";

let startState: TasksStateType;

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: "1",
        title: "CSS",
        status: TaskStatuses.New,
        description: "",
        todoListId: todolistId1,
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        addedDate: "",
      },
      {
        id: "2",
        title: "JS",
        status: TaskStatuses.Completed,
        description: "",
        todoListId: todolistId1,
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        addedDate: "",
      },
      {
        id: "3",
        title: "React",
        status: TaskStatuses.New,
        description: "",
        todoListId: todolistId1,
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        addedDate: "",
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "bread",
        status: TaskStatuses.New,
        description: "",
        todoListId: todolistId1,
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        addedDate: "",
      },
      {
        id: "2",
        title: "milk",
        status: TaskStatuses.Completed,
        description: "",
        todoListId: todolistId1,
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        addedDate: "",
      },
      {
        id: "3",
        title: "tea",
        status: TaskStatuses.New,
        description: "",
        todoListId: todolistId1,
        order: 0,
        priority: TaskPriorities.Low,
        startDate: "",
        deadline: "",
        addedDate: "",
      },
    ],
  };
});

test("correct set tasks to todolist", () => {
  type ActionType = Omit<ReturnType<typeof getTaskTC.fulfilled>, "meta">;

  const action: ActionType = {
    type: "tasks/getTasks/fulfilled",
    payload: { tasks: startState["todolistId1"], todolistId: "todolistId1" },
  };
  // еще вариант написания экшен
  /*  const action = getTaskTC.fulfilled(
          { tasks: startState["todolistId1"], todolistId: "todolistId1" },
          "requestId",
          "todolistId1",
        );*/

  const endState = tasksReducer(
    {
      todolistId1: [],
      todolistId2: [],
    },
    action,
  );

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(0);
});

test("correct task should be deleted from correct array", () => {
  const action = tasksActions.removeTask({ taskId: "2", todolistId: "todolistId2" });
  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(2);
  expect(endState["todolistId2"].every((t) => t.id != "2")).toBeTruthy();
  //expect(endState["todolistId2"][0].id).toBe("1");
  //expect(endState["todolistId2"][1].id).toBe("3");
});

test("correct task should be added to correct array", () => {
  const newTask: TaskType = {
    id: "newTaskId",
    title: "juce",
    description: "",
    todoListId: "todolistId2",
    order: 0,
    status: TaskStatuses.New,
    priority: TaskPriorities.Low,
    startDate: "",
    deadline: "",
    addedDate: "",
  };
  type Action = Omit<ReturnType<typeof addTask.fulfilled>, "meta">;
  const action: Action = {
    type: addTask.fulfilled.type,
    payload: { task: newTask },
  };

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(4);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("juce");
  expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});

test("status of specified task should be changed", () => {
  const action = tasksActions.updateTask({
    todolistId: "todolistId2",
    taskId: "2",
    model: { status: TaskStatuses.New },
  });

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
  expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});

test("title of specified task should be changed", () => {
  const action = tasksActions.updateTask({ todolistId: "todolistId2", taskId: "2", model: { title: "Milkyway" } });
  const endState = tasksReducer(startState, action);

  expect(endState["todolistId2"][1].title).toBe("Milkyway");
  expect(endState["todolistId1"][1].title).toBe("JS");
});

test("new property with new array should be added when new todolist is added", () => {
  const newTodolist: TodolistType = {
    id: "newTodolistId",
    addedDate: "",
    order: 0,
    title: "newTodolistTitle",
  };

  const action = todolistsActions.createTodolist({ todolist: newTodolist });
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newKey = keys.find((k) => k != "todolistId1" && k != "todolistId2");
  if (!newKey) {
    throw Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newKey]).toStrictEqual([]);
});

test("propertry with todolistId should be deleted", () => {
  const action = todolistsActions.removeTodolist({ todolistId: "todolistId2" });
  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).toBeUndefined();
});
