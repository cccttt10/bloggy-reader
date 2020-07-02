/* eslint-disable max-lines */
import './index.less';

import { Icon } from 'antd';
import { ICategory, IUser, VerboseArticle } from 'global';
import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';

import { RootState } from '../../redux';
import { saveArticleList } from '../../redux/articleList/actions';
import { pageNames, paramNames, paths, RouteParams } from '../../router/constants';
import { formatTimeStamp } from '../../util/formatTimeStamp';
import { getQueryStringByName } from '../../util/queryString';
import {
    getDocumentHeight,
    getScrollTop,
    getWindowHeight,
} from '../../util/responsive';
import EndOfList from '../EndOfList';
import lazyLoad from './lazyLoad';

interface OwnProps {}

interface DispatchProps {
    saveArticleList: typeof saveArticleList;
}

const mapDispatchToProps = {
    saveArticleList,
};

interface StateProps {
    articleList: VerboseArticle[];
    count: number;
    publisher: IUser;
    loading: boolean;
}

const mapStateToProps = (state: RootState): StateProps => ({
    articleList: state.articleList.articles as VerboseArticle[],
    count: state.articleList.count,
    publisher: state.user.publisher as IUser,
    loading: state.loading.loading,
});

type ArticleListProps = OwnProps &
    DispatchProps &
    StateProps &
    RouteComponentProps<RouteParams>;

interface ArticleListState {
    page: number;
    categoryId: ICategory['_id'] | null;
    allArticles: VerboseArticle[]; // do not use redux articles, because redux does not do filtering based on categoryId
    articlesToRender: VerboseArticle[];
    endOfList: boolean;
}

interface ArticleLinkProps {
    publisherId: string;
    articleId: string;
    title?: boolean;
}

const ArticleLink: React.FC<ArticleLinkProps> = props => {
    return (
        <Link
            className={props.title ? 'title' : ''}
            target="_blank"
            to={`/${paths.PUBLISHER}/${props.publisherId}/${pageNames.ARTICLE_DETAIL}/?${paramNames.ARTICLE_ID}=${props.articleId}`}
        >
            {props.children}
        </Link>
    );
};

class ArticleList extends Component<ArticleListProps, ArticleListState> {
    readonly limit = 5;

    constructor(props: ArticleListProps) {
        super(props);
        const categoryId: ICategory['_id'] | null = getQueryStringByName(
            paramNames.CATEGORY_ID
        );

        let allArticles: VerboseArticle[];
        if (categoryId === null) {
            allArticles = this.props.articleList;
        } else {
            allArticles = this.filterArticles(categoryId);
        }
        this.state = {
            page: 0,
            categoryId,
            allArticles,
            articlesToRender: allArticles.slice(0, 5),
            endOfList: allArticles.length > 5,
        };
    }

    // filter articles by categoryId
    filterArticles = (categoryId: ICategory['_id']): VerboseArticle[] => {
        return this.props.articleList.filter(
            article =>
                !article.categories.every(category => category._id !== categoryId)
        );
    };

    componentDidMount(): void {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount(): void {
        window.removeEventListener('scroll', this.handleScroll);
    }

    handleScroll = (): void => {
        // lazy loading images
        lazyLoad();

        // fetch more articles if there is any
        if (getScrollTop() + getWindowHeight() > getDocumentHeight() - 100) {
            // 如果不是已经没有数据了，都可以继续滚动加载
            if (this.state.endOfList === false && this.props.loading === false) {
                this.fetchNextArticles();
            }
        }
    };

    fetchNextArticles = (): void => {
        const limit = 5;
        const page = this.state.page + 1;
        const skip = page * limit;
        const articlesToRender = this.state.allArticles.slice(skip, skip + limit);
        this.setState({
            ...this.state,
            articlesToRender,
            endOfList: articlesToRender.length < this.state.allArticles.length,
        });
        lazyLoad();
    };

    render(): JSX.Element {
        const publisherId = this.props.match.params.publisherId;

        const articlesJSX: JSX.Element[] = this.state.articlesToRender.map(
            article => (
                <ReactCSSTransitionGroup
                    key={article._id}
                    transitionName="example"
                    transitionAppear={true}
                    transitionAppearTimeout={1000}
                    transitionEnterTimeout={1000}
                    transitionLeaveTimeout={1000}
                >
                    <li key={article._id} className="have-img">
                        <a className="wrap-img" href="/" target="_blank">
                            <img
                                className="img-blur-done"
                                data-src={article.imgUrl}
                                data-has-lazy-src="false"
                                src={article.imgUrl}
                                alt={`article image url for ${article.title}`}
                            />
                        </a>
                        <div className="content">
                            <ArticleLink
                                publisherId={publisherId}
                                articleId={article._id}
                                title
                            >
                                {article.title}
                            </ArticleLink>
                            <p className="abstract">{article.description}</p>
                            <div className="meta">
                                <ArticleLink
                                    publisherId={publisherId}
                                    articleId={article._id}
                                >
                                    <Icon type="eye" theme="outlined" />{' '}
                                    {article.meta ? article.meta.numViews : 0}
                                </ArticleLink>{' '}
                                <ArticleLink
                                    publisherId={publisherId}
                                    articleId={article._id}
                                >
                                    <Icon type="message" theme="outlined" />{' '}
                                    {article.meta ? article.meta.numComments : 0}
                                </ArticleLink>{' '}
                                <ArticleLink
                                    publisherId={publisherId}
                                    articleId={article._id}
                                >
                                    <Icon type="heart" theme="outlined" />{' '}
                                    {article.meta ? article.meta.numLikes : 0}
                                </ArticleLink>
                                <span className="time">
                                    {article.createdOn
                                        ? formatTimeStamp(article.createdOn, true)
                                        : ''}
                                </span>
                            </div>
                        </div>
                    </li>
                </ReactCSSTransitionGroup>
            )
        );

        return (
            <div className="left">
                {this.state.categoryId ? (
                    <h3 className="left-title">
                        Articles related to {this.state.categoryId}:{' '}
                    </h3>
                ) : (
                    ''
                )}
                <ul className="note-list" id="list">
                    {articlesJSX}
                </ul>
                {this.state.endOfList ? <EndOfList /> : ''}
            </div>
        );
    }
}

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
    mapStateToProps,
    mapDispatchToProps
)(ArticleList);
