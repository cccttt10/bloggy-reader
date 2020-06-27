import { LoadingAction, loadingActionTypes, LoadingState } from './types';

const initialState: LoadingState = {
    loading: false,
};

export default (
    state: LoadingState = initialState,
    action: LoadingAction
): LoadingState => {
    switch (action.type) {
        case loadingActionTypes.SET_LOADING:
            return {
                ...state,
                loading: action.payload.loading,
            };
        default:
            return state;
    }
};
