import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Home from '../components/home/Home';
import AuthRouter from './AuthRouter';

import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Loading from '../components/custom/Loading';
import PrivateRoute from '../components/auth/routes/PrivateRoute';
import PublicBlockedRoute from '../components/auth/routes/PublicBlockedRoute';
import { authLogin } from '../components/auth/actions';
import { getFirebaseNotes } from '../redux/actions/notes';
import { app as appFirebase } from '../config/firebase';
import Swal from 'sweetalert2';

const AppRouter = () => {

    const dispatch = useDispatch();
    const firstAuthTry = useRef(true);
    const [ isVerifying, setVerifying ] = useState( true );
    const [ isAuthenticated, setAuthenticated ] = useState( false );

    useEffect(() => {
        const auth = getAuth( appFirebase );

        onAuthStateChanged(auth, ( user ) => {            

            if( firstAuthTry.current && user?.uid ) {

                dispatch( authLogin( user.uid, user.displayName ) );
                setAuthenticated( true );
                dispatch( getFirebaseNotes() );

            } else if( user?.uid ) {

                Swal.fire({
                    title: 'Bienvenido!',
                    text: 'Inicio de sesión éxitoso',
                    timer: 1500,
                    timerProgressBar: true,
                    showConfirmButton: true,
                    confirmButtonText: 'Aceptar',
                    icon: 'success',
                }).then( result => {

                    dispatch( authLogin( user.uid, user.displayName ) );
                    setAuthenticated( true );
                    dispatch( getFirebaseNotes() );

                });

            } else {
                firstAuthTry.current = false;

                setAuthenticated( false );
            }

            setVerifying( false );

        }, error => {

            Swal.fire({
                title: 'Oups! <small>Tuvimos algunos problemas para recuperar tu sesión.<small>',
                text: 'Nos ayudarías si revisas tu conexión a internet. E intenta recargar la página nuevamente, por favor.',
                confirmButtonText: 'Aceptar',
                showCloseButton: true,
                icon: 'info',
                timer: 1500,
            });
        });
    }, [ dispatch ]);

    if( isVerifying ) {
        return <Loading />;
    }

    return (
        <Router>
            <Switch>
                <PrivateRoute exact path="/" isAuthenticated={ isAuthenticated } redirectPath='/auth/login' component={ Home } />
                <PublicBlockedRoute path="/auth" isAuthenticated={ isAuthenticated } redirectPath='/' component={ AuthRouter } />

                <Redirect to="/" />
            </Switch>
        </Router>
    );
}

export default AppRouter;