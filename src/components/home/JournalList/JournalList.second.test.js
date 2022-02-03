import React, { useRef } from 'react';
import { Provider, useSelector } from 'react-redux';
import { mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import JournalList from './JournalList';
import { actionSetAscendingOrder, actionSetDescendingOrder } from '../../../redux/actions/notes';

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
    actionSetAscendingOrder: jest.fn(),
    actionSetDescendingOrder: jest.fn(),
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
}));

const mockSetAttribute = jest.fn();

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useRef: jest.fn().mockReturnValue({
        current: { setAttribute: () => mockSetAttribute }
    }),
}));

describe('El siguiente código, no puede identificar las llamadas a useRef().current.setAttribute.' + 
'Lo anterior dado a que: - Por una parte, el Mock creado, se actualiza al hacer la referencia vinculándolo con un componente DOM' +
'- O por el otro lado; debido a que, a pesar de que se force a siempre devolver ésa función "setAttribute", en algúna parte el hook useSelector usa el hook useRef' +
' para búscar un "lastSelector.current", y al no encontrarlo lanza una excepción', () => {

    test(`Debe llamar a las acciones de cambiar el orden, ascendente o descendente. Al dar click en el botón.
    También debe cambiar los nombres de las clases, para alternar entre iconos desciendiente/ascendente`, () => {

        useSelector.mockReturnValue([]);

        useRef.mockReturnValue({
            current: { setAttribute: mockSetAttribute }
        });
        // jest.spyOn(React, 'useRef').mockReturnValue({ current: { setAttribute: mockSetAttribute } });

        const wrapper = mount(<Provider store={ store }>
            <JournalList />
        </Provider>);

        // wrapper.find('#btn-sort-icon').closest('button').prop('onClick')();
        wrapper.find('#btn-sort-icon').closest('button').simulate('click');

        expect( actionSetDescendingOrder ).toHaveBeenCalledTimes(1);
        expect( mockSetAttribute ).toHaveBeenCalledWith('class', 'fa fa-sort-amount-up');
        // expect( wrapper.find('#btn-sort-icon').hasClass('fa-sort-amount-up') ).toBeTruthy();

        // const new_store = mockStore({
        //     notes: {
        //         notes: [],
        //         order: 'desc',
        //         orderby: 'alphabetic',
        //     }
        // });

        // const new_wrapper = mount(<Provider store={ new_store }>
        //     <JournalList />
        // </Provider>);

        // new_wrapper.find('#btn-sort-icon').parent().prop('onClick')();

        // expect( actionSetAscendingOrder ).toHaveBeenCalledTimes(1);
        // expect( setAttributeMock ).toHaveBeenCalledWith('class', 'fa fa-sort-amount-down-alt');
    });
});