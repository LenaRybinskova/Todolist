import React from "react";
import { TextField } from "@mui/material";
import { useEditableSpan } from "common/components/EditableSpan/hooks/useEditableSpan";

type EditableSpanPropsType = {
  value: string;
  onChange: (newValue: string) => void;
};

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  const { editMode, title, changeTitle, activateViewMode, activateEditMode } = useEditableSpan(
    props.value,
    props.onChange,
  );


  return editMode ? (
    <TextField variant="outlined" value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />
  ) : (
    <span  style={{cursor:"pointer"}} onDoubleClick={activateEditMode}>{props.value}</span>
  );
});
