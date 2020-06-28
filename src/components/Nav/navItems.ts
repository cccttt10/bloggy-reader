import { PageName, pageNames } from '../../router/constants';

const navItems: {
    displayName: string;
    icon: string;
    key: string;
    to: PageName;
}[] = [
    {
        displayName: 'Home',
        icon: 'home',
        key: 'home',
        to: pageNames.HOME,
    },
    {
        displayName: 'Articles',
        icon: 'ordered-list',
        key: 'articles',
        to: pageNames.ARTICLE_LIST,
    },
    {
        displayName: 'About',
        icon: 'user',
        key: 'about',
        to: pageNames.ABOUT,
    },
];

export default navItems;
