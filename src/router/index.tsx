import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Home from '../components/Home/';
import { paths, RouteParams } from './constants';

const routers = [
    {
        path: `/${paths.PUBLISHER}/:${paths.PUBLISHER_ID}`,
        exact: true,
        render: (routeProps: RouteComponentProps<RouteParams>): JSX.Element => {
            return <Home {...routeProps} />;
        },
    },
    {
        path: `/${paths.PUBLISHER}/:${paths.PUBLISHER_ID}/:${paths.PAGE}`,
        exact: true,
        render: (routeProps: RouteComponentProps<RouteParams>): JSX.Element => {
            return <Home {...routeProps} />;
        },
    },
];

export default routers;
