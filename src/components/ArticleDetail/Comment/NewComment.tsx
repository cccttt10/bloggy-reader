import './index.less';

import { Avatar, Input, notification } from 'antd';
import React, { Component } from 'react';
const { TextArea } = Input;
import { IArticle, IUser } from 'global';
import { connect } from 'react-redux';

import { RootState } from '../../../redux';
import { createComment } from '../../../service/comment';

interface OwnProps {
    articleId: IArticle['_id'];
}

interface DispatchProps {}

interface StateProps {
    reader: IUser | undefined;
}

const mapStateToProps = (state: RootState): StateProps => ({
    reader: state.user.reader,
});

type NewCommentProps = OwnProps & DispatchProps & StateProps;

interface NewCommentState {
    content: string;
}

class NewComment extends Component<NewCommentProps, NewCommentState> {
    state = { content: '' };

    handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        this.setState({ ...this.state, content: e.target.value });
    };

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    handleSubmit = (e: React.MouseEvent<HTMLElement, MouseEvent>): void => {
        this.submitComment();
    };

    submitComment = async (): Promise<void> => {
        if (this.state.content === '') {
            notification.error({ message: 'Comment cannot be empty.' });
        }
        if (!this.props.reader) {
            notification.error({ message: 'Please log in first.' });
        }
        const response = await createComment({
            articleId: this.props.articleId,
            content: this.state.content,
        });
        if (response.data) {
            notification.success({
                message: 'Comment submitted. Will be posted after approval.',
            });
        }
    };

    render(): JSX.Element {
        const { reader } = this.props;
        return (
            <div className="comment">
                <div className="avatar">
                    {reader ? (
                        <Avatar
                            className="auth-logo"
                            size={50}
                            src={reader.avatar}
                        />
                    ) : (
                        <Avatar className="auth-logo" size={50} icon="user" />
                    )}
                </div>
                <h3>{reader ? reader.name : ''}</h3>
                <TextArea
                    className="textarea"
                    name="content"
                    value={this.state.content}
                    onChange={this.handleChange}
                    placeholder="Pease be considerate and polite in your comment."
                    rows={4}
                />
                <div className="new-comment write-function-block">
                    <div onClick={this.handleSubmit} className="btn btn-send">
                        Submit
                    </div>
                </div>
            </div>
        );
    }
}

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
    mapStateToProps
)(NewComment);
