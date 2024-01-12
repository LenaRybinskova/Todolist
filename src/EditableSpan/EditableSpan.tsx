import React from 'react';
import {TextField} from "@mui/material";
import {useEditableSpan} from './hooks/useEditableSpan';

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const  EditableSpan=React.memo((props: EditableSpanPropsType) =>{
   /* console.log("EditableSpan")
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }*/
const {editMode,title,changeTitle,activateViewMode,activateEditMode}=useEditableSpan(props.value,props.onChange)

    return editMode
        ?    <TextField variant="outlined"
                        value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
})
