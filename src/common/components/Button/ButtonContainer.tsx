import React, {memo} from 'react';
import {Button, ButtonProps} from '@mui/material';

export type ButtonContainerType = ButtonProps & {
    children: React.ReactNode;
};

const ButtonContainer = memo((props: ButtonContainerType) => {
    const {children, ...rest} = props;
    return <Button {...rest}>{children}</Button>;
});
export default ButtonContainer;
