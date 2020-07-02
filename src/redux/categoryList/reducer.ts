import {
    CategoryListAction,
    categoryListActionTypes,
    CategoryListState,
} from './types';

const initialState: CategoryListState = {
    categories: undefined,
};

export default (
    state: CategoryListState = initialState,
    action: CategoryListAction
): CategoryListState => {
    switch (action.type) {
        case categoryListActionTypes.SAVE_CATEGORY_LIST:
            return { ...state, categories: action.payload.categories };

        default:
            return state;
    }
};
