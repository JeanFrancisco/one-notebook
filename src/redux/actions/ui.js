import { UI_FINISH_LOADING, UI_START_LOADING } from "../constants/typesUi";

export const actionStartLoading = () => ({
    type: UI_START_LOADING,
});

export const actionFinishLoading = () => ({
    type: UI_FINISH_LOADING,
});