import cookieChecker from 'js-cookie';
import React, { Component } from 'react';

import { store } from '../redux';
import { saveReader } from '../redux/user/actions';
import { getCurrentUser, GetCurrentUserResponseBody } from '../service/user';

class AuthLayout extends Component {
    // eslint-disable-next-line react/no-deprecated
    componentWillMount(): void {
        this.fetchCurrentUser();
    }

    fetchCurrentUser = async (): Promise<void> => {
        const cookieExists: boolean =
            typeof cookieChecker.get('jwt') === 'string' &&
            (cookieChecker.get('jwt') as string).length > 0;
        if (cookieExists) {
            const response = await getCurrentUser();
            if (response.data) {
                const responseBody: GetCurrentUserResponseBody = response.data;
                store.dispatch(saveReader(responseBody.user));
            } else {
                cookieChecker.remove('jwt');
            }
        }
    };

    render(): React.ReactNode {
        return this.props.children;
    }
}

export default AuthLayout;
