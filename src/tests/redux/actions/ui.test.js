import {
    actionStartLoading,
    actionFinishLoading
} from '../../../redux/actions/ui';
import { UI_FINISH_LOADING, UI_START_LOADING } from '../../../redux/constants/typesUi';

describe('Pruebas a acciones de --[UI]--', () => {
    test('Debe retornar los objetos de acción correctamente, con sus tipos esperados', () => {
        const expected_action_one = {
            type: UI_FINISH_LOADING,
        }
        const action_one = actionFinishLoading();

        expect( action_one ).toEqual( expected_action_one );


        const expected_action_two = {
            type: UI_START_LOADING
        }
        const action_two = actionStartLoading();

        expect( action_two ).toEqual( expected_action_two );
    });
});