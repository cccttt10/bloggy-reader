import './index.less';

import { IUser } from 'global';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { RootState } from '../../redux';
import { PageName, RouteParams } from '../../router/constants';
import DesktopHeader from './DesktopHeader';
import LoginModal from './LoginModal';
import MobileDrawer from './MobileDrawer';
import MobileHeader from './MobileHeader';
import RegisterModal from './RegisterModal';

interface OwnProps {}

interface DispatchProps {}

interface StateProps {
    reader: IUser | undefined;
    publisher: IUser;
    isMobile: boolean;
}

const mapStateToProps = (state: RootState): StateProps => ({
    publisher: state.user.publisher as IUser,
    reader: state.user.reader,
    isMobile: state.isMobile.isMobile,
});

type NavProps = OwnProps &
    DispatchProps &
    StateProps &
    RouteComponentProps<RouteParams>;

interface NavState {
    showLogin: boolean;
    showRegister: boolean;
    activePage: PageName;
    showDrawer: boolean;
}

class Nav extends Component<NavProps, NavState> {
    state = {
        showLogin: false,
        showRegister: false,
        activePage: this.props.match.params.page,
        showDrawer: false,
    };

    setShowDrawer = (showDrawer: boolean): void => this.setState({ showDrawer });

    setShowLogin = (showLogin: boolean): void => this.setState({ showLogin });

    setShowRegister = (showRegister: boolean): void =>
        this.setState({ showRegister });

    updateActivePage = (activePage: PageName): void => {
        this.setState({ ...this.state, activePage, showDrawer: false });
    };

    render(): JSX.Element {
        let header: JSX.Element;
        if (this.props.isMobile === true) {
            header = (
                <MobileHeader
                    activePage={this.state.activePage}
                    publisher={this.props.publisher}
                    setShowDrawer={this.setShowDrawer}
                />
            );
        } else {
            header = (
                <DesktopHeader
                    publisher={this.props.publisher}
                    reader={this.props.reader}
                    setShowLogin={this.setShowLogin}
                    setShowRegister={this.setShowRegister}
                    activePage={this.state.activePage}
                    updateActivePage={this.updateActivePage}
                />
            );
        }

        return (
            <div className="left">
                {header}
                {this.state.showDrawer && (
                    <MobileDrawer
                        publisher={this.props.publisher}
                        reader={this.props.reader}
                        setShowDrawer={this.setShowDrawer}
                        setShowLogin={this.setShowLogin}
                        setShowRegister={this.setShowRegister}
                        updateActivePage={this.updateActivePage}
                    />
                )}
                {this.state.showLogin && (
                    <LoginModal setShowLogin={this.setShowLogin} />
                )}
                {this.state.showRegister && (
                    <RegisterModal setShowRegister={this.setShowRegister} />
                )}
            </div>
        );
    }
}

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
    mapStateToProps
)(Nav);
