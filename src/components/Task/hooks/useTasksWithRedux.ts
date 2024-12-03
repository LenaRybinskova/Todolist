import { ChangeEvent } from "react";
import { removeTaskTC, updateTaskTC } from "features/tasksSlice";
import { TaskWithReduxType } from "../TaskWithRedux";
import {TaskStatuses, UpdateTaskModelType} from 'api/todolists-api';
import { useDispatch } from "react-redux";
import {useDeleteTaskMutation, useUpdateTaskMutation} from 'api/tasks.api';

export const useTasksWithRedux = ({ task, todolistId }: TaskWithReduxType) => {
  const dispatch = useDispatch(); // useAppDispatch() не работает
  const [updateTask]=useUpdateTaskMutation()


  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    let newIsDoneValue = e.currentTarget.checked;
    let status = newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New;
    dispatch(updateTaskTC(todolistId, task.id, { status: status }));
  };
  const onTitleChangeHandler = (newValue: string) => {
/*    dispatch(updateTaskTC(todolistId, task.id, { title: newValue }));*/

    const model = {
      title: newValue,
      status: task.status,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      order: task.order,
    };
    updateTask({todolistId: todolistId, taskId: task.id,model });
  };

  //const onClickHandler = () => dispatch(removeTaskTC(task.id, todolistId));



  return { onChangeHandler, onTitleChangeHandler,/* onClickHandler*/ };
};
