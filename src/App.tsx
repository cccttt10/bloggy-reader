import { ConnectedRouter, RouterState } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router';
import { throttle } from 'throttle-debounce';

import AuthLayout from './layout/AuthLayout';
import LoadingLayout from './layout/LoadingLayout';
import { RootState, store } from './redux';
import { setIsMobile } from './redux/isMobile/actions';
import routers from './router';
import { isMobile } from './util/responsive';

interface OwnProps {
    history: ReturnType<typeof createBrowserHistory>;
}

interface DispatchProps {}

interface StateProps {
    loading: boolean;
    router: RouterState<unknown>;
}

const mapStateToProps = (state: RootState): StateProps => ({
    loading: state.loading.loading,
    router: state.router,
});

type AppProps = OwnProps & DispatchProps & StateProps;

class App extends Component<AppProps> {
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    resetIsMobile = () => store.dispatch(setIsMobile(isMobile()));

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    resize = () => throttle(500, this.resetIsMobile)();

    componentDidMount(): void {
        window.addEventListener('resize', this.resize);
    }

    componentWillUnmount(): void {
        window.removeEventListener('resize', this.resize);
    }
    render(): JSX.Element {
        return (
            <ConnectedRouter history={this.props.history}>
                <AuthLayout>
                    <LoadingLayout>
                        <Switch>
                            {routers.map((r, key) => (
                                <Route
                                    render={r.render}
                                    exact={r.exact}
                                    key={key}
                                    path={r.path}
                                />
                            ))}
                        </Switch>
                    </LoadingLayout>
                </AuthLayout>
            </ConnectedRouter>
        );
    }
}

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
    mapStateToProps
)(App);
