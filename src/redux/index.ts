import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers, createStore, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import articleListReducer from './articleList/reducer';
import userReducer from './user/reducer';

export const history = createBrowserHistory();

const createRootReducer = (history: ReturnType<typeof createBrowserHistory>) =>
    combineReducers({
        user: userReducer,
        articleList: articleListReducer,
        router: connectRouter(history),
    });

const rootReducer = createRootReducer(history);

export type RootState = ReturnType<typeof rootReducer>;

export const configureStore = () => {
    const middlewares: Middleware[] = [routerMiddleware(history)];
    const middleWareEnhancer = applyMiddleware(...middlewares);
    const store = createStore(rootReducer, composeWithDevTools(middleWareEnhancer));

    return store;
};
