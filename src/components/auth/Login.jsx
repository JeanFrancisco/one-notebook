import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import Errors from './Errors';
import { useForm } from '../../hooks/useForm';
import { authSignInWithGoogle, authEmailPasswordSignIn, removeAuthError, setAuthError } from './actions';

const Login = () => {
    const dispatch = useDispatch();
    const { errors } = useSelector( store => store.auth );
    const { loading } = useSelector( store => store.ui );

    // useEffect(() => {
    //     dispatch( removeAuthError() );
    // }, [ dispatch ]);

    const isFormValid = () => {
        if( validator.isEmpty( formValues.email, ) || validator.isEmpty( formValues.password ) ) {
            dispatch( setAuthError('Por favor, asegúrese de ingresar todos los campos.'))
            return false;
        }

        if( ! validator.isEmail( formValues.email ) ) {
            dispatch( setAuthError('Por favor asegúrese que su email es correcto, el valor ingresado no es válido.') );
            return false;
        }

        if( ! validator.isLength( formValues.password, { min: 6 } )) {
            dispatch( setAuthError('La contraseña es incorrecta, como mínimo debe tener una longitud de 6 caracteres.') );
            return false;
        }

        if( errors !== undefined )
            dispatch( removeAuthError() );

        return true;
    }

    const onSubmit = () => {
        if( isFormValid() ) {
            const action = authEmailPasswordSignIn( formValues );
            dispatch( action );
        }
    }

    const [ formValues, handleInputChanges, handleFormSubmit ] = useForm({
        email: '',
        password: ''
    }, onSubmit)

    const handleSignInWithGoogle = e => {
        const asyncAction = authSignInWithGoogle();
        dispatch( asyncAction );
    }

    return <>
        <h4 className="auth__title">Iniciar Sesión</h4>

        <Errors errors={ errors } />

        <form onSubmit={ handleFormSubmit }>
            <input
                type="email"
                name="email"
                className="auth__input"
                autoComplete="off"
                value={ formValues.email }
                onChange={ handleInputChanges }
                placeholder="Ingresa aquí tu e-mail."/>

            <input
                type="password"
                name="password"
                className="auth__input"
                value={ formValues.password }
                onChange={ handleInputChanges }
                placeholder="Escribe aquí tu contraseña."
                />

            <button
                className="btn btn-primary btn-block auth__button"
                disabled={ loading }
                type="submit">
                    Ingresar
            </button>

            <div className="auth__social-networks">
                <p>Iniciar sesión con redes sociales:</p>

                <div
                    onClick={ handleSignInWithGoogle }
                    disabled={ loading }
                    className="auth__google-btn">
                    <div className="auth__google-icon-wrapper">
                        <img
                            className="auth__google-icon"
                            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                            alt="[google logo]" />
                    </div>
                    <div className="auth__google-btn-text">
                        <b>Sign in with google</b>
                    </div>
                </div>
            </div>
        </form>

        <Link
            className="link"
            to="/auth/register">
            Crear una cuenta nueva.
        </Link>
    </>;
}

export default Login;