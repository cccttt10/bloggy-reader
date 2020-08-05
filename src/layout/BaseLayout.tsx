/*
This higher order component specifies the layout for all blog pages,
except for the home page.
For the home page, please use the Home component.
*/
import './index.less';
import './mobile.less';

import { BackTop, Layout } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import Nav from '../components/Nav/';
import ProfileCard from '../components/ProfileCard/';
import { RootState } from '../redux';
import { pageNames, RouteParams } from '../router/constants';
import constants from '../util/constants';
const { Content, Footer, Sider } = Layout;

interface OwnProps {}

interface DispatchProps {}

interface StateProps {
    isMobile: boolean;
}

const mapStateToProps = (state: RootState): StateProps => ({
    isMobile: state.isMobile.isMobile,
});

type BaseLayoutProps = OwnProps &
    DispatchProps &
    StateProps &
    RouteComponentProps<RouteParams>;

const BaseLayout: React.FC<BaseLayoutProps> = props => {
    let showProfileCard = false;
    const pageName = props.match.params.page;
    if (
        pageName !== pageNames.ARTICLE_DETAIL &&
        pageName !== pageNames.ABOUT &&
        !props.isMobile
    ) {
        showProfileCard = true;
    }
    const { history, location, match } = props;
    const routeProps = { history, location, match };
    return (
        <div className="Layouts">
            <div>
                <Nav {...routeProps} />
                <Layout className="layout">
                    <Content>
                        <Layout style={{ padding: '24px 0', background: '#fff' }}>
                            <Content
                                style={{ padding: '0 24px 0 0', minHeight: 280 }}
                            >
                                {props.children}
                            </Content>
                            {showProfileCard && (
                                <Sider width={350} style={{ background: '#fff' }}>
                                    <ProfileCard {...routeProps} />
                                </Sider>
                            )}
                        </Layout>
                    </Content>
                </Layout>
                <Footer style={{ textAlign: 'center', background: '#fff' }}>
                    <a href={constants.BLOGGY_PUBLISHER_BASE_URL}>
                        Bloggy Publisher
                    </a>{' '}
                    <br />
                    Bloggy ©2020 Created by Chuntong, Bolin, Max and Kerry
                </Footer>
                <BackTop />
            </div>
        </div>
    );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
    mapStateToProps
)(BaseLayout);
