import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { actionAddNewNote } from "../../../redux/actions/notes";
import { authFirebaseLogout } from "../../auth/actions";
import Sidebar from "./Sidebar";

jest.mock('../../auth/actions', () => ({
    authFirebaseLogout: jest.fn(),
}));

jest.mock('../../../redux/actions/notes', () => ({
    actionAddNewNote: jest.fn(),
}));

const initialState = {
    auth: {
        uid: 'TEST_UNKNOWN_UID',
        name: 'Jane Doe',
    },
    notes: {
        notes: [],
        active: null,
    }
};

const mockStore = configureStore([ thunk ]);

const store = mockStore(initialState);

store.dispatch = jest.fn();

describe('Pruebas al componente <Sidebar />.jsx', () => {
    const wrapper = mount(<Provider store={ store }>
        <Sidebar />
    </Provider>);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Debe de renderizar el componente haciendo match con el snapshot por defecto.', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('Debe llamar a la acción de authFirebaseLogout()', () => {
        wrapper.find('.sidebar__user-loggout').prop('onClick')();

        expect( authFirebaseLogout ).toHaveBeenCalledTimes(1);
    });

    test('Debe llamar a la accion actionAddNewNote() cuando da click al botón agregar New Entry', () => {
        wrapper.find('.sidebar__new-entry>.btn').prop('onClick')();

        expect( actionAddNewNote ).toHaveBeenCalledTimes(1);
    });
});