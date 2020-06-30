import { IsMobileAction, isMobileActionTypes, IsMobileState } from './types';

const initialState: IsMobileState = {
    isMobile: false,
};

export default (
    state: IsMobileState = initialState,
    action: IsMobileAction
): IsMobileState => {
    switch (action.type) {
        case isMobileActionTypes.SET_IS_MOBILE:
            return {
                ...state,
                isMobile: action.payload.isMobile,
            };
        default:
            return state;
    }
};
