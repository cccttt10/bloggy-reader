import { RouteParams } from 'global';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Home from '../components/Home/';
import constants from './constants';

const routers = [
    {
        path: `/${constants.PUBLISHER}/:${constants.PUBLISHER_ID}`,
        exact: true,
        render: (routeProps: RouteComponentProps<RouteParams>): JSX.Element => {
            return <Home {...routeProps} />;
        },
    },
    {
        path: `/${constants.PUBLISHER}/:${constants.PUBLISHER_ID}/:${constants.PAGE}`,
        exact: true,
        render: (routeProps: RouteComponentProps<RouteParams>): JSX.Element => {
            return <Home {...routeProps} />;
        },
    },
];

export default routers;
