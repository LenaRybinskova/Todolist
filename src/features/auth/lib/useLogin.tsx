import {useDispatch} from 'react-redux';
import {useAppSelector} from 'app/store';
import {login, selectIsLoggedIn} from 'features/auth/model/authSlice';
import {useFormik} from 'formik';

type ErrorType = {
    email?: string;
    password?: string;
};


export const UseLogin = () => {

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

    return {isLoggedIn, formik}
};

