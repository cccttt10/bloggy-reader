import {
    ArticleListAction,
    articleListActionTypes,
    ArticleListState,
} from './types';

const initialState: ArticleListState = {
    articles: undefined,
    count: 0,
};

export default (
    state: ArticleListState = initialState,
    action: ArticleListAction
): ArticleListState => {
    switch (action.type) {
        case articleListActionTypes.SAVE_ARTICLE_LIST:
            return {
                ...state,
                articles: action.payload.articles,
                count: action.payload.count,
            };

        default:
            return state;
    }
};
