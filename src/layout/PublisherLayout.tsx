/*
This higher order component will fetch the publisher's
user information, category list and first 10 articles.
If you need any of the above information in a component,
you should wrap PublisherLayout as an HOC outside of that component.
*/

import { ICategory, IUser, VerboseArticle } from 'global';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { RootState } from '../redux';
import { saveArticleList } from '../redux/articleList/actions';
import { saveCategoryList } from '../redux/categoryList/actions';
import { savePublisher } from '../redux/user/actions';
import { pageNames, RouteParams } from '../router/constants';
import { getArticleList, GetArticleListResponseBody } from '../service/article';
import { getCategoryList, GetCategoryListResponseBody } from '../service/category';
import { getUser, GetUserResponseBody } from '../service/user';

interface OwnProps {}

interface DispatchProps {
    saveArticleList: typeof saveArticleList;
    saveCategoryList: typeof saveCategoryList;
    savePublisher: typeof savePublisher;
}

const mapDispatchToProps = {
    saveArticleList,
    saveCategoryList,
    savePublisher,
};

interface StateProps {
    articleList: VerboseArticle[] | undefined;
    categoryList: ICategory[] | undefined;
    publisher: IUser | undefined;
}

const mapStateToProps = (state: RootState): StateProps => ({
    articleList: state.articleList.articles,
    categoryList: state.categoryList.categories,
    publisher: state.user.publisher,
});

type PublisherLayoutProps = OwnProps &
    DispatchProps &
    StateProps &
    RouteComponentProps<RouteParams>;

interface PublisherLayoutState {
    ready: boolean;
}

class PublisherLayout extends Component<PublisherLayoutProps, PublisherLayoutState> {
    state = { ready: false };

    // eslint-disable-next-line react/no-deprecated
    componentWillMount(): void {
        if (this.props.publisher === undefined) {
            this.initPublisher();
        } else if (this.props.categoryList === undefined) {
            this.initCategoryList();
        } else if (this.props.articleList === undefined) {
            this.initArticleList();
        } else {
            this.setState({ ready: true });
        }
    }

    initPublisher = async (): Promise<void> => {
        const publisherId = this.props.match.params.publisherId;
        const response = await getUser({ _id: publisherId });
        if (response.data) {
            const responseBody: GetUserResponseBody = response.data;
            const publisher: IUser = responseBody.user;
            this.props.savePublisher(publisher);
        }
    };

    initCategoryList = async (): Promise<void> => {
        const publisherId = this.props.match.params.publisherId;
        const response = await getCategoryList({ user: publisherId });
        if (response.data) {
            const responseBody: GetCategoryListResponseBody = response.data;
            const categoryList: ICategory[] = responseBody.categoryList;
            this.props.saveCategoryList(categoryList);
        }
    };

    initArticleList = async (): Promise<void> => {
        const publisherId = this.props.match.params.publisherId;
        const response = await getArticleList({
            user: publisherId,
        });
        if (response.data) {
            const responseBody: GetArticleListResponseBody = response.data;
            const articleList: VerboseArticle[] = responseBody.articleList;
            const count: number = responseBody.count;
            this.props.saveArticleList({ articles: articleList, count });
        }
    };

    render(): React.ReactNode {
        if (this.state.ready) {
            const pageName = this.props.match.params.page;
            let pageTitle = this.props.publisher ? this.props.publisher.name : '';
            if (pageName === pageNames.ARTICLE_LIST) {
                pageTitle += ' - Articles';
            } else if (pageName === pageNames.ABOUT) {
                pageTitle += ' - About';
            }
            return (
                <React.Fragment>
                    <Helmet>
                        <title>{pageTitle}</title>
                    </Helmet>
                    {this.props.children}
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <Helmet>
                        <title>Bloggy Reader</title>
                    </Helmet>
                    <span />;
                </React.Fragment>
            );
        }
    }
}

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
    mapStateToProps,
    mapDispatchToProps
)(PublisherLayout);
