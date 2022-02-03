import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Home from './Home';

const mockStore = configureStore([ thunk ]);

describe('Pruebas al componente de <Home/>.jsx', () => {

    test('Debe mostrar un componente de <Nothing/>.jsx, Si NO hay ninguna nota active en el store.', () => {
        const initialState = {
            auth: {},
            notes: {
                notes: [],
                active: null
            }
        };

        const store = mockStore( initialState );

        const wrapper = mount(<Provider store={ store }>
            <Home />
        </Provider>);

        expect( wrapper.find('Nothing').exists() ).toBeTruthy();

        expect( wrapper.find('Note') ).toHaveLength(0);
    });

    test('Debe mostrar un componente de <Note/>.jsx, si hay una nota active.', () => {
        const initialState = {
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
        };

        const store = mockStore( initialState );

        const wrapper = mount(<Provider store={ store }>
            <Home />
        </Provider>);

        expect( wrapper.find('Note') ).toHaveLength(1);

        expect( wrapper.find('Note').prop('contentNote') ).toEqual( initialState.notes.active );
    });
});