import { IArticle } from 'global';

import { articleListActionTypes, SaveArticleListAction } from './types';

export const saveArticlesList = (articles: IArticle[]): SaveArticleListAction => {
    return {
        type: articleListActionTypes.SAVE_ARTICLE_LIST,
        payload: { articles },
    };
};
