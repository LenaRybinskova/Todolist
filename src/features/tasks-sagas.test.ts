import {
  addTaskAC,
  getTasksAC,
  removeTaskAC,
  updateTaskAC,
  UpdateTaskDomainType
} from "./tasks-reducer";
import {
  GetTaskResponseType,
  taskAPI,
  TaskType,
  UpdateTaskModelType
} from "../api/tasks-api";
import { ResponseType } from "../api/todolists-api";
import { setAppStatusAC } from "../AppWithRedux/app-reducer";
import {
  handleServerAppError,
  handleServerNetworkError
} from "../utils/error-utils";
import { AxiosResponse } from "axios";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { taskSelector } from "./task-selector";

