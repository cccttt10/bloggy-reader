import { IUser } from 'global';

import {
    LogoutReaderAction,
    SavePublisherAction,
    SaveReaderAction,
    userActionTypes,
} from './types';

export const logoutReader = (): LogoutReaderAction => {
    return {
        type: userActionTypes.LOGOUT_READER,
    };
};

export const saveReader = (reader: IUser): SaveReaderAction => {
    return {
        type: userActionTypes.SAVE_READER,
        payload: { reader },
    };
};

export const savePublisher = (publisher: IUser): SavePublisherAction => {
    return {
        type: userActionTypes.SAVE_PUBLISHER,
        payload: { publisher },
    };
};
