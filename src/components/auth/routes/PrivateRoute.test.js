import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router';
import PrivateRoute from './PrivateRoute';

describe('Pruebas al componente auth/<PrivateRoute.jsx>', () => {

    test('Debe mostrar el componente enviado en las props, si está autenticado', () => {
        const wrapper = mount(
                <MemoryRouter>
                    <PrivateRoute
                        component={
                            () => <><h5 className="logged true">You're authenticated</h5></>
                        }
                        isAuthenticated={ true }
                        redirectPath='/auth/login' 
                        />
                </MemoryRouter>
            );

        expect( wrapper.find('h5.logged.true').exists() ).toBeTruthy();
    });

    test('Debe ocultar o bloquear el componente si no esta authenticado.', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated={ false }
                    redirectPath='/auth/login'
                    component={ () => <h1>You're authenticated.</h1> }
                    />
            </MemoryRouter>);

        expect( wrapper.find('h1').exists() ).toBeFalsy();
    });
});