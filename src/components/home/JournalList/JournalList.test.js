import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import JournalList from './JournalList';
import { actionReorderByRule, actionSetDescendingOrder, actionSetAscendingOrder } from '../../../redux/actions/notes';

const mockStore = configureStore([ thunk ]);

const store = mockStore({
    notes: {
        notes: [],
        order: 'asc',
        orderby: 'cronologic'
    }
});

store.dispatch = jest.fn();

jest.mock('../../../redux/actions/notes', () => ({
    actionReorderByRule: jest.fn(),
    actionSetDescendingOrder: jest.fn(),
    actionSetAscendingOrder: jest.fn(),
}));

describe('Pruebas al componente de <JournalList/>.jsx', () => {

    const wrapper = mount(<Provider store={ store }>
        <JournalList />
    </Provider>);

    beforeEach(() => {
        jest.clearAllMocks();
    })
    
    test('Debe hacer match con el snapshot por defecto.', () => {
        expect( wrapper ).toMatchSnapshot();
    });

    test('Debe hacer match con el snapshot por defecto. Nótese que el order se establece a desc y el orderby a alphabetic', () => {
        const notes = [
            { id: '1', title: 'Test title One', body: 'Lorem impsu' },
            { id: '2', title: 'Test title Two', body: 'Lorem impsu' },
            { id: '3', title: 'Test title Three', body: 'Lorem impsu' },
            { id: '4', title: 'Test title Four', body: 'Lorem impsu' },
        ];

        const store = mockStore({
            notes: {
                notes: notes,
                order: 'desc',
                orderby: 'alphabetic'
            }
        });

        const wrapper = mount(<Provider store={ store }>
            <JournalList />
        </Provider>);

        expect( wrapper ).toMatchSnapshot();
    });


    test('Debe renderizar tantos componentes <JournalEntry/>, como número de elementos haya en el arreglo de notes', () => {
        const notes = [
            { id: '1', title: 'Test title One', body: 'Lorem impsu' },
            { id: '2', title: 'Test title Two', body: 'Lorem impsu' },
            { id: '3', title: 'Test title Three', body: 'Lorem impsu' },
            { id: '4', title: 'Test title Four', body: 'Lorem impsu' },
        ];

        const store = mockStore({
            notes: {
                notes: notes,
                order: 'asc',
                orderby: 'cronologic'
            }
        });

        const wrapper = mount(<Provider store={ store }>
            <JournalList />
        </Provider>);

        expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('JournalEntry') ).toHaveLength( notes.length );
    });

    test(`Debe llamar a la acción para cambiar el criterio de ordenamiento, pasándole dicho criterio como parámetro.
    Al cambiar el valor del input radio (onChange event)`, () => {

        const criteria = 'alphabetic';

        wrapper.find('#alphabetic').prop('onChange')({
            target: {
                value: criteria,
            }
        });

        expect( actionReorderByRule ).toHaveBeenCalledTimes(1);
        expect( actionReorderByRule ).toHaveBeenCalledWith( criteria )
    });

    test(`Debe llamar a las acciones de cambiar el orden, ascendente o descendente. Al dar click en el botón.`, () => {

        const wrapper = mount(<Provider store={ store }>
            <JournalList />
        </Provider>);

        // wrapper.find('#btn-sort-icon').closest('button').prop('onClick')();
        wrapper.find('#btn-sort-icon').closest('button').simulate('click');

        expect( actionSetDescendingOrder ).toHaveBeenCalledTimes(1);

        const new_store = mockStore({
            notes: {
                notes: [],
                order: 'desc',
                orderby: 'alphabetic',
            }
        });

        new_store.dispatch = jest.fn();

        const new_wrapper = mount(<Provider store={ new_store }>
            <JournalList />
        </Provider>);

        new_wrapper.find('#btn-sort-icon').parent().prop('onClick')();

        expect( actionSetAscendingOrder ).toHaveBeenCalledTimes(1);
    });
});