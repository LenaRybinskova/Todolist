import { ChangeEvent, KeyboardEvent, useState } from "react";

export const useAddItemForm = (onAddItem: (title: string) => void) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);

  const addItem = () => {
    if (title.trim() !== "") {
      onAddItem(title);
      setTitle("");
    } else {
      setError("Title is required");
    }
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (event.charCode === 13) {
      addItem();
    }
  };

  return { title, onChangeHandler, onKeyPressHandler, error, addItem };
};
