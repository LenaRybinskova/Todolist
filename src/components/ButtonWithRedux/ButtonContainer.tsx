import React,{memo} from 'react';
import {ButtonProps} from '@mui/material';
import {Button} from '@mui/material';

export type ButtonContainerType = ButtonProps & {
    children: React.ReactNode
}

const ButtonContainer = memo((props: ButtonContainerType) => {
    const {children, ...rest} = props
        console.log('ButtonButtonButtonButtonButtonButtonButtonButton', children)
    return <Button {...rest}>{children}</Button>
})
export default ButtonContainer