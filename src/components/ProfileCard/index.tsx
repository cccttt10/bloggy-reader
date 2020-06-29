import './index.less';

import { Avatar } from 'antd';
import { ICategory, IUser } from 'global';
import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';

import { RootState } from '../../redux';
import { pageNames, paramNames, RouteParams } from '../../router/constants';

interface OwnProps {}

interface DispatchProps {}

interface StateProps {
    categoryList: ICategory[];
    publisher: IUser;
}

const mapStateToProps = (state: RootState): StateProps => ({
    categoryList: state.categoryList.categories as ICategory[],
    publisher: state.user.publisher as IUser,
});

type ProfileCardProps = OwnProps &
    DispatchProps &
    StateProps &
    RouteComponentProps<RouteParams>;

const ProfileCard: React.FC<ProfileCardProps> = props => {
    const currentUrl = props.match.url;
    const categoryTags: JSX.Element[] = props.categoryList.map(category => {
        return (
            <Link
                className="item"
                key={category._id}
                to={`${currentUrl}/${pageNames.ARTICLE_LIST}?${paramNames.CATEGORY_ID}=${category._id}`}
            >
                <span>{category.name}</span>
            </Link>
        );
    });
    return (
        <div className="right">
            <Avatar
                className="right-logo"
                src={props.publisher.avatar}
                size={130}
                icon="user"
            />
            <div className="title">{props.publisher.name}</div>
            <div className="right-content" />
            <div className="tags">
                <div className="title">Categories</div>
                {categoryTags}
            </div>
        </div>
    );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
    mapStateToProps
)(ProfileCard);
