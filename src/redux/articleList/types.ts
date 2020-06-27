import { IArticle } from 'global';

export interface ArticleListState {
    articles: IArticle[];
}

export const articleListActionTypes = {
    SAVE_ARTICLE_LIST: 'SAVE_ARTICLE_LIST',
};

export interface SaveArticleListAction {
    type: typeof articleListActionTypes.SAVE_ARTICLE_LIST;
    payload: {
        articles: IArticle[];
    };
}

export type ArticleListAction = SaveArticleListAction;
