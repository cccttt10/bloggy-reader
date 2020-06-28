import { ICategory } from 'global';

import { categoryListActionTypes, SaveCategoryListAction } from './types';

export const saveCategoryList = (
    categories: ICategory[]
): SaveCategoryListAction => {
    return {
        type: categoryListActionTypes.SAVE_CATEGORY_LIST,
        payload: { categories },
    };
};
