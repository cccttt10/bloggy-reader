import { IUser } from 'global';

import { SavePublisherAction, SaveReaderAction, userActionTypes } from './types';

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
