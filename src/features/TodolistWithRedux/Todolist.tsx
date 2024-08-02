import React from "react";
import { AddItemForm } from "components/AddItemsForm/AddItemForm";
import { EditableSpan } from "components/EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import { Delete } from "@mui/icons-material";
import ButtonContainer from "../../components/ButtonWithRedux/ButtonContainer";
import TaskWithRedux from "../../components/Task/TaskWithRedux";
import { UseTodolist } from "./hooks/useTodolist";
import { TodolistDomainType } from "features/todolistSlice";

type PropsType = {
  todolist: TodolistDomainType;
  demo?: boolean;
};

export const Todolist = React.memo(({ todolist, demo }: PropsType) => {
  const {
    title,
    changeTodolistTitle,
    removeTodolist,
    addTaskCallback,
    tasks,
    onAllClickHandler,
    onActiveClickHandler,
    onCompletedClickHandler,
    id,
    filter,
  } = UseTodolist({ ...todolist }, demo);

  return (
    <div>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitle} />
        <IconButton onClick={removeTodolist}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === "loading"} />
      <div>
        {tasks.map((t) => (
          <TaskWithRedux key={t.id} task={t} todolistId={id} />
        ))}
      </div>
      <div style={{ position: "absolute", bottom: "15px", left: "20px" }}>
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
