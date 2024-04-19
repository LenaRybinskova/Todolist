import {useFormik} from 'formik';
import {Button, Checkbox, FormControlLabel, FormGroup, FormLabel, Grid, TextField} from '@mui/material';
import {FormControl} from '@material-ui/core';


type ErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
export const Login = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: ErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length > 15) {
                errors.password = 'Must be 15 characters or less';
            }
            return errors
        },

        onSubmit: values => {
            alert(JSON.stringify(values));
        },
    });
    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <FormLabel>
                            <p>
                                To log in get registered
                                <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
                                    here
                                </a>
                            </p>
                            <p>or use common test account credentials:</p>
                            <p>Email: free@samuraijs.com</p>
                            <p>Password: free</p>
                        </FormLabel>
                        <FormGroup>
                            <TextField
                                label="email"
                                margin="normal"
                                {...formik.getFieldProps('email')}/>
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
                                {...formik.getFieldProps('password')}/>
                            {formik.touched.password && formik.errors.password &&
                                <div style={{color: 'red'}}>{formik.errors.password}</div>}

                            <FormControlLabel label={'Remember me'} control={
                                <Checkbox
                                    {...formik.getFieldProps('rememberMe')}
                                    //обяз чекет указываем сами дополнительно, его нет в getFieldProps
                                    checked={formik.values.rememberMe}/>}/>
                            <Button type={'submit'} variant={'contained'} color={'primary'}>
                                Login
                            </Button>
                        </FormGroup>
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    );
}