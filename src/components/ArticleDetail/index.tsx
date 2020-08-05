/* eslint-disable max-lines */
import './index.less';
import './marked.css';

import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Avatar, Button, Icon, notification } from 'antd';
import { IArticle, IUser, VerboseArticle, VerboseComment } from 'global';
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { RootState } from '../../redux';
import { paramNames, paths, RouteParams } from '../../router/constants';
import {
    getArticle,
    GetArticleResponseBody,
    likeArticle,
} from '../../service/article';
import { getCommentList, GetCommentListResponseBody } from '../../service/comment';
import { formatTimeStamp } from '../../util/formatTimeStamp';
import markdown from '../../util/markdown';
import { getQueryStringByName } from '../../util/queryString';
import Loading from '../Loading';
import CommentList from './Comment/CommentList';
import NewComment from './Comment/NewComment';

interface OwnProps {
    isAboutPage?: boolean;
}

interface DispatchProps {}

interface StateProps {
    publisher: IUser;
    reader: IUser | undefined;
    isMobile: boolean;
    articleList: VerboseArticle[];
}

const mapStateToProps = (state: RootState): StateProps => ({
    publisher: state.user.publisher as IUser,
    reader: state.user.reader,
    isMobile: state.isMobile.isMobile,
    articleList: state.articleList.articles as VerboseArticle[],
});

type ArticleDetailProps = OwnProps &
    DispatchProps &
    StateProps &
    RouteComponentProps<RouteParams>;

type VerboseMarkdownArticle = VerboseArticle & { toc: string };

interface ArticleDetailState {
    articleId: IArticle['_id'];
    article: VerboseMarkdownArticle | undefined;
    comments: VerboseComment[] | undefined;
    loadingComments: boolean;
    loadingArticle: boolean;
    likeLoading: boolean;
}

class ArticleDetail extends Component<ArticleDetailProps, ArticleDetailState> {
    constructor(props: ArticleDetailProps) {
        super(props);
        let articleId = '';
        if (this.props.isAboutPage) {
            const filteredList = this.props.articleList.filter(
                article => article.isAboutPage
            );
            if (filteredList.length === 0) {
                notification.warn({ message: 'About page is under construction.' });
                this.props.history.push(
                    `/${paths.PUBLISHER}/${this.props.publisher._id}`
                );
            } else {
                articleId = filteredList[0]._id;
            }
        } else {
            articleId = getQueryStringByName(paramNames.ARTICLE_ID) as string;
        }
        this.state = {
            articleId,
            article: undefined,
            comments: undefined,
            loadingComments: true,
            loadingArticle: true,
            likeLoading: false,
        };
    }

    componentDidMount(): void {
        if (this.state.articleId !== '') {
            this.fetchArticle();
            this.fetchComments();
        }
    }

    fetchArticle = async (): Promise<void> => {
        const response = await getArticle({
            _id: this.state.articleId as string,
            isVisitor: true,
        });
        if (response.data) {
            const responseBody: GetArticleResponseBody = response.data;
            const article: VerboseMarkdownArticle = {
                ...responseBody.article,
                toc: '',
            };

            const markdownProcessor = await markdown.marked(article.content);
            article.content = markdownProcessor ? markdownProcessor.content : '';
            article.toc = markdownProcessor ? markdownProcessor.toc : '';
            this.setState({
                ...this.state,
                article: article,
                loadingArticle: false,
            });
        }
    };

    fetchComments = async (): Promise<void> => {
        const response = await getCommentList({
            articleId: this.state.articleId as string,
        });
        if (response.data) {
            const responseBody: GetCommentListResponseBody = response.data;
            this.setState({
                ...this.state,
                comments: responseBody.commentList,
                loadingComments: false,
            });
        }
    };

    handleLike = (): void => {
        this.submitLike();
    };

    submitLike = async (): Promise<void> => {
        this.setState({ ...this.state, likeLoading: true });
        const response = await likeArticle({
            _id: this.state.articleId as string,
        });
        if (response.data) {
            notification.success({ message: 'Liked!' });
        }
        this.setState({ ...this.state, likeLoading: false });
    };

