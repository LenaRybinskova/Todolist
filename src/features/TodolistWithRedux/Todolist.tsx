import React from "react";
import { AddItemForm } from "components/AddItemsForm/AddItemForm";
import { EditableSpan } from "components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import { Delete } from "@mui/icons-material";
import ButtonContainer from "../../components/ButtonWithRedux/ButtonContainer";
import TaskWithRedux from "../../components/Task/TaskWithRedux";
import { UseTodolist } from "./hooks/useTodolist";
import { TodolistDomainType } from "features/todolistSlice";
import {useAddTaskMutation, useGetTasksQuery} from 'api/tasks.api';
import {TaskStatuses} from 'api/todolists-api';

type PropsType = {
  todolist: TodolistDomainType;
  demo?: boolean;
};

export const Todolist = React.memo(({ todolist, demo }: PropsType) => {
  const {
    title,
    changeTodolistTitle,
    removeTodolist,
  /*  addTask,*/
    /*tasks,*/
    onAllClickHandler,
    onActiveClickHandler,
    onCompletedClickHandler,
    id,
    filter,
  } = UseTodolist({ ...todolist }, demo);

  const {data} = useGetTasksQuery(todolist.id)
  const [addTask ]=useAddTaskMutation()

  const addTaskHandler=(newTitle:string)=>{
    addTask( {todolistId:todolist.id, title:newTitle})
  }

  let tasksForTodolist = data?.items
  if (todolist.filter === 'active') {
    tasksForTodolist = tasksForTodolist?.filter((task:any) => task.status === TaskStatuses.New)
  }
  if (todolist.filter === 'completed') {
    tasksForTodolist = tasksForTodolist?.filter((task:any) => task.status === TaskStatuses.Completed)
  }


  return (
    <div>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskHandler} disabled={todolist.entityStatus === "loading"} />
      <div>
        {tasksForTodolist?.map((t) => (
          <TaskWithRedux key={t.id} task={t} todolistId={id} />
        ))}
      </div>
      <div>
        <ButtonContainer variant={filter === "all" ? "outlined" : "text"} onClick={onAllClickHandler} color={"inherit"}>
          All
        </ButtonContainer>
        <ButtonContainer
          variant={filter === "active" ? "outlined" : "text"}
          onClick={onActiveClickHandler}
          color={"primary"}>
          Active
        </ButtonContainer>
        <ButtonContainer
          variant={filter === "completed" ? "outlined" : "text"}
          onClick={onCompletedClickHandler}
          color={"secondary"}>
          Completed
        </ButtonContainer>
      </div>
    </div>
  );
});
