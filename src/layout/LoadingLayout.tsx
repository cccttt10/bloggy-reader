import { Spin } from 'antd';
import React from 'react';
import { connect } from 'react-redux';

import { RootState } from '../redux';

interface OwnProps {}

interface DispatchProps {}

interface StateProps {
    loading: boolean;
}

const mapStateToProps = (state: RootState): StateProps => ({
    loading: state.loading.loading,
});

type LoadingLayoutProps = OwnProps & DispatchProps & StateProps;

const LoadingLayout: React.FC<LoadingLayoutProps> = props => {
    if (props.loading === false) {
        return props.children as JSX.Element;
    }
    const style: React.CSSProperties = {
        color: '#999',
        textAlign: 'center',
        padding: 50,
        fontSize: 16,
    };
    return (
        <div style={style}>
            <Spin size="large" />
        </div>
    );
};

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
    mapStateToProps
)(LoadingLayout);
