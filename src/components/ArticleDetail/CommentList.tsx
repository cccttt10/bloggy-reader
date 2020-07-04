import './index.less';

import { Avatar } from 'antd';
import { VerboseComment } from 'global';
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { formatTimeStamp } from '../../util/formatTimeStamp';

interface CommentListProps {
    comments: VerboseComment[];
}

const CommentList: React.FC<CommentListProps> = props => {
    const commentsJSX: JSX.Element[] = props.comments.map(comment => (
        <ReactCSSTransitionGroup
            key={comment._id}
            transitionName="example"
            transitionAppear={true}
            transitionAppearTimeout={1000}
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}
        >
            <div className="item">
                <div className="item-header">
                    <div className="author">
                        <div className="avator">
                            <Avatar
                                size="large"
                                icon="user"
                                src={comment.user.avatar}
                            />
                        </div>
                    </div>
                    <div className="info">
                        <div className="name">{comment.user.name}</div>
                        <div className="time">
                            {comment.createdOn
                                ? formatTimeStamp(comment.createdOn, true)
                                : ''}
                        </div>
                    </div>
                </div>
                <div className="comment-detail">{comment.content}</div>
            </div>
        </ReactCSSTransitionGroup>
    ));

    return (
        <div className="comment-list">
            <div className="top-title">
                <span>{props.comments.length} comments</span>
            </div>
            {commentsJSX}
        </div>
    );
};

export default CommentList;
