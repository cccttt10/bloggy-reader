import React from 'react';
import Loadable from 'react-loadable';

import constants from './constants';

const loadingComponent = ({
    error,
    pastDelay,
}: {
    error: Error;
    pastDelay: number;
}): JSX.Element | null => {
    if (error) {
        return <div>Error!</div>;
    } else if (pastDelay) {
        return <div />;
    } else {
        return null;
    }
};

const routers = [
    {
        path: `/${constants.PUBLISHER}/:${constants.PUBLISHER_ID}`,
        exact: true,
        component: Loadable({
            loader: () => import('../components/Home/index'),
            loading: loadingComponent,
            delay: 300,
        }),
    },
];

export default routers;
