import { IArticle, IComment, VerboseComment } from 'global';
import { RequestResponse } from 'umi-request';

import service from './index';

const baseUrl = process.env.REACT_APP_API_URL;

export interface CreateCommentRequestBody {
    articleId: IArticle['_id'];
    content: IComment['content'];
}

export interface CreateCommentResponseBody {
    comment: IComment;
}

export const createComment = (
    requestBody: CreateCommentRequestBody
): Promise<RequestResponse<CreateCommentResponseBody>> => {
    return service(`${baseUrl}/createComment`, {
        method: 'POST',
        data: requestBody,
    });
};

export interface GetCommentListRequestBody {
    articleId: IArticle['_id'];
    isVisitor?: true;
}

export interface GetCommentListResponseBody {
    count: number;
    commentList: VerboseComment[];
}

export const getCommentList = (
    requestBody: GetCommentListRequestBody
): Promise<RequestResponse<GetCommentListResponseBody>> => {
    return service(`${baseUrl}/getCommentList`, {
        method: 'POST',
        data: requestBody,
    });
};
