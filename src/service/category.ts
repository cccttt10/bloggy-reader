import { ICategory, IUser } from 'global';
import { RequestResponse } from 'umi-request';

import service from './index';

const baseUrl = process.env.REACT_APP_API_URL;

export interface GetCategoryListRequestBody {
    user: IUser['_id'];
}

export interface GetCategoryListResponseBody {
    count: number;
    categoryList: ICategory[];
}

export const getCategoryList = (
    requestBody: GetCategoryListRequestBody
): Promise<RequestResponse<GetCategoryListResponseBody>> => {
    return service(`${baseUrl}/getCategoryList`, {
        method: 'POST',
        data: requestBody,
    });
};
