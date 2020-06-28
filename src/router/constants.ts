export const paths = {
    PUBLISHER: 'publisher',
    PUBLISHER_ID: 'publisherId',
    PAGE: 'page',
};

export const pageNames = {
    HOME: 'home',
    ARTICLE_LIST: 'articleList',
    ARTICLE_DETAIL: 'articleDetail',
    ABOUT: 'about',
};

export type PageName =
    | typeof pageNames.HOME
    | typeof pageNames.ARTICLE_LIST
    | typeof pageNames.ARTICLE_DETAIL;

export interface RouteParams {
    publisherId: string;
    page: PageName;
}
