import { isMobileActionTypes, SetIsMobileAction } from './types';

export const setIsMobile = (isMobile: boolean): SetIsMobileAction => {
    return {
        type: isMobileActionTypes.SET_IS_MOBILE,
        payload: { isMobile },
    };
};
