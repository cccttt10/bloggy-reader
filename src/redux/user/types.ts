import { IUser } from 'global';

export interface UserState {
    reader: IUser | undefined;
    publisher: IUser | undefined;
}

export const userActionTypes = {
    SAVE_READER: 'SAVE_READER',
    SAVE_PUBLISHER: 'SAVE_PUBLISHER',
};

export interface SaveReaderAction {
    type: typeof userActionTypes.SAVE_READER;
    payload: {
        reader: IUser;
    };
}

export interface SavePublisherAction {
    type: typeof userActionTypes.SAVE_PUBLISHER;
    payload: {
        publisher: IUser;
    };
}

export type UserAction = SaveReaderAction | SavePublisherAction;
