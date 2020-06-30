/* eslint-disable no-console */
import { notification } from 'antd';
import { extend } from 'umi-request';

import { store } from '../redux';
import { setLoading } from '../redux/loading/actions';

const codeMessage: { [code: number]: string } = {
    200: 'The request has succeeded and the server has returned requested data.',
    201: 'The request has succeeded and a resource has been created or modified as a result.',
    202: 'The request has been received but not yet acted upon.',
    204: 'Deletion has succeeded',
    400: 'The server could not understand the request due to invalid syntax.',
    401: 'The client must authenticate itself to get the requested response.',
    403: 'The client does not have access rights to the content.',
    404: 'The server can not find the requested resource.',
    406: 'The server cannot find any content that conforms to the criteria given by the user agent.',
    410: 'The content has been permanently deleted from the server, with no forwarding address.',
    422: 'The request was well-formed but was unable to be followed due to semantic errors.',
    500: 'The server has encountered a situation it does not know how to handle.',
    502: 'Bad gateway',
    503: 'Service unavailable: The server is down for maintenance or is overloaded.',
    504: 'Gateway timeout',
};

const errorHandler = (error: {
    response: Response;
    // eslint-disable-next-line @typescript-eslint/ban-types
    data: string | object;
}): Response => {
    const { response, data } = error;
    const errorMessage: string = data as string;
    if (response && response.status) {
        const errorText = errorMessage || codeMessage[response.status];
        const { status, url } = response;
        notification.error({
            message: `Request error: ${status}: ${url}`,
            description: errorText,
        });
    } else if (!response) {
        notification.error({
            description: 'Your Internet has a problem. Cannot connect to the server',
            message: 'Network error',
        });
        store.dispatch(setLoading(false));
    }
    return response;
};

const service = extend({
    errorHandler, // default error handler
    credentials: 'include', // include cookies in requests
    getResponse: true,
});

service.use(async (context, next) => {
    store.dispatch(setLoading(true));
    await next();
    store.dispatch(setLoading(false));
});

export default service;
