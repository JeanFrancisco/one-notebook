import {
    NOTES_NEW_NOTE,
    NOTES_SET_ACTIVE,
    NOTES_DISPLAY_IN_SIDEBAR,
    NOTES_UPDATED_NOTE,
    NOTES_DROP_NOTE,
    NOTES_CLEANING_WHEN_LOGOUT,
    NOTES_CHANGE_ORDER,
} from '../constants/typesNotes';
import { compareFunction } from '../../helpers/arrays';

const initialState = {
    notes: [],
    order: 'asc',
    orderby: 'cronologic',
    active: null,
}

export const notesReducer = (state = initialState, action) => {

    switch (action.type) {

        case NOTES_NEW_NOTE:
            return {
                ...state,
                notes: [
                    action.payload,
                    ...state.notes,
                ],
            }

        case NOTES_SET_ACTIVE:
            return {
                ...state,
                active: action.payload,
            }

        case NOTES_DISPLAY_IN_SIDEBAR:
            return {
                ...state,
                notes: action.payload,
            }

        case NOTES_UPDATED_NOTE:
            const updated_note = action.payload;

            return {
                ...state,
                notes: state.notes.map( note => ( note.id === updated_note.id ? updated_note : note ) ),
            }

        case NOTES_DROP_NOTE:
            return {
                ...state,
                active: null,
                notes: state.notes.filter( note => ( note.id !== action.payload ) ),
            }

        case NOTES_CLEANING_WHEN_LOGOUT:
            return {
                ...initialState,
            }

        case NOTES_CHANGE_ORDER:
            let { order = state.order, orderby = state.orderby } = action.payload;

            const copy_notes = [ ...state.notes ];

            const prop_criteria = ( orderby === 'cronologic' ? 'createdAt' : 'title' );

            return {
                ...state,
                orderby,
                order,
                notes: copy_notes.sort( (a, b) => compareFunction( a[prop_criteria], b[prop_criteria], order )),
            }

        default:
            return state;
    }
}