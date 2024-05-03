import IconButton from "@mui/material/IconButton/IconButton";
import TextField from "@mui/material/TextField/TextField";
import React from "react";
import { AddBox } from "@mui/icons-material";
import { useAddItemForm } from "./hooks/useAddItemForm";

export type AddItemFormPropsType = {
  addItem: (title: string) => void;
  disabled?: boolean;
};

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
  const { title, onChangeHandler, onKeyPressHandler, error, addItem } = useAddItemForm(props.addItem);

  return (
    <div>
      <TextField
        variant="outlined"
        disabled={props.disabled}
        error={!!error}
        value={title}
        onChange={onChangeHandler}
        onKeyPress={onKeyPressHandler}
        label="Title"
        helperText={error}
      />
      <IconButton color="primary" onClick={addItem} disabled={props.disabled}>
        <AddBox />
      </IconButton>
    </div>
  );
});
