import cookieChecker from 'js-cookie';

import {
    SavePublisherAction,
    SaveReaderAction,
    UserAction,
    userActionTypes,
    UserState,
} from './types';

const initialState: UserState = {
    reader: undefined,
    publisher: undefined,
};

export default (state: UserState = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case userActionTypes.LOGOUT_READER:
            cookieChecker.remove('jwt');
            return {
                ...state,
                reader: undefined,
            };
        case userActionTypes.SAVE_READER:
            return {
                ...state,
                reader: (action as SaveReaderAction).payload.reader,
            };
        case userActionTypes.SAVE_PUBLISHER:
            return {
                ...state,
                publisher: (action as SavePublisherAction).payload.publisher,
            };
        default:
            return state;
    }
};
