import { PageName, pageNames } from '../../router/constants';

const navItems: {
    displayName: string;
    icon: string;

    to: PageName;
}[] = [
    {
        displayName: 'Home',
        icon: 'home',

        to: pageNames.HOME,
    },
    {
        displayName: 'Articles',
        icon: 'ordered-list',
        to: pageNames.ARTICLE_LIST,
    },
    {
        displayName: 'About',
        icon: 'user',
        to: pageNames.ABOUT,
    },
];

export default navItems;
