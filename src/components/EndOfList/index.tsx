import React, { CSSProperties } from 'react';

const EndOfList: React.FC = props => {
    const style: CSSProperties = {
        color: '#999',
        textAlign: 'center',
        padding: 50,
        fontSize: 16,
    };
    return <div style={style}> --------- I have a bottom line :) --------- </div>;
};

export default EndOfList;
