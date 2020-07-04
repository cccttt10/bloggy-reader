declare module 'global' {
    export interface IArticle {
        _id: string;
        title?: string;
        author: IUser['_id'] | IUser;
        description?: string;
        content?: string;
        wordCount?: number;
        imgUrl?: string;
        isDraft?: boolean;
        comments?: Array<IComment['_id']> | IComment[];
        categories?: Array<ICategory['_id']> | ICategory[];
        likedBy?: Array<IUser['_id']> | IUser[];
        meta?: {
            numViews: number;
            numLikes: number;
            numComments: number;
        };
        isAboutPage?: boolean;
        createdOn?: Date;
        updatedOn?: Date;
    }

    export interface VerboseArticle
        extends Omit<Omit<Omit<IArticle, 'categories'>, 'comments'>, 'author'> {
        comments: IComment[];
        categories: ICategory[];
        author: IUser;
    }

    export interface ICategory {
        _id: string;
        name: string;
        description?: string;
        user: IUser['_id'] | IUser;
        createdOn?: Date;
        updatedOn?: Date;
    }

    export interface IComment {
        _id: string;
        article: IArticle['_id'] | IArticle;
        content: string;
        isPinned?: boolean;
        user: IUser['_id'] | IUser;
        isApproved?: boolean;
        createdOn?: Date;
    }

    export interface VerboseComment extends Omit<IComment, 'user'> {
        user: IUser;
    }

    export interface IUser {
        _id: string;
        name: string;
        phone?: string;
        imgUrl?: string;
        email: string;
        bio?: string;
        avatar?: string;
        location?: string;
        password: string;
        confirmPassword?: string;
        createdOn?: Date;
        updatedOn?: Date;
    }

    export type KeysEnum<T> = { [P in keyof Required<T>]: true };
}
