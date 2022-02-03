import { UI_FINISH_LOADING, UI_START_LOADING } from '../../../redux/constants/typesUi';
import { uiReducer } from '../../../redux/reducers/uiReducer';

describe('Pruebas al reducer uiReducer.js', () => {

    test('Debe retornar el estado esperado para la accion.type definida', () => {
        const action = { type: UI_START_LOADING };
        const state = uiReducer(undefined, action);

        expect( state ).toEqual({
            loading: true
        });
    });

    test('Debe retornar el estado correspondiente para la action type predefinida', () => {
        const initialState = { loading: true };
        const action = { type: UI_FINISH_LOADING };
        const state = uiReducer(initialState, action);

        expect( state ).toEqual({ loading: false });
    });

    test('Debe retornar un estado (inicial o no) por defecto, para action types no definidos en los casos.', () => {
        const state = uiReducer({ loading: true } , { type: 'UNKNOWN_TYPE' });

        expect( state ).toEqual({ loading: true });
    });
});