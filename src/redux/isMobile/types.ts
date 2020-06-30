export interface IsMobileState {
    isMobile: boolean;
}

export const isMobileActionTypes = {
    SET_IS_MOBILE: 'SET_IS_MOBILE',
};

export interface SetIsMobileAction {
    type: typeof isMobileActionTypes.SET_IS_MOBILE;
    payload: {
        isMobile: boolean;
    };
}

export type IsMobileAction = SetIsMobileAction;
