import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import ArticleList from '../components/ArticleList';
import Home from '../components/Home/';
import BaseLayout from '../layout/BaseLayout';
import PublisherLayout from '../layout/PublisherLayout';
import { pageNames, paths, RouteParams } from './constants';

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
            switch (routeProps.match.params.page) {
                case pageNames.HOME:
                    return (
                        <PublisherLayout {...routeProps}>
                            <Home {...routeProps} />
                        </PublisherLayout>
                    );
                case pageNames.ARTICLE_LIST:
                    return (
                        <PublisherLayout {...routeProps}>
                            <BaseLayout {...routeProps}>
                                <ArticleList {...routeProps} />
                            </BaseLayout>
                        </PublisherLayout>
                    );
                default:
                    return (
                        <PublisherLayout {...routeProps}>
                            <Home {...routeProps} />
                        </PublisherLayout>
                    );
            }
        },
    },
];

export default routers;
