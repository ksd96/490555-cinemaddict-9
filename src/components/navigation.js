export const makeElementNavigation = ({title, count, tag, classList}) => `<a href="#${tag}" class="main-navigation__item ${classList}">${title} ${count}</a>`.trim();

