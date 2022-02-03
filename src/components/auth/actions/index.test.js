import configStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Swal from 'sweetalert2';
import { NOTES_CLEANING_WHEN_LOGOUT } from '../../../redux/constants/typesNotes';
import { UI_FINISH_LOADING, UI_START_LOADING } from '../../../redux/constants/typesUi';
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_REMOVE_ERROR, AUTH_SET_ERROR } from '../constants';
import {
    authLogin,
    authLogout,
    setAuthError,
    removeAuthError,
    authEmailPasswordSignIn,
    authFirebaseLogout,
    authEmailPasswordSignUp,
} from './index';

jest.mock('sweetalert2', () => {
    return {
        fire: jest.fn().mockReturnValue({}),
    }
})

describe('Pruebas a las acciones de --[AUTH]--', () => {

    test('Debe regresar los objetos de acciones _SINCRONAS_, iguales a como se espera en las aserciones.', () => {
        const uid = 'r803uuioo0948uio728ywdjf';
        const username_one = 'Joe Doe';
        const action_one = authLogin(uid, username_one);
        const expected_action_one = {
            type: AUTH_LOGIN,
            payload: {
                uid,
                displayName: username_one,
            }
        };

        expect( action_one ).toEqual( expected_action_one );

        const action_two = authLogout();
        const expected_action_two = {
            type: AUTH_LOGOUT,
        };

        expect( action_two ).toEqual( expected_action_two );

        const message = 'Hello World !';
        const action_three = setAuthError(message);
        const expected_action_three = {
            type: AUTH_SET_ERROR,
            payload: message,
        };

        expect( action_three ).toEqual( expected_action_three );

        const action_four = removeAuthError();
        const expected_action_four = {
            type: AUTH_REMOVE_ERROR,
        }

        expect( action_four ).toEqual( expected_action_four );
    });    
});

describe('Pruebas a las acciones de -- [AUTH] --. Asyncronous Fn', () => {
    const mockStore = configStore([ thunk ]);
    const userUID = 'TESTS_UNKNOWN_UID';

    test('Debe ejecutar authEmailPasswordSignIn() con el comportamiento esperado', async () => {
        // No se probará, porque el comportamiento esperado se ejecuta por otras funciones como parte del flujo
        // de los eventos de Google Firebase Authenticator
        // Únicamente se prueba que se ejecuten los dispatch suceptibles a ser probados.

        const store = mockStore({
            auth: {}
        });

        await store.dispatch( authEmailPasswordSignIn( {
            email: 'tests@example.org',
            password: '0987654321',
        } ) );

        const actions = store.getActions();

        expect( actions ).toEqual([
            {
                type: UI_START_LOADING,
            },
            {
                type: UI_FINISH_LOADING,
            }
        ]);
    });

    test('Debe ejecutar el logout del usuario y clean las notas del registro de store en authFirebaseLogout()', async () => {
        const store = mockStore({
            auth: {}
        });

        await store.dispatch( authFirebaseLogout() );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({ type: AUTH_LOGOUT });

        expect( actions[1] ).toEqual({ type: NOTES_CLEANING_WHEN_LOGOUT });
    });

    test('Debe registrar un usuario con authEmailPasswordSignUp()', async () => {
        const store = mockStore({
            auth: {}
        });

        await store.dispatch( authEmailPasswordSignUp('tests@example.org', '0102030405', 'Tests User') );

        expect( Swal.fire ).toHaveBeenCalled();
    });
});