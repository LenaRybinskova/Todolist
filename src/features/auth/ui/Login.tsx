import {useFormik} from 'formik';
import {Checkbox, FormControl, FormControlLabel, TextField} from '@material-ui/core';
import {login, selectIsLoggedIn} from 'features/auth/model/authSlice';
import {useAppSelector} from 'app/store';
import {Navigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import Grid from '@mui/material/Grid/Grid';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import {FormLabel} from '@mui/material';
import Button from '@material-ui/core/Button';

type ErrorType = {
    email?: string;
    password?: string;
};

export const Login = () => {
    const dispatch = useDispatch(); // useAppDispatch не работает
    const isLoggedIn = useAppSelector(selectIsLoggedIn);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
        //validate фукн сраб при каждом впечатывании в инпуты
        validate: (values) => {
            const errors: ErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length > 15) {
                errors.password = 'Must be 15 characters or less';
            }
            return errors;
        },
        // onSubmit не сраб, если в объекте error что то есть
        // onSubmit когда сработает, все поля инпутов запишет в объект touched и выведутся все ошибки если они есть
        onSubmit: (values) => {
            dispatch(login(values));
            formik.resetForm(); //зачистка формы после сабмит до initialValues
        },
    });

    //если залогиненты -редирект на главную
    if (isLoggedIn) {
        return <Navigate to={'/'}/>;
    }

    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
{/*                            <p>lenarybinskova@gmail.com</p>
                            <p>lenarybinskova</p>*/}
                        </FormLabel>
                        <FormGroup>
                            <TextField label="email" margin="normal"
                                       style={{width: '300px'}} {...formik.getFieldProps('email')} />
                            {formik.touched.email && formik.errors.email &&
                                <div style={{color: 'red'}}>{formik.errors.email}</div>}
                            <TextField
                                type="password"
                                label="Password"
                                margin="normal"
                                /* name="password"
                                                                                 onBlur={formik.handleBlur}
                                                                                 onChange={formik.handleChange}
                                                                                 value={formik.values.password}*/
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <div style={{color: 'red'}}>{formik.errors.password}</div>
                            )}

                            <FormControlLabel
                                label={'Remember me'}
                                control={
                                    <Checkbox
                                        {...formik.getFieldProps('rememberMe')}
                                        //обяз чекет указываем сами дополнительно, его нет в getFieldProps
                                        checked={formik.values.rememberMe}
                                    />
                                }
                            />
                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    );
};
