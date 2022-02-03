import { UI_FINISH_LOADING, UI_START_LOADING } from '../constants/typesUi';

const initialState = { loading: false };

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {

        case UI_START_LOADING:
            return {
                ...state,
                loading: true,
            }

        case UI_FINISH_LOADING:
            return {
                ...state,
                loading: false,
            }

        default:
            return state;
    }
}