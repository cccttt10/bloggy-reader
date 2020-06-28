import { ICategory } from 'global';

export interface CategoryListState {
    categories: ICategory[] | undefined;
}

export const categoryListActionTypes = {
    SAVE_CATEGORY_LIST: 'SAVE_CATEGORY_LIST',
};

export interface SaveCategoryListAction {
    type: typeof categoryListActionTypes.SAVE_CATEGORY_LIST;
    payload: {
        categories: ICategory[];
    };
}

export type CategoryListAction = SaveCategoryListAction;
