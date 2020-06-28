import {
    ArticleListAction,
    articleListActionTypes,
    ArticleListState,
} from './types';

const initialState: ArticleListState = {
    articles: undefined,
};

export default (
    state: ArticleListState = initialState,
    action: ArticleListAction
): ArticleListState => {
    switch (action.type) {
        case articleListActionTypes.SAVE_ARTICLE_LIST:
            if (state.articles === undefined) {
                return { ...state, articles: action.payload.articles };
            }
            return {
                ...state,
                articles: [...state.articles, ...action.payload.articles],
            };
        default:
            return state;
    }
};
