import { Button, Icon, Input, message, Modal } from 'antd';
import { IUser } from 'global';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { RootState } from '../../redux';
import { saveReader } from '../../redux/user/actions';
import { login, LoginRequestBody, LoginResponseBody } from '../../service/user';

interface OwnProps {
    setShowLogin: (showLogin: boolean) => void;
}

interface DispatchProps {
    saveReader: typeof saveReader;
}

const mapDispatchToProps = {
    saveReader,
};

interface StateProps {
    reader: IUser;
}

const mapStateToProps = (state: RootState): StateProps => ({
    reader: state.user.reader as IUser,
});

type LoginProps = OwnProps & DispatchProps & StateProps;

type LoginState = LoginRequestBody & {
    loading: boolean;
};

class Login extends Component<LoginProps, LoginState> {
    state = {
        email: '',
        password: '',
        loading: false,
    };

    login = async (): Promise<void> => {
        this.setState({ loading: true });
        const response = await login(this.state);
        this.setState({ loading: false });
        if (response.data) {
            const responseBody: LoginResponseBody = response.data;
            const readerInfo = responseBody.user;
            this.props.saveReader(readerInfo);
            this.props.setShowLogin(false);
            message.success('Login successful.');
        }
    };

    handleSubmit = (): void => {
        const emailReg = new RegExp(
            '^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$'
        );
        if (!this.state.email) {
            message.error('Please enter your email.');
        } else if (!emailReg.test(this.state.email)) {
            message.error('Invalid email.');
        } else if (!this.state.password) {
            message.error('Please enter your password.');
        } else {
            this.login();
        }
    };

    handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const key = e.target.name as 'email' | 'password';
        const newState = { ...this.state };
        newState[key] = e.target.value;
        this.setState(newState);
    };

    render(): JSX.Element {
        return (
            <Modal
                title="Login"
                style={{ top: '25%' }}
                visible={true}
                onCancel={(): void => this.props.setShowLogin(false)}
                width={400}
                footer={null}
            >
                <div className="login-input">
                    <Input
                        style={{ marginBottom: 20 }}
                        prefix={
                            <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                        }
                        name="email"
                        placeholder="Email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                    <Input
                        style={{ marginBottom: 40 }}
                        prefix={
                            <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                        }
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="login-submit">
                    <Button
                        style={{ width: '100%', marginBottom: '20px' }}
                        type="primary"
                        onClick={this.handleSubmit}
                        loading={this.state.loading}
                    >
                        Login
                    </Button>
                </div>
            </Modal>
        );
    }
}

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
    mapStateToProps,
    mapDispatchToProps
)(Login);
