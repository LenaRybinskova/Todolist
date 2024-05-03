import { ChangeEvent, useState } from "react";

export const useEditableSpan = (value: string, onChange: (newValue: string) => void) => {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState(value);

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(value);
  };
  const activateViewMode = () => {
    setEditMode(false);
    onChange(title);
  };
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return { editMode, title, changeTitle, activateViewMode, activateEditMode };
};
