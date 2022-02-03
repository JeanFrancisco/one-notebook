import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import Errors from './Errors';
import { useForm } from '../../hooks/useForm';
import { authEmailPasswordSignUp, removeAuthError, setAuthError } from './actions';
import { useEffect } from 'react';

const Register = () => {

    const dispatch = useDispatch();
    const { errors } = useSelector( state => state.auth );

    useEffect(() => {
        dispatch( removeAuthError() );
    }, [ dispatch ]);

    const isFormValid = () => {

        if( validator.isEmpty(formValues.username) ) {
            dispatch( setAuthError('Su nombre de usuario no puede ser un valor vacío') );
            return false;
        }

        if( ! validator.isEmail(formValues.email) ) {
            dispatch( setAuthError('El email no es válido') );
            return false;
        }

        if( ! validator.isLength(formValues.password, { min: 6 } ) || formValues.password !== formValues.confirmpassword ) {
            dispatch( setAuthError(`Revise su contraseña. Recuerde que no puede tener menos de 6 carácteres y
            debe coincidir con la confirmación de password`) );
            return false;
        }

        if( errors !== undefined )
            dispatch( removeAuthError() );

        return true;
    }

    const onSubmit = () => {
        if( isFormValid() )
            dispatch( authEmailPasswordSignUp(formValues) );
    };

    const [ formValues, handleInputChange, handleSubmit ] = useForm({
        username: 'Francisco',
        email: 'username@example.org',
        password: '122345',
        confirmpassword: '398174',
    }, onSubmit );

    return <>
        <h4 className="auth__title">Registrar</h4>

        <Errors errors={ errors } />

        <form onSubmit={ handleSubmit }>
            <input
                type="text"
                name="username"
                className="auth__input"
                autoComplete="off"
                placeholder="Enter your username"
                onChange={ handleInputChange }
                value={ formValues.username }
                />

            <input
                type="email"
                name="email"
                className="auth__input"
                autoComplete="off"
                placeholder="Enter your e-mail"
                onChange={ handleInputChange }
                value={ formValues.email }
                />

            <input
                type="password"
                name="password"
                className="auth__input"
                placeholder="Type your password"
                onChange={ handleInputChange }
                value={ formValues.password }
                />

            <input
                type="password"
                name="confirmpassword"
                className="auth__input"
                placeholder="Please confirm your password"
                onChange={ handleInputChange }
                value={ formValues.confirmpassword }
                />

            <button
                className="btn btn-primary btn-block auth__button"
                type="submit">
                    Registrarme
            </button>
        </form>

        <Link
            className="link"
            to="/auth/login">
            ¿Ya estás registrado? Inicia Sesión.
        </Link>
    </>
}

export default Register;