import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import Home from '../components/Home/';
import PublisherLayout from '../layout/PublisherLayout';
import { paths, RouteParams } from './constants';

const routers = [
    {
        path: `/${paths.PUBLISHER}/:${paths.PUBLISHER_ID}`,
        exact: true,
        render: (routeProps: RouteComponentProps<RouteParams>): JSX.Element => {
            return (
                <PublisherLayout {...routeProps}>
                    <Home {...routeProps} />
                </PublisherLayout>
            );
        },
    },
    {
        path: `/${paths.PUBLISHER}/:${paths.PUBLISHER_ID}/:${paths.PAGE}`,
        exact: true,
        render: (routeProps: RouteComponentProps<RouteParams>): JSX.Element => {
            return (
                <PublisherLayout {...routeProps}>
                    <Home {...routeProps} />
                </PublisherLayout>
            );
        },
    },
];

export default routers;
