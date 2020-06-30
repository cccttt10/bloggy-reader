import './index.less';
import './index.less';

import { Col, Icon, Layout, Row } from 'antd';
import { IUser } from 'global';
import React from 'react';

import { PageName, pageNames } from '../../router/constants';
import NavLogo from './NavLogo';
const { Header } = Layout;

interface HeaderProps {
    activePage: PageName;
    publisher: IUser;
    setShowDrawer: (showDrawer: boolean) => void;
}

const MobileHeader: React.FC<HeaderProps> = props => {
    let navTitle = '';
    if (props.activePage === pageNames.ARTICLE_LIST) {
        navTitle = 'Articles';
    } else if (props.activePage === pageNames.ABOUT) {
        navTitle = 'About';
    }
    return (
        <Header
            className="header"
            style={{
                position: 'fixed',
                zIndex: 1,
                top: 0,
                width: '100%',
                height: '64px',
                float: 'left',
                backgroundColor: 'white',
                borderBottom: '1px solid #eee',
            }}
        >
            <Row className="container">
                <Col style={{ width: '25%', float: 'left', lineHeight: '64px' }}>
                    <NavLogo publisher={props.publisher} />
                </Col>
                <Col style={{ textAlign: 'center', width: '50%', float: 'left' }}>
                    <div className="nav-title"> {navTitle} </div>
                </Col>
                <Col style={{ textAlign: 'right', width: '25%', float: 'left' }}>
                    <div>
                        <Icon
                            type="bars"
                            onClick={(): void => props.setShowDrawer(true)}
                            style={{
                                fontSize: '40px',
                                marginRight: '10px',
                                marginTop: '10px',
                            }}
                        />
                    </div>
                </Col>
            </Row>
        </Header>
    );
};

export default MobileHeader;
