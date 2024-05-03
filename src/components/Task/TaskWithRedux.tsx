import React, { memo } from "react";
import { Checkbox } from "@mui/material";
import { EditableSpan } from "../EditableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import { Delete } from "@mui/icons-material";
import { useTasksWithRedux } from "./hooks/useTasksWithRedux";
import { TaskPriorities, TaskStatuses } from "api/todolists-api";

type TaskType = {
  id: string;
  title: string;
  description: string | null;
  todoListId: string;
  order: number;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string | null;
  deadline: string | null;
  addedDate: string;
};
export type TaskWithReduxType = {
  task: TaskType;
  todolistId: string;
};

const TaskWithRedux = memo((props: TaskWithReduxType) => {
  const { onChangeHandler, onTitleChangeHandler, onClickHandler } = useTasksWithRedux({ ...props });

  return (
    <div className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
      <Checkbox checked={props.task.status === TaskStatuses.Completed} color="primary" onChange={onChangeHandler} />

      <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} />
      <IconButton onClick={onClickHandler}>
        <Delete />
      </IconButton>
    </div>
  );
});

export default TaskWithRedux;
