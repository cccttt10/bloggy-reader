export interface LoadingState {
    loading: boolean;
}

export const loadingActionTypes = {
    SET_LOADING: 'SET_LOADING',
};

export interface SetLoadingAction {
    type: typeof loadingActionTypes.SET_LOADING;
    payload: {
        loading: boolean;
    };
}

export type LoadingAction = SetLoadingAction;
