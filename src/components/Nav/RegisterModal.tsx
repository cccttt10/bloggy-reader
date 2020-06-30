import { Button, Icon, Input, message, Modal } from 'antd';
import { IUser } from 'global';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { RootState } from '../../redux';
import { saveReader } from '../../redux/user/actions';
import {
    register,
    RegisterRequestBody,
    RegisterResponseBody,
} from '../../service/user';

interface OwnProps {
    setShowRegister: (showRegister: boolean) => void;
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

type RegisterProps = OwnProps & DispatchProps & StateProps;

type RegisterState = RegisterRequestBody & {
    loading: boolean;
};

class Register extends Component<RegisterProps, RegisterState> {
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        phone: '',
        loading: false,
    };

    register = async (): Promise<void> => {
        this.setState({ loading: true });
        const response = await register(this.state);
        this.setState({ loading: false });
        if (response.data) {
            const responseBody: RegisterResponseBody = response.data;
            const readerInfo = responseBody.user;
            this.props.saveReader(readerInfo);
            this.props.setShowRegister(false);
            message.success('Registration successful.');
        }
    };

    handleSubmit = (): void => {
        const emailReg = new RegExp(
            '^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$'
        );
        const phoneReg = /^\d+$/;
        if (!this.state.email) {
            message.error('Please enter your email.');
        } else if (!emailReg.test(this.state.email)) {
            message.error('Invalid email.');
        } else if (!this.state.name) {
            message.error('Please enter your name.');
        } else if (!this.state.password) {
            message.error('Please enter your password.');
        } else if (!this.state.confirmPassword) {
            message.error('Please confirm your password.');
        } else if (this.state.password !== this.state.confirmPassword) {
            message.error(`Your passwords don't match.`);
        } else if (this.state.phone && !phoneReg.test(this.state.phone)) {
            message.error('Invalid phone number.');
        } else {
            this.register();
        }
    };

    handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const key = e.target.name as
            | 'email'
            | 'password'
            | 'confirmPassword'
            | 'name'
            | 'phone';
        const newState = { ...this.state };
        newState[key] = e.target.value;
        this.setState(newState);
    };

    render(): JSX.Element {
        return (
            <Modal
                title="Register"
                style={{ top: '18%' }}
                visible={true}
                onCancel={(): void => this.props.setShowRegister(false)}
                width={500}
                footer={null}
            >
                <div className="register-input">
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
                        style={{ marginBottom: 20 }}
                        prefix={
                            <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                        }
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                    />

                    <Input
                        style={{ marginBottom: 20 }}
                        prefix={
                            <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                        }
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={this.state.confirmPassword}
                        onChange={this.handleChange}
                    />
                    <Input
                        style={{ marginBottom: 20 }}
                        prefix={
                            <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                        }
                        name="name"
                        placeholder="Name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />

                    <Input
                        style={{ marginBottom: 20 }}
                        prefix={
                            <Icon
                                type="phone"
                                style={{ color: 'rgba(0,0,0,.25)' }}
                            />
                        }
                        name="phone"
                        placeholder="Phone"
                        value={this.state.phone}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="register-submit">
                    <Button
                        style={{ width: '100%', marginBottom: '20px' }}
                        type="primary"
                        onClick={this.handleSubmit}
                        loading={this.state.loading}
                    >
                        Register
                    </Button>
                </div>
            </Modal>
        );
    }
}

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
    mapStateToProps,
    mapDispatchToProps
)(Register);
