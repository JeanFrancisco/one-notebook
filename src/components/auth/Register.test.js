import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setAuthError } from './actions';
import Register from './Register';

const mockStore = configureStore([ thunk ]);

jest.mock('./actions', () => ({
    setAuthError: jest.fn().mockReturnValue({}),
    removeAuthError: jest.fn().mockReturnValue({ type: '' }),
}));

describe('Pruebas en el componente <Register/>.jsx', () => {
    const store = mockStore({
        auth: {},
    });

    store.dispatch = jest.fn();

    let wrapper;

    beforeEach(() => {
        wrapper = mount(<Provider store={ store }>
            <MemoryRouter>
                <Register/>
            </MemoryRouter>
        </Provider>);
    });

    test('Debe hacer match con el snapshot por defecto', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('Debe mostrar el mensaje de error, si hay uno definido en el state', () => {
        const store = mockStore({
            auth: {
                errors: 'That is an error message for tests',
            }
        })

        store.dispatch = jest.fn();

        const wrapper = mount(<Provider store={ store }>
            <MemoryRouter>
                <Register />
            </MemoryRouter>
        </Provider>)

        expect( wrapper.find('.auth__errors').html() ).toContain( store.getState().auth.errors );
    });

    describe('Debe mandar el mensaje de error predefinido a la función|acción setAuthError()', () => {

        test('Caso 1: Email vacío o no valido', () => {
            wrapper.find('[type="email"]').simulate('change', {
                target: {
                    name: 'email',
                    value: ''
                }
            });

            wrapper.find('form').simulate('submit', { preventDefault() {} });

            expect( setAuthError ).toHaveBeenCalledWith('El email no es válido');
        });

        test('Caso 2: Nombre de usuario vacio', () => {
            wrapper.find('[name="username"]').simulate('change', {
                target: {
                    name: 'username',
                    value: '',
                }
            });

            wrapper.find('form').prop('onSubmit')({ preventDefault() {} });

            expect( setAuthError ).toHaveBeenCalledWith('Su nombre de usuario no puede ser un valor vacío');
        });

        test('Caso 3: Son muy cortas la Password y su Confirmacion de Password', () => {
            wrapper.find('[name="confirmpassword"]').simulate('change', {
                target: {
                    name: 'confirmpassword',
                    value: '012'
                }
            });

            wrapper.find('[name="password"]').simulate('change', {
                target: {
                    name: 'password',
                    value: '012'
                }
            });

            wrapper.find('form').prop('onSubmit')({ preventDefault() {} });

            expect( setAuthError ).toHaveBeenCalledWith(`Revise su contraseña. Recuerde que no puede tener menos de 6 carácteres y
            debe coincidir con la confirmación de password`);
        });

        test('Caso 4: Password y su Confirmacion de Password no coinciden', () => {
            wrapper.find('[name="confirmpassword"]').simulate('change', {
                target: {
                    name: 'confirmpassword',
                    value: '00000000'
                }
            });

            wrapper.find('form').prop('onSubmit')({ preventDefault() {} });

            expect( setAuthError ).toHaveBeenCalledWith(`Revise su contraseña. Recuerde que no puede tener menos de 6 carácteres y
            debe coincidir con la confirmación de password`);
        });
    })
});