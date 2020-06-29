import './index.less';

import { Button } from 'antd';
import { IUser } from 'global';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';

import { RootState } from '../../redux';
import { savePublisher } from '../../redux/user/actions';
import { pageNames, RouteParams } from '../../router/constants';
import animate from './animation';

interface OwnProps {}

interface DispatchProps {
    savePublisher: typeof savePublisher;
}

const mapDispatchToProps = {
    savePublisher,
};

interface StateProps {
    publisher: IUser;
}

const mapStateToProps = (state: RootState): StateProps => ({
    publisher: state.user.publisher as IUser,
});

type IndexProps = OwnProps &
    DispatchProps &
    StateProps &
    RouteComponentProps<RouteParams>;

class Index extends Component<IndexProps> {
    componentDidMount(): void {
        animate();
    }

    render(): JSX.Element {
        let currentUrl = this.props.match.url;
        // removing trailing slash if there is one
        if (currentUrl.charAt(currentUrl.length - 1) === '/') {
            currentUrl = currentUrl.substring(0, currentUrl.length - 1);
        }
        return (
            <div className="home">
                {' '}
                <canvas id="sakura" />
                <div className="content">
                    <div className="home-header">
                        <Link
                            className="link"
                            to={`${currentUrl}/${pageNames.HOME}`}
                        >
                            <img
                                className="avatar"
                                src={this.props.publisher.avatar}
                            />
                        </Link>
                    </div>
                    <div className="home-body">
                        <div className="list">
                            <Link
                                className="link"
                                to={`${currentUrl}/${pageNames.ARTICLE_LIST}`}
                            >
                                <Button icon="read" type="primary">
                                    文章
                                </Button>
                            </Link>
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className="link"
                                href={`https://github.com/chuntonggao`}
                            >
                                <Button icon="github" type="primary">
                                    GitHub
                                </Button>
                            </a>
                        </div>
                        <div className="introduce"> {this.props.publisher.bio} </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
    mapStateToProps,
    mapDispatchToProps
)(Index);
