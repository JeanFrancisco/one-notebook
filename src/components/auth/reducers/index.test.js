import { authReducer } from '.';
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_REMOVE_ERROR, AUTH_SET_ERROR } from '../constants';

describe('Pruebas al reducer de authReducer.js', () => {

    test('Si la acción enviada no la reconoce, debe devolver el state actual sin cambios.', () => {
        const action = { type: 'UNKNOWN_TYPE' };
        const state = authReducer(undefined, action);

        expect( state ).toEqual({});
    });

    test('Debe registrar las credenciales de authenticacion, en el Auth Login', () => {
        const uid = 'opw088u3iiiiw71ywhs534wqq32';
        const username = 'Jane Doe';
        const action = {
            type: AUTH_LOGIN,
            payload: {
                uid,
                displayName: username,
            }
        };

        const state = authReducer(undefined, action);

        expect( state ).toEqual({ uid, name: username });
    });

    test('Debe eliminar o limpiar las credenciales, cuando se envía la accion Auth Logout', () => {
        const initialState = {
            uid: 'opw088u3iiiiw71ywhs534wqq32',
            name: 'Jane Doe',
        };

        const action = { type: AUTH_LOGOUT };

        const state = authReducer( initialState, action );

        expect( state ).toEqual({});
    });

    test('Debe borrar o limpiar los mensajes de error almacenados en el state', () => {
        const initialState = {
            uid: 'opw088u3iiiiw71ywhs534wqq32',
            displayName: 'Jane Doe',
            errors: 'This is an example ERROR Message',
        };

        const action = { type: AUTH_REMOVE_ERROR };

        const state = authReducer( initialState, action );

        expect( state ).toEqual({
            uid: 'opw088u3iiiiw71ywhs534wqq32',
            displayName: 'Jane Doe',
        });
    });

    test('Debe agregar o añadir un mensaje de error, siempre que se le envíe la acción correspondiente', () => {
        const initialState = {
            uid: 'opw088u3iiiiw71ywhs534wqq32',
            displayName: 'Jane Doe',
        };

        const action = {
            type: AUTH_SET_ERROR,
            payload: 'This is an example ALERT or WARNING message',
        };

        const state = authReducer(initialState, action);

        expect( state ).toHaveProperty('errors', action.payload);
        expect( state ).toEqual({
            ...initialState,
            errors: action.payload,
        });
    });

});