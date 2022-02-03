/**
 * @jest-environment node
 * */

import { doc, deleteDoc, getFirestore, disableNetwork, getDoc } from '@firebase/firestore';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { uploadFile } from '../../../helpers/files';
import {
    actionAddNewNote,
    actionNewNote,
    actionReorderByRule,
    actionSavingChanges,
    actionSetActiveNote,
    actionSetAscendingOrder,
    actionSetDescendingOrder,
    actionStartUploadFile,
    cleanupNotesLogout,
    deleteNote,
    displayNotes,
    getFirebaseNotes,
    refreshNote } from "../../../redux/actions/notes";
import {
    NOTES_CHANGE_ORDER,
    NOTES_CLEANING_WHEN_LOGOUT,
    NOTES_DISPLAY_IN_SIDEBAR,
    NOTES_DROP_NOTE,
    NOTES_NEW_NOTE,
    NOTES_SET_ACTIVE,
    NOTES_UPDATED_NOTE
} from "../../../redux/constants/typesNotes";

/* Opcion 1 para hacer mocks de constantes exports desde modules */
/*
    jest.mock('../../../helpers/files', () => {
        return { 
            uploadFile: file => ({
                secure_url: 'https://dslkksldsk.slkmvdmvd.dgv'
            }),
        }
    });
*/

/* Opcion 2 para hacer mocks de constantes exportadas desde modules. ( Complemento en la function test() ) */

jest.mock('../../../helpers/files', () => {
    return { 
        uploadFile: jest.fn(),
    }
});

/**
 *  -- TEST FOR * ASYNCHRONOUS * FUNCTIONS --
 */
describe('Debe mandar a llamar correctamente las funciones ASÍNCRONAS para cada acción asyncronous en /actions/note.js', () => {

    const middlewares = [ thunk ];
    const mockStore = configureStore( middlewares );

    const userUID = 'TESTS_UNKNOWN_UID';
    const activeNoteID = 'IcHcEfcZV84TT2kgPGxI';

    afterAll(() => {
        jest.clearAllMocks();
        disableNetwork( getFirestore() );
    });

    test('Debe llamar al dispatch de la acción actionAddNewNote() correctamente.', async () => {
        const store = mockStore({
            auth: {
                uid: userUID,
            }
        });

        await store.dispatch( actionAddNewNote() );

        const actions = store.getActions();

        expect( actions[0] ).toEqual({
            type: NOTES_NEW_NOTE,
            payload: {
                id: expect.any(String),
                body: '',
                title: '',
                urlImage: '',
                createdAt: expect.any(Number),
            }
        });

        const docId = actions[0]?.payload.id;

        expect( actions[1] ).toEqual({
            type: NOTES_SET_ACTIVE,
            payload: {
                id: docId,
                body: '',
                title: '',
                urlImage: '',
                createdAt: expect.any(Number),
            }
        });

        await deleteDoc( doc( getFirestore(), `${ store.getState().auth.uid }/journal/notes/${ docId }`) );
    });

    test('Debe llamar al dispatch de la acción actionSavingChanges() correctamente.', async () => {
        const activeRef = await getDoc(
            doc( getFirestore(), `${ userUID }/journal/notes/${ activeNoteID }`)
        );

        const activeNote = { id: activeRef.id, ...activeRef.data() };

        const titles = {
            optionOne: 'IT IS AN AWESOME TITLE',
            optionTwo: 'THAT IS OTHER OPTION OF THE TITLE FOR TESTS'
        };

        const bodies = {
            optionA: 'An example body',
            optionB: 'Lorem ipsum a dolor magnuh darhai'
        }

        activeNote.title = ( activeNote.title !== titles.optionOne
            ? titles.optionOne : titles.optionTwo );

        activeNote.body = ( activeNote.body !== bodies.optionA
            ? bodies.optionA : bodies.optionB );

        const store = mockStore({
            auth: {
                uid: userUID,
            },
            notes: {
                active: activeNote
            }
        });

        await store.dispatch( actionSavingChanges() );

        const modifiedRef = await getDoc( doc(
            getFirestore(), `${ store.getState().auth.uid }/journal/notes/${ store.getState().notes.active.id }`
        ) );

        const modifiedNote = { id: modifiedRef.id, ...modifiedRef.data() };

        expect( modifiedNote ).toEqual( activeNote );

        const actions = store.getActions();

        expect( actions ).toContainEqual({
            type: NOTES_UPDATED_NOTE,
            payload: modifiedNote,
        });
    });

    test('Debe ejecutar la accion de actionStartUploadFile() con el archivo recibido de parametro.', async () => {
        const activeNote = {
            id: activeNoteID,
            body: 'Lorem impsu a lorem dorlo',
            title: 'An awesome tests title'
        };

        const store = mockStore({
            auth: {
                uid: userUID,
            },
            notes: {
                active: activeNote,
            }
        });

        const fileTest = [];
        const filename = 'tests_file.txt';
        const secureURL = `https://subdomain.example.org/files/${filename}`;

        /* Opcion 2 para hacer mocks, de constantes exportadas desde modules. */
        uploadFile.mockReturnValue({
            secure_url: secureURL
        });

        await store.dispatch( actionStartUploadFile(fileTest) );

        expect( uploadFile ).toHaveBeenCalledWith( fileTest );

        const actions = store.getActions();

        expect( actions ).toContainEqual({
            type: NOTES_SET_ACTIVE,
            payload: {
                ...activeNote,
                urlImage: secureURL
            }
        });

        expect( actions ).toContainEqual({
            type: NOTES_UPDATED_NOTE,
            payload: expect.any(Object),
        });
    });

    test('Debe obtener las notes para el usuario indicado en la action getFirebaseNotes()', async () => {
        const store = mockStore({
            auth: {
                uid: userUID,
            }
        });

        await store.dispatch( getFirebaseNotes() );

        const actions = store.getActions();

        expect( actions ).toContainEqual({
            type: NOTES_DISPLAY_IN_SIDEBAR,
            payload: expect.any(Array),
        });

        expect( actions[0].payload ).toHaveLength(2);

        expect( actions[0].payload ).toContainEqual({
            id: activeNoteID,
            body: expect.any(String),
            title: expect.any(String),
            urlImage: expect.any(String),
            createdAt: expect.any(Number),
        });
    });

});

