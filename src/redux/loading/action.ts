import { loadingActionTypes, SetLoadingAction } from './types';

export const setLoading = (loading: boolean): SetLoadingAction => {
    return {
        type: loadingActionTypes.SET_LOADING,
        payload: { loading },
    };
};
