import React from 'react';
import {TextField} from '@mui/material';
import {useEditableSpan} from 'common/components/EditableSpan/hooks/useEditableSpan';

type Props = {
    value: string;
    onChange: (newValue: string) => void;
};

export const EditableSpan = React.memo(({value, onChange}: Props) => {

    const {editMode, title, changeTitleHandler, activateViewModeHandler, activateEditModeHandler} = useEditableSpan(
        value,
        onChange,
    );


    return editMode ? (
        <TextField variant="outlined" value={title} onChange={changeTitleHandler} autoFocus
                   onBlur={activateViewModeHandler}/>
    ) : (
        <span style={{cursor: 'pointer'}} onDoubleClick={activateEditModeHandler}>{value}</span>
    );
});
