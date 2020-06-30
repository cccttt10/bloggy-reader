import './index.less';

import { Drawer, Icon } from 'antd';
import { IUser } from 'global';
import React from 'react';
import { Link } from 'react-router-dom';

import { store } from '../../redux';
import { logoutReader } from '../../redux/user/actions';
import navItems from './navItems';

interface MobileDrawerProps {
    reader: IUser | undefined;
    setShowDrawer: (showDrawer: boolean) => void;
    setShowLogin: (showLogin: boolean) => void;
    setShowRegister: (showRegister: boolean) => void;
}

const MobileDrawer: React.FC<MobileDrawerProps> = props => {
    const navItemsJSX: JSX.Element[] = navItems.map(navItem => {
        return (
            <p key={navItem.key} onClick={(): void => props.setShowDrawer(false)}>
                <Link to={navItem.to}>
                    <Icon type={navItem.icon}></Icon>
                    {` ${navItem.displayName}`}
                </Link>
            </p>
        );
    });

    let userOperation: JSX.Element;
    if (props.reader) {
        userOperation = (
            <div
                onClick={(): void => {
                    store.dispatch(logoutReader());
                    props.setShowDrawer(false);
                }}
            >
                <p>{props.reader.name}</p>
                <p>
                    <Icon type="logout" /> Logout
                </p>
            </div>
        );
    } else {
        userOperation = (
            <div>
                <p
                    onClick={(): void => {
                        props.setShowLogin(true);
                        props.setShowDrawer(false);
                    }}
                >
                    <Icon type="login" /> Login
                </p>
                <p
                    onClick={(): void => {
                        props.setShowRegister(true);
                        props.setShowDrawer(false);
                    }}
                >
                    <Icon type="user" /> Register
                </p>
            </div>
        );
    }

    return (
        <Drawer
            placement="top"
            closable={false}
            onClose={(): void => props.setShowDrawer(false)}
            visible={true}
            height={420}
        >
            <div className="drawer">
                {navItemsJSX} {userOperation}
            </div>
        </Drawer>
    );
};

export default MobileDrawer;
