import { ChangeEvent } from "react";
import { removeTask, updateTask } from "features/TodolistsList/model/tasks/tasksSlice";
import { TaskWithReduxType } from "common/components/Task/Task";
import { useDispatch } from "react-redux";
import { TaskStatuses } from "common/enums/enums";

export const useTasks = ({ task, todolistId }: TaskWithReduxType) => {
  const dispatch = useDispatch(); // useAppDispatch() не работает

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = event.currentTarget.checked;
    let status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New;
    dispatch(updateTask({ todolistId, taskId: task.id, model: { status: status } }));
  };
  const onTitleChangeHandler = (newValue: string) => {
    dispatch(updateTask({ todolistId, taskId: task.id, model: { title: newValue } }));
  };

  const onClickHandler = () => dispatch(removeTask({ taskId: task.id, todolistId }));

  return { onChangeHandler, onTitleChangeHandler, onClickHandler };
};
