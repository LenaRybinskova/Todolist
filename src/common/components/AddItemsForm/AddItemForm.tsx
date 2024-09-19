import IconButton from '@mui/material/IconButton/IconButton';
import TextField from '@mui/material/TextField/TextField';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {AddBox} from '@mui/icons-material';
import {unwrapResult} from '@reduxjs/toolkit';

export type AddItemFormPropsType = {
    addItem: (title: string) => Promise<any>,
    disabled?: boolean
};

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const addItemHandler = () => {
        if (title.trim() !== '') {
      props.addItem(title)
                .then(unwrapResult)
                .then(() => {
                    setTitle('');
                })
                .catch(err => {
                    console.log("AddItemForm catch",err )
                    if(err?.resultCode){ // err не нативная
                        setError((err?.messages[0]))
                    }
                })

        } else {
            setError('Title is required');
        }
    };

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    };

    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (event.charCode === 13) {
            addItemHandler();
        }
    };

    return (
        <div style={{display: 'flex', marginBottom: '10px'}}>
            <TextField
                variant="outlined"
                disabled={props.disabled}
                error={!!error}
                value={title}
                onChange={onChangeInputHandler}
                onKeyPress={onKeyPressHandler}
                /*        label="title"*/
                helperText={error}
            />
            <IconButton color="primary" onClick={addItemHandler} disabled={props.disabled}>
                <AddBox/>
            </IconButton>
        </div>
    );
});
