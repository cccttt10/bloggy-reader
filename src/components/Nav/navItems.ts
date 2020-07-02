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
        key: pageNames.HOME,
        to: pageNames.HOME,
    },
    {
        displayName: 'Articles',
        icon: 'ordered-list',
        key: pageNames.ARTICLE_LIST,
        to: pageNames.ARTICLE_LIST,
    },
    {
        displayName: 'About',
        icon: 'user',
        key: pageNames.ABOUT,
        to: pageNames.ABOUT,
    },
];

export default navItems;
