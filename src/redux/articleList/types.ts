import { VerboseArticle } from 'global';

export interface ArticleListState {
    articles: VerboseArticle[] | undefined; // articles fetched so far
    count: number; // total count of articles
}

export const articleListActionTypes = {
    SAVE_ARTICLE_LIST: 'SAVE_ARTICLE_LIST',
};

export interface SaveArticleListAction {
    type: typeof articleListActionTypes.SAVE_ARTICLE_LIST;
    payload: {
        articles: VerboseArticle[];
        count: number;
    };
}

export type ArticleListAction = SaveArticleListAction;
