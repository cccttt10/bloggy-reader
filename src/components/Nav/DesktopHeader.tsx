import './index.less';

import { Avatar, Button, Col, Icon, Layout, Menu, Row } from 'antd';
import { IUser } from 'global';
import React from 'react';
import { Link } from 'react-router-dom';

import { store } from '../../redux/index';
import { logoutReader } from '../../redux/user/actions';
import { PageName } from '../../router/constants';
import navItems from './navItems';
import NavLogo from './NavLogo';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

interface DesktopHeaderProps {
    publisher: IUser;
    reader: IUser | undefined;
    setShowLogin: (showLogin: boolean) => void;
    setShowRegister: (showRegister: boolean) => void;
    activePage: PageName;
}

const DeskTopHeader: React.FC<DesktopHeaderProps> = props => {
    const navItemsJSX: JSX.Element[] = navItems.map(navItem => {
        return (
            <Menu.Item key={navItem.key}>
                <Link to={navItem.to}>
                    <Icon type={navItem.icon} theme="outlined" />
                    {navItem.displayName}
                </Link>
            </Menu.Item>
        );
    });

    return (
        <Header
            className="header"
            style={{
                position: 'fixed',
                zIndex: 1,
                top: 0,
                width: '100%',
                minWidth: '1200px',
                height: '66px',
                float: 'left',
                backgroundColor: 'white',
                borderBottom: '1px solid #eee',
            }}
        >
            <Row className="container">
                <Col style={{ width: '120px', float: 'left' }}>
                    <NavLogo publisher={props.publisher} />
                </Col>
                <Col style={{ width: '780px', float: 'left' }}>
                    <Menu
                        theme="light"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        // onClick={this.handleMenu}
                        selectedKeys={[props.activePage]}
                        style={{ lineHeight: '64px', borderBottom: 'none' }}
                    >
                        {navItemsJSX}
                    </Menu>
                </Col>
                <Col style={{ textAlign: 'right', width: '300px', float: 'left' }}>
                    {props.reader ? (
                        <Menu
                            style={{
                                width: 220,
                                lineHeight: '64px',
                                display: 'inline-block',
                            }}
                            mode="horizontal"
                        >
                            <SubMenu
                                title={
                                    <span className="submenu-title-wrapper">
                                        <Avatar
                                            size="large"
                                            icon="user"
                                            src={props.reader.avatar}
                                            style={{ marginRight: 5 }}
                                        />
                                        {props.reader.name}
                                    </span>
                                }
                            >
                                <MenuItemGroup>
                                    <Menu.Item
                                        onClick={() =>
                                            store.dispatch(logoutReader())
                                        }
                                        key="logout"
                                    >
                                        Log out
                                    </Menu.Item>
                                </MenuItemGroup>
                            </SubMenu>
                        </Menu>
                    ) : (
                        <div>
                            <Button
                                type="primary"
                                icon="login"
                                style={{ marginRight: '15px' }}
                                onClick={(): void => props.setShowLogin(true)}
                            >
                                Log in
                            </Button>
                            <Button
                                type="primary"
                                icon="logout"
                                style={{ marginRight: '15px' }}
                                onClick={(): void => props.setShowRegister(true)}
                            >
                                Register
                            </Button>
                        </div>
                    )}
                </Col>
            </Row>
        </Header>
    );
};

export default DeskTopHeader;