    render(): JSX.Element {
        if (this.state.loadingArticle || this.state.loadingComments) {
            return (
                <React.Fragment>
                    <Helmet>
                        <title>Bloggy Reader</title>
                    </Helmet>
                    <Loading />
                </React.Fragment>
            );
        }
        const width = this.props.isMobile ? '100%' : '75%';
        const article = (this.state.article as unknown) as VerboseMarkdownArticle;
        const comments = (this.state.comments as unknown) as VerboseComment[];
        const categoriesJSX = article.categories.map(category => (
            <span key={category._id} className="tag">
                {category.name}
            </span>
        ));
        const alreadyLiked =
            this.state.article &&
            this.state.article.likedBy &&
            this.props.reader &&
            typeof this.props.reader._id === 'string' &&
            this.state.article.likedBy.includes(this.props.reader._id);
        return (
            <React.Fragment>
                <Helmet>
                    <title>{article.title}</title>
                </Helmet>
                <div className="article clearfix">
                    <div className="detail fl" style={{ width: width }}>
                        <div className="header">
                            <div className="title">{article.title}</div>
                            <div className="author">
                                <div className="avatar">
                                    <Avatar
                                        className="auth-logo"
                                        src={article.author.avatar}
                                        size={50}
                                        icon="user"
                                    />
                                </div>{' '}
                                <div className="info">
                                    <span className="name">
                                        <span>{article.author.name}</span>
                                    </span>
                                    <div
                                        props-data-classes="user-follow-button-header"
                                        data-author-follow-button=""
                                    />
                                    <div className="meta">
                                        <span className="publish-time">
                                            {article.createdOn
                                                ? formatTimeStamp(
                                                      article.createdOn,
                                                      true
                                                  )
                                                : ''}
                                        </span>
                                        <span className="wordage">
                                            {' '}
                                            {article.wordCount} Words{' '}
                                        </span>
                                        <span className="views-count">
                                            {' '}
                                            <Icon type="eye" theme="outlined" />{' '}
                                            {article.meta
                                                ? article.meta.numViews
                                                : '-'}{' '}
                                        </span>
                                        <span className="comments-count">
                                            {' '}
                                            <Icon
                                                type="message"
                                                theme="outlined"
                                            />{' '}
                                            {article.meta
                                                ? article.meta.numComments
                                                : '-'}{' '}
                                        </span>
                                        <span className="likes-count">
                                            {' '}
                                            <Icon
                                                type="heart"
                                                theme="outlined"
                                            />{' '}
                                            {article.meta
                                                ? article.meta.numLikes
                                                : '-'}{' '}
                                        </span>
                                    </div>
                                </div>
                                <div className="tags " title="Categories">
                                    <Icon type="tags" theme="outlined" />
                                    {categoriesJSX}
                                </div>
                                <span className="clearfix" />
                            </div>
                        </div>

                        <div className="content">
                            <div
                                id="content"
                                className="article-detail"
                                dangerouslySetInnerHTML={{
                                    __html: article.content ? article.content : '',
                                }}
                            />
                        </div>
                        <div className="heart">
                            {alreadyLiked ? (
                                <Button
                                    type="danger"
                                    size="large"
                                    loading={this.state.likeLoading}
                                    onClick={this.handleLike}
                                >
                                    <HeartFilled />
                                    Liked
                                </Button>
                            ) : (
                                <Button
                                    type="danger"
                                    size="large"
                                    loading={this.state.likeLoading}
                                    onClick={this.handleLike}
                                >
                                    <HeartOutlined />
                                    Like
                                </Button>
                            )}
                        </div>
                        <NewComment articleId={article._id} />
                        <CommentList comments={comments} />
                    </div>
                    {!this.props.isMobile ? (
                        <div
                            style={{ width: '23%' }}
                            className="article-right fr anchor"
                            dangerouslySetInnerHTML={{
                                __html: article.toc ? article.toc : '',
                            }}
                        />
                    ) : (
                        ''
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
    mapStateToProps
)(ArticleDetail);
