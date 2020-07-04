import { IArticle, ICategory, IUser, VerboseArticle } from 'global';
import { RequestResponse } from 'umi-request';

import service from './index';

const baseUrl = process.env.REACT_APP_API_URL;

export interface GetArticleListRequestBody {
    user: IUser['_id'];
    isVisitor?: true;
    pagination?: {
        page: number; // default is 1
        limit: 5; // default is 5
    };
    filter?: {
        isAboutPage?: IArticle['isAboutPage'];
        isDraft?: IArticle['isDraft'];
        keyword?: string;
        categoryId?: ICategory['_id'];
    };
}

export interface GetArticleListResponseBody {
    count: number;
    articleList: VerboseArticle[];
}

export const getArticleList = (
    requestBody: GetArticleListRequestBody
): Promise<RequestResponse<GetArticleListResponseBody>> => {
    return service(`${baseUrl}/getArticleList`, {
        method: 'POST',
        data: requestBody,
    });
};

export interface GetArticleRequestBody {
    _id: IArticle['_id'];
    isVisitor: true;
}

export interface GetArticleListResponseBody {
    article: VerboseArticle;
}

export const getArticle = (
    requestBody: GetArticleRequestBody
): Promise<RequestResponse<GetArticleListResponseBody>> => {
    return service(`${baseUrl}/getArticle`, {
        method: 'POST',
        data: requestBody,
    });
};

export interface LikeArticleRequestBody {
    _id: IArticle['_id'];
}

export interface LikeArticleListResponseBody {
    article: VerboseArticle;
}

export const likeArticle = (
    requestBody: LikeArticleRequestBody
): Promise<RequestResponse<LikeArticleListResponseBody>> => {
    return service(`${baseUrl}/likeArticle`, {
        method: 'POST',
        data: requestBody,
    });
};
