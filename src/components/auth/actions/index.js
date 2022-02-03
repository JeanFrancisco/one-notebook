import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    getAuth,
    signOut,
} from "firebase/auth";
import Swal from 'sweetalert2';
import { app } from "../../../config/firebase";
import { cleanupNotesLogout } from "../../../redux/actions/notes";
import { actionFinishLoading, actionStartLoading } from "../../../redux/actions/ui";
import {
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_SET_ERROR,
    AUTH_REMOVE_ERROR
} from "../constants";

export const authLogin = (uid, displayName) => ({
    type: AUTH_LOGIN,
    payload: {
        uid,
        displayName,
    }
});

export const authSignInWithGoogle = () => {
    return async (dispatch) => {

        dispatch( actionStartLoading() );

        const auth = getAuth( app );

        await signInWithPopup( auth, new GoogleAuthProvider() )
        .then( userCredentials => {
            // const { user: { displayName, uid } } = userCredentials;
            
            // dispatch( authLogin(uid, displayName) );
        })
        .catch( reason => {
            Swal.fire({
                icon: 'warning',
                html: '<small>No se pudo iniciar la sesión. <br/> <br/> ¿Alcanzó a ver si ocurrió algo: con el Pop-up de autenticación de Google?</small>',
                title: 'Oups! Lo sentimos.',
                iconHtml: '<i class="fa fa-warning"></i>',
                footer: `<small>Reason Code: ${reason.code}</small>`,
                showCloseButton: true,
                confirmButtonText: 'Aceptar',
            });
        })
        .finally(() => {
            dispatch( actionFinishLoading() );
        });
    };
}

export const authEmailPasswordSignIn = ({ email, password }) => {
    return async dispatch => {
        dispatch( actionStartLoading() );

        const auth = getAuth(app);

        await signInWithEmailAndPassword(auth, email, password)
            .then( ({ user }) => {
                // const { uid, displayName } = user;

                // dispatch( authLogin(uid, displayName) );
            }).catch( reason => {
                Swal.fire({
                    title: 'Oups! <small>Algo ocurrió mientras iniciabamos tu sesión.</small>',
                    html: `<p><b><small>¿Qué acciones puedes hacer?</small></b></p>
                        <ul style="text-align: left">
                            <li><small>Puedes revisar por favor tu email y contraseña.</small></li>
                            <li><small>También que te puedes conectar a Internet. En especial a los servicios de Google.</small></li>
                        </ul>`,
                    confirmButtonText: 'Entendido',
                    icon: 'warning',
                    iconColor: 'orange',
                    showCloseButton: true,
                    confirmButtonColor: 'orangered',
                    footer: `<small>Reason Code: ${reason.code}</small>`,
                })
            }).finally(() => {
                dispatch( actionFinishLoading() );
            });
    }
}

export const authEmailPasswordSignUp = ({ email, password, username }) => {
    return async (dispatch) => {
        dispatch( actionStartLoading() );

        const auth = getAuth(app);

        await createUserWithEmailAndPassword(auth, email, password)
            .then( async userCredentials => {

                const { user } = userCredentials;
                await updateProfile(user, { displayName: username });

                // dispatch( authLogin(user.uid, user.displayName) );

            }).catch( reason => {
                Swal.fire({
                    title: 'Oups! <small>Ahora mismo no podemos registrarte.</small>',
                    html: '<p>Por favor... <br/> <small>Regresa más tarde y vuelve a intentarlo ;) .</small><p>',
                    icon: 'info',
                    iconColor: 'orange',
                    confirmButtonText: 'Entiendo',
                    confirmButtonColor: 'limegreen',
                    showCloseButton: true,
                    footer: `<small>Reason Code: ${reason.code}</small>`,
                });
            }).finally(() => {
               dispatch( actionFinishLoading() );
            });
    }
}

export const authFirebaseLogout = () => {
    return async dispatch => {
        const auth = getAuth(app);

        await signOut(auth);

        dispatch( authLogout() );

        dispatch( cleanupNotesLogout() );
    }
}

export const authLogout = () => ({ type: AUTH_LOGOUT });

export const setAuthError = ( msg ) => ({
    type: AUTH_SET_ERROR,
    payload: msg
});

export const removeAuthError = () => ({ type: AUTH_REMOVE_ERROR });