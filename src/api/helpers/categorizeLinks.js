import get from 'lodash/get';
import pick from 'lodash/pick';
import findIndex from 'lodash/findIndex';

/* eslint-disable array-callback-return */

export default (links, categories) => {
  const categorizedLinks = [...categories];

  links.map(link => {
    const linkCategory = get(link, 'category');

    const linkWithoutCategory = pick(link, ['title', 'url', 'linkId']);

    const indexOfCategory = findIndex(categorizedLinks, { category: linkCategory });

    categorizedLinks[indexOfCategory].links.push(linkWithoutCategory);
  });

  return categorizedLinks;
};
