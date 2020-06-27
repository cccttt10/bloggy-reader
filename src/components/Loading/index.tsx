import { Spin } from 'antd';
import React from 'react';

const Loading: React.FC = () => {
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

export default Loading;
