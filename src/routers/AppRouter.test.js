import { act } from "@testing-library/react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { app as appFirebase } from "../config/firebase";
import { authLogin } from "../components/auth/actions";
import { getFirebaseNotes } from "../redux/actions/notes";
import AppRouter from "./AppRouter";

jest.mock('../components/auth/actions', () => ({
    authLogin: jest.fn(),
}));

jest.mock('../redux/actions/notes', () => ({
    getFirebaseNotes: jest.fn(),
    setActiveNote: jest.fn(),
}));

const mockStore = configureStore([ thunk ]);

describe('Pruebas al componente de <AppRouter/>.jsx', () => {

    test('Debe mostrarse en loading, si se esta verificando la autenticación; el estado por defecto.', async () => {
        const store = mockStore({
            auth: {},
            ui: {
                loading: false,
            }
        });

        let wrapper;
        await act( async () => {
            wrapper = await mount(<Provider store={ store }>
                <AppRouter/>
            </Provider>);
        })

        expect( wrapper.find('Loading').exists() ).toBeTruthy();
    });

    test('Debe mandar a llamar a las acciones: authLogin, y posteriormente, getFirebaseNotes si hay un usuario recién logueado', async () => {
        const store = mockStore({
            auth: {},
            notes: {
                active: null,
                notes: []
            }
        });

        store.dispatch = jest.fn();

        const auth = getAuth( appFirebase );

        const userCred = await signInWithEmailAndPassword(auth, 'tests@example.org', '0102030405');
        const { user } = userCred; 

        await act( async () => {
            let wrapper = mount(<Provider store={ store }>
                <AppRouter/>
            </Provider>);
        })

        expect( authLogin ).toHaveBeenCalledWith( user.uid, null );

        expect( getFirebaseNotes ).toHaveBeenCalled();
    });

});