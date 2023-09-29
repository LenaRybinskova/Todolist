import React from 'react';
import {Button} from '@mui/material';

export type ButtonWithReduxType ={
    variant:'text' | 'outlined' | 'contained'
    onClick:()=>void
    color:'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
    name:string
}

export const ButtonWithRedux = React.memo((props:ButtonWithReduxType) => {
    console.log("ButtonWithRedux")
    return (
        <Button variant={props.variant}
                onClick={props.onClick}
                color={props.color}
        >{props.name}
        </Button>
    );
})

