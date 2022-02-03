import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { actionSetActiveNote, actionStartDeletingNote } from "../../../redux/actions/notes";
import Note from "./Note";

jest.mock('../../../redux/actions/notes', () => ({
    actionSetActiveNote: jest.fn(),
    actionStartDeletingNote: jest.fn(),
}));

const mockStore = configureStore([ thunk ]);

const store = mockStore({
    auth: {},
    notes: {
        notes: [{
            id: 'TEST_NOTE_ID',
            body: 'Lorem impsu',
            title: 'An Tests Title',
            createdAt: 0,
        }],
        active: {
            id: 'TEST_NOTE_ID',
            body: 'Lorem impsu',
            title: 'An Tests Title',
            createdAt: 0,
        },
    }
});

store.dispatch = jest.fn();

describe('Pruebas al componente de <Note />.jsx', () => {

    const wrapper = mount(<Provider store={ store }>
        <Note contentNote={ store.getState().notes.active } />
    </Provider>);

    test('Debe hacer match con el snapshot por defecto', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('Debe llamarse a la accion actionStartDeletingNote() cuando le de click al bóton de Eliminar la Acción', () => {
        wrapper.find('.note__button-delete.btn').prop('onClick')();

        expect( actionStartDeletingNote ).toHaveBeenCalledWith( store.getState().notes.active.id );
    });

    test('Debe llamarse a la acción de actionSetActiveNote() cuando se actualice los input del formulario', () => {
        const evt = {
            target: {
                name: 'title',
                value: 'Other Title For Testing',
            }
        };

        wrapper.find('input[name="title"]').simulate('change', evt);


        /*
            wrapper.find('input[name="title"]').prop('onChange')(evt);
         */

        /**
         *  Hacerlo de la forma como se muestra arriba, produce un error
         *  sobre "una actualización del ESTADO o State interno del componente":
            -- Warning: An update to Note inside a test was not wrapped in act(...).
            -- When testing, code that causes React state updates should be wrapped into act(...):
            -- act(() => {})
         *  que debería encerrarse en una funcion act(...)
         **/

        expect( actionSetActiveNote ).toHaveBeenCalledTimes(1);
        expect( actionSetActiveNote ).toHaveBeenCalledWith({
            ...store.getState().notes.active,
            title: evt.target.value
        });

        const new_content_body = 'An Awesome Body Text Change For Tests';

        wrapper.find('textarea').simulate('change', {
            target: {
                name: 'body',
                value: new_content_body,
            }
        });

        expect( actionSetActiveNote ).toHaveBeenCalledWith({
            ...store.getState().notes.active,
            title: evt.target.value,
            body: new_content_body,
        });
    });
});