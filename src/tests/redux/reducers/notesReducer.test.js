import {
    NOTES_CLEANING_WHEN_LOGOUT,
    NOTES_DISPLAY_IN_SIDEBAR,
    NOTES_DROP_NOTE,
    NOTES_NEW_NOTE,
    NOTES_SET_ACTIVE,
    NOTES_UPDATED_NOTE } from '../../../redux/constants/typesNotes';
import { notesReducer } from '../../../redux/reducers/notesReducer';

describe('Pruebas al reducer notesReducer.js', () => {

    const note = {
        id: 'r0094iii3ir9ieo3ooweee9834',
        body: 'It is an test body case',
        title: 'An awesome title',
    };

    const other_note = {
        id: '902opdaps0002pppz088eisolla01092',
        title: 'A Testing Title',
        body: 'Any text content',
    };

    const presetInitialState = {
        notes: [],
        active: null,
        order: 'asc',
        orderby: 'cronologic',
    };

    test('Si la acción enviada no la reconoce, debe devolver el state actual sin cambios.', () => {
        const action = { type: 'UNKNOWN_TYPE' };
        const state = notesReducer(undefined, action);

        expect( state ).toEqual( presetInitialState );
    });

    test('Debe agregar la nueva nota en el action payload, a las notes en el state.', () => {
        const action = {
            type: NOTES_NEW_NOTE,
            payload: note,
        }

        const state = notesReducer(undefined, action);

        expect( state ).toHaveProperty('notes');
        expect( state.notes ).toContainEqual( note );
    });

    test('Debe colocar como activa, la nota seleccionada enviada por medio de action payload.', () => {
        const action = {
            type: NOTES_SET_ACTIVE,
            payload: note,
        };

        const state = notesReducer(undefined, action);

        expect( state ).toHaveProperty('active');
        expect( state.active ).toEqual( note );
    });

    test('Debe poner las notas recibidas en action.payload, como las notas predeterminadas.', () => {
        const action = {
            type: NOTES_DISPLAY_IN_SIDEBAR,
            payload: [ note ],
        };

        const state = notesReducer(undefined, action);

        expect( state ).toHaveProperty('notes');
        expect( state.notes ).toEqual([ note ]);
    });

    test('Debe actualizar la nota recibida, identificándola por su ID, con el valor recibido en el action.payload', () => {
        const action = {
            type: NOTES_UPDATED_NOTE,
            payload: {
                ...note,
                body: 'It is a generic text lorem ipmsu a dolo',
                title: 'Updated Title',
            }
        }

        const initialState = { notes: [ note ], active: null };
        const state = notesReducer(initialState, action);

        expect( state ).toEqual({
            active: null,
            notes: [ action.payload ]
        });
    });

    test('Debe borrar la nota seleccionada y recibida por el ID. Quitándola a la vez de la propiedad active del state.', () => {
        const initialState = {
            notes: [
                other_note,
                note,
            ],
            active: note,
        };

        const action = {
            type: NOTES_DROP_NOTE,
            payload: note.id,
        };

        const state = notesReducer(initialState, action);

        expect( state ).toEqual({
            notes: [ other_note ],
            active: null,
        });
    });

    test('Debe limpiar o re-iniciar el state de notas cuando reciba una instrucción de clean when logout.', () => {
        const initialState = {
            notes: [
                other_note,
                note,
            ],
            active: note
        };

        const action = {
            type: NOTES_CLEANING_WHEN_LOGOUT,
        };

        const state = notesReducer(initialState, action);

        expect( state ).toEqual( presetInitialState );
    });

});