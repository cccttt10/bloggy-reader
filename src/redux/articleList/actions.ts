import { VerboseArticle } from 'global';

import { articleListActionTypes, SaveArticleListAction } from './types';

export const saveArticleList = ({
    articles,
    count,
}: {
    articles: VerboseArticle[];
    count: number;
}): SaveArticleListAction => {
    return {
        type: articleListActionTypes.SAVE_ARTICLE_LIST,
        payload: { articles, count },
    };
};
