import { ChangeEvent } from "react";
import { removeTask, updateTask } from "features/TodolistsList/model/tasks/tasksSlice";
import { TaskWithReduxType } from "common/components/Task/Task";
import { useDispatch } from "react-redux";
import { TaskStatuses } from "common/enums/enums";

export const useTasksWithRedux = ({ task, todolistId }: TaskWithReduxType) => {
  const dispatch = useDispatch(); // useAppDispatch() не работает

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    let status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New;
    dispatch(updateTask({ todolistId, taskId: task.id, model: { status: status } }));
  };
  const onTitleChangeHandler = (newValue: string) => {
    dispatch(updateTask({ todolistId, taskId: task.id, model: { title: newValue } }));
  };

  const onClickHandler = () => dispatch(removeTask({ taskId: task.id, todolistId }));

  return { onChangeHandler, onTitleChangeHandler, onClickHandler };
};
