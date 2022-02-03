import Swal from 'sweetalert2';
import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, updateDoc } from '@firebase/firestore';
import {
    NOTES_NEW_NOTE,
    NOTES_SET_ACTIVE,
    NOTES_DISPLAY_IN_SIDEBAR,
    NOTES_UPDATED_NOTE,
    NOTES_DROP_NOTE,
    NOTES_CLEANING_WHEN_LOGOUT,
    NOTES_CHANGE_ORDER,
} from '../constants/typesNotes';
import { uploadFile } from '../../helpers/files';
import { db as firestoreDB } from '../../config/firebase';

export const actionAddNewNote = () => {
    return async (dispatch, getState) => {
        const { uid: user_uid } = getState().auth;

        const newNote = {
            title: '',
            body: '',
            urlImage: '',
            createdAt: new Date().getTime(),
        };

        const doc = await addDoc( collection(firestoreDB, `${user_uid}/journal/notes`), newNote);

        const createdNote = {
            id: doc.id,
            ...newNote,
        };

        dispatch( actionNewNote( createdNote ) );
        dispatch( actionSetActiveNote( createdNote ) );
    }
};

export const actionNewNote = ( createdNote ) => ({
    type: NOTES_NEW_NOTE,
    payload: createdNote,
});

export const actionSetActiveNote = ( activeNote ) => ({
    type: NOTES_SET_ACTIVE,
    payload: activeNote,
});

export const actionSavingChanges = () => {
    return async (dispatch, getState) => {
        const user_uid = getState().auth.uid;
        const activeNote = getState().notes.active;

        const { id: note_id, ...noteForFirestore } = activeNote;
        await updateDoc( doc(firestoreDB, `${user_uid}/journal/notes/${ note_id }`), noteForFirestore )
            .then(() => {
                dispatch( refreshNote(activeNote) );

                Swal.fire({
                    title: 'Guardada exitosamente',
                    html: '<p><small>Su nota se guardó correctamente</small></p>',
                    icon: 'success',
                    timer: 1300,
                    showConfirmButton: true,
                    confirmButtonText: 'Aceptar',
                    confirmButtonColor: 'limegreen',
                });
            })
            .catch(reason => {
                console.log( reason.code );
            });
    }
}

export const refreshNote = ( updatedNote ) => ({
    type: NOTES_UPDATED_NOTE,
    payload: { ...updatedNote },
});

export const getFirebaseNotes = () => {
    return async ( dispatch, getState ) => {
        const { uid } = getState().auth;

        const snapNotes = await getDocs( collection(firestoreDB, `${uid}/journal/notes`) );
        const notes = [];

        snapNotes.forEach( snapHijo => {
            notes.push({
                id: snapHijo.id,
                ...snapHijo.data(),
            })
        });

        dispatch( displayNotes(notes) );
    }
}

export const displayNotes = ( notes ) => ({
    type: NOTES_DISPLAY_IN_SIDEBAR,
    payload: notes,
});

export const actionSetAscendingOrder = () => ({
    type: NOTES_CHANGE_ORDER,
    payload: {
        order: 'asc',
    }
});

export const actionSetDescendingOrder = () => ({
    type: NOTES_CHANGE_ORDER,
    payload: {
        order: 'desc',
    }
});

export const actionReorderByRule = ( orderBy ) => ({
    type: NOTES_CHANGE_ORDER,
    payload: {
        orderby: orderBy,
    }
});

export const actionStartUploadFile = (file) => {
    return async (dispatch, getState) => {
 
        Swal.fire({
            title: 'Subiendo archivos...',
            text: 'Por favor, espere un momento...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            },
        });

        const activeNote = getState().notes.active;
        const { secure_url } = await uploadFile(file);

        dispatch( actionSetActiveNote({ ...activeNote, urlImage: secure_url }) );
        await dispatch( actionSavingChanges() );

        Swal.close();
    }
}

export const actionStartDeletingNote = (note_id) => {
    return async (dispatch, getState) => {
        const user_uid = getState().auth.uid;

        try {
            const resp = await deleteDoc( doc( firestoreDB, `${user_uid}/journal/notes/${note_id}`) );

            dispatch( deleteNote( note_id ) );

            Swal.fire({
                icon: 'success',
                timer: 1250,
                title: 'Eliminado',
                text: 'Su nota fue eliminada',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: 'green',
                showCloseButton: true,
            });

        } catch (e) {
            Swal.fire({
                icon: 'error',
                html: 'Error en la conexión con Firestore DB',
                title: 'Error. <small>No pudimos terminar la eliminación</small>',
                footer: `<small>For more details: ${e.code}</small>`,
                confirmButtonText: 'Entendido',
                confirmButtonColor: 'oragered', 
                showCloseButton: true,
            });

            console.error(e);
        }
    }
}

export const deleteNote = (noteID) => ({
    type: NOTES_DROP_NOTE,
    payload: noteID
});

export const cleanupNotesLogout = () => ({
    type: NOTES_CLEANING_WHEN_LOGOUT
});