/**
 *  -- TESTS WITH *SYNCHRONOUS* FUNCTIONS --
 * */
describe('Debe retornar los objetos de acciones correctamente, para cada acción SÍNCRONA en /actions/notes.js', () => {
    
    const note = {
        id: 'UNKNOWN_ID',
        title: 'Testing title',
        body: 'A testing content text for the note',
        createdAt: new Date().getTime(),
    }

    test('Prueba de la acción: actionNewNote.', () => {
        const action = actionNewNote( note );

        const expected_object = {
            type: NOTES_NEW_NOTE,
            payload: note,
        }

        expect( action ).toEqual( expected_object );
    });

    test('Prueba de la acción: actionSetActiveNote.', () => {
        const action = actionSetActiveNote( note );

        const expected_object = {
            type: NOTES_SET_ACTIVE,
            payload: note,
        };

        expect( action ).toEqual( expected_object );
    });

    test('Prueba de la acción: refreshNote.', () => {
        const action = refreshNote( note );

        const expected_object = {
            type: NOTES_UPDATED_NOTE,
            payload: { ...note },
        };

        expect( action ).toEqual( expected_object );
    });

    test('Prueba de la acción: displayNotes.', () => {
        const action = displayNotes([ note ]);

        const expected_object = {
            type: NOTES_DISPLAY_IN_SIDEBAR,
            payload: [ note ],
        };

        expect( action ).toEqual( expected_object );
    });

    test('Prueba de la acción: actionSetAscendingOrder.', () => {
        const action = actionSetAscendingOrder();

        const expected_object = {
            type: NOTES_CHANGE_ORDER,
            payload: {
                order: 'asc',
            }
        };

        expect( action ).toEqual( expected_object );
    });

    test('Prueba de la acción: actionSetDescendingOrder.', () => {
        const action = actionSetDescendingOrder();

        const expected_object = {
            type: NOTES_CHANGE_ORDER,
            payload: {
                order: 'desc',
            }
        };

        expect( action ).toEqual( expected_object );
    });

    test('Prueba de la acción: actionReorderByRule.', () => {
        const orderBy = 'cronologic';
        const action = actionReorderByRule( orderBy );

        const expected_object = {
            type: NOTES_CHANGE_ORDER,
            payload: {
                orderby: orderBy,
            }
        };

        expect( action ).toEqual( expected_object );
    });

    test('Prueba de la acción: deleteNote.', () => {
        const action = deleteNote(note.id);

        const expected_object = {
            type: NOTES_DROP_NOTE,
            payload: note.id
        };

        expect( action ).toEqual( expected_object );
    });

    test('Prueba de la acción: cleanupNotesLogout.', () => {
        const action = cleanupNotesLogout();

        const expected_object = {
            type: NOTES_CLEANING_WHEN_LOGOUT
        };

        expect( action ).toEqual( expected_object );
    });
});