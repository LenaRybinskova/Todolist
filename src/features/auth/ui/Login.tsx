import {Checkbox, FormControl, FormControlLabel, TextField} from '@material-ui/core';
import {Navigate} from 'react-router-dom';
import Grid from '@mui/material/Grid/Grid';
import FormGroup from '@mui/material/FormGroup/FormGroup';
import {FormLabel} from '@mui/material';
import Button from '@material-ui/core/Button';
import {UseLogin} from 'features/auth/lib/useLogin';


export const Login = () => {

    const {isLoggedIn, formik} = UseLogin()

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
                            {/*                            <p>lenarybinskova</p>
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
