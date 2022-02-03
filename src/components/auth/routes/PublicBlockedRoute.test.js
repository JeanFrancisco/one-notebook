import { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import PublicBlockedRoute from "./PublicBlockedRoute";

describe('Pruebas al componente de <PublicBlockedRoute/>.jsx', () => {
/*     const props = {
        location: {
            path: '/login'
        }
    };
 */
    test('Debe mostrar el url path del login, si no está autenticado.', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PublicBlockedRoute
                    redirectPath='/'
                    isAuthenticated={ false } component={ () => <h1>The Login page is here.</h1> }
                    /* { ...props } */ />
            </MemoryRouter>);

        expect( wrapper.find('h1').exists() ).toBeTruthy();
        expect( wrapper.find('h1').text().trim() ).toBe('The Login page is here.');
    });

    test('Debe bloquear el url path del login, si ya está autenticado.', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PublicBlockedRoute
                    redirectPath='/'
                    isAuthenticated={ true } component={ () => <h1>The Login page is here.</h1> }
                    /* { ...props } */ />
            </MemoryRouter>);

        expect( wrapper.find('h1').exists() ).toBeFalsy();
    });
});