import './index.less';

import { Button } from 'antd';
import { IUser, RouteParams } from 'global';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';

import { RootState } from '../../redux';
import { savePublisher } from '../../redux/user/actions';
import { endpoints, service } from '../../util/service';
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
}

const mapStateToProps = (state: RootState): StateProps => ({
    publisher: state.user.publisher as IUser,
});

type IndexProps = OwnProps &
    DispatchProps &
    StateProps &
    RouteComponentProps<RouteParams>;

interface IndexState {
    loading: boolean;
}

class Index extends Component<IndexProps, IndexState> {
    state = { loading: true };

    componentDidMount(): void {
        this.getPublisherInfo();
        animate();
    }

    getPublisherInfo = async (): Promise<void> => {
        this.setState({ loading: true });
        const publisherId = this.props.match.params.publisherId;
        const response = await service.post(endpoints.GET_USER, {
            _id: publisherId,
        });
        const publisherInfo: IUser = response.data.user;
        this.setState({ loading: false });
        this.props.savePublisher(publisherInfo);
    };

    render(): JSX.Element {
        if (this.state.loading === true || !this.props.publisher) {
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
