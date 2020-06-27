import './index.less';

import { Button } from 'antd';
import { IUser, RouteParams } from 'global';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';

import { RootState } from '../../redux';
import { savePublisher } from '../../redux/user/actions';
import { getUser, GetUserResponseBody } from '../../service/user';
import Loading from '../Loading';
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
    loading: boolean;
}

const mapStateToProps = (state: RootState): StateProps => ({
    publisher: state.user.publisher as IUser,
    loading: state.loading.loading,
});

type IndexProps = OwnProps &
    DispatchProps &
    StateProps &
    RouteComponentProps<RouteParams>;

class Index extends Component<IndexProps> {
    componentDidMount(): void {
        if (!this.props.publisher) {
            this.getPublisherInfo();
        }
        animate();
    }

    getPublisherInfo = async (): Promise<void> => {
        const publisherId = this.props.match.params.publisherId;
        const response = await getUser({ _id: publisherId });
        if (response.data) {
            const responseBody: GetUserResponseBody = response.data;
            const publisherInfo: IUser = responseBody.user;
            this.props.savePublisher(publisherInfo);
        }
    };

    render(): JSX.Element {
        if (this.props.loading === true || !this.props.publisher) {
            return (
                <div className="home">
                    {' '}
                    <canvas id="sakura" />
                    <Loading />
                </div>
            );
        }
        const currentUrl = this.props.match.url;
        return (
            <div className="home">
                {' '}
                <canvas id="sakura" />
                <div className="content">
                    <div className="home-header">
                        <Link className="link" to={`${currentUrl}/home`}>
                            <img
                                className="avatar"
                                src={this.props.publisher.avatar}
                            />
                        </Link>
                    </div>
                    <div className="home-body">
                        <div className="list">
                            <Link className="link" to={`${currentUrl}/articles`}>
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
