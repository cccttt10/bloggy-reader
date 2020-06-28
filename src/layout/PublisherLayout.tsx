/*
This higher order component will fetch the publisher's
user information, category list and first 10 articles.
If you need any of the above information in a component,
you should wrap PublisherLayout as an HOC outside of that component.
*/

import { ICategory, IUser } from 'global';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { RootState } from '../redux';
import { saveCategoryList } from '../redux/categoryList/actions';
import { savePublisher } from '../redux/user/actions';
import { RouteParams } from '../router/constants';
import { getCategoryList, GetCategoryListResponseBody } from '../service/category';
import { getUser, GetUserResponseBody } from '../service/user';

interface OwnProps {}

interface DispatchProps {
    saveCategoryList: typeof saveCategoryList;
    savePublisher: typeof savePublisher;
}

const mapDispatchToProps = {
    saveCategoryList,
    savePublisher,
};

interface StateProps {
    categoryList: ICategory[] | undefined;
    publisher: IUser | undefined;
}

const mapStateToProps = (state: RootState): StateProps => ({
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

    render(): React.ReactNode {
        if (this.state.ready) {
            return this.props.children;
        } else {
            return <span />;
        }
    }
}

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
    mapStateToProps,
    mapDispatchToProps
)(PublisherLayout);
