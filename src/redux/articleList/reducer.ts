import {
    ArticleListAction,
    articleListActionTypes,
    ArticleListState,
} from './types';

const initialState: ArticleListState = {
    articles: [],
};

export default (
    state: ArticleListState = initialState,
    action: ArticleListAction
): ArticleListState => {
    switch (action.type) {
        case articleListActionTypes.SAVE_ARTICLE_LIST:
            return {
                ...state,
                articles: [...state.articles, ...action.payload.articles],
            };
        default:
            return state;
    }
};
