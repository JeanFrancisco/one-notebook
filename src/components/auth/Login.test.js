import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Login from './Login';
import { authSignInWithGoogle, authEmailPasswordSignIn, removeAuthError, setAuthError } from './actions/index';

const mockStore = configureStore([ thunk ]);

jest.mock('./actions/index', () => ({
    setAuthError: jest.fn().mockReturnValue({}),
    removeAuthError: jest.fn().mockReturnValue({}),
    authSignInWithGoogle: jest.fn(),
    authEmailPasswordSignIn: jest.fn(),
}));

let store, wrapper;

describe('Pruebas al componente <Login/>.jsx', () => {

    beforeEach(() => {
        store = mockStore({
            auth: {
                errors: undefined,
            },
            ui: {
                loading: false,
            }
        });
        
        store.dispatch = jest.fn();
        
        wrapper = mount(<Provider store={ store }>
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        </Provider>);        
    });

    test('Debe hacer match con el snapshot por defecto', () => {
        const store = mockStore({
            auth: {
                errors: undefined,
            },
            ui: {
                loading: false,
            }
        });

        const wrapper = mount(<Provider store={ store }>
            <MemoryRouter>
                <Login />
            </MemoryRouter>
        </Provider>);

        expect( wrapper ).toMatchSnapshot();
    });

    test('Debe mandar a llamar la función|acción de signInWithGoogle(), al dar click en el botón submit', () => {
        wrapper.find('.auth__google-btn').simulate('click');

        expect( authSignInWithGoogle ).toHaveBeenCalled();
    });

    test('Debe llamar a la funcion setAuthError() si algún input no tiene información correcta', () => {
        wrapper.find('form').prop('onSubmit')({ preventDefault() {} });

        expect( setAuthError ).toHaveBeenCalledWith('Por favor, asegúrese de ingresar todos los campos.');

        wrapper.find('input[name="email"]').simulate('change', {
            target: {
                name: 'email',
                value: 'jane_doe_example.org',
            }
        });

        wrapper.find('input[name="password"]').simulate('change', { target: { name: 'password', value: '012' } });

        wrapper.find('form').prop('onSubmit')({ preventDefault() {} });

        expect( setAuthError ).toHaveBeenCalledWith('Por favor asegúrese que su email es correcto, el valor ingresado no es válido.');

        wrapper.find('input[name="email"]').simulate('change', {
            target: {
                name: 'email',
                value: 'jane_doe@example.org',
            }
        });

        wrapper.find('form').prop('onSubmit')({ preventDefault() {} });

        expect( setAuthError ).toHaveBeenCalledWith('La contraseña es incorrecta, como mínimo debe tener una longitud de 6 caracteres.');
    });

    test('Debe llamar a la acción authEmailPasswordSignIn() con los parámetros correspondientes', () => {
        wrapper.find('input[name="email"]').simulate('change', {
            target: {
                name: 'email',
                value: 'jane_doe@example.org',
            }
        });

        wrapper.find('input[name="password"]').simulate('change', { target: { name: 'password', value: '092187438' } });

        wrapper.find('form').simulate('submit', { preventDefault(){} });

        expect( authEmailPasswordSignIn ).toHaveBeenCalledWith({
            password: '092187438',
            email: 'jane_doe@example.org'
        });
    });
});