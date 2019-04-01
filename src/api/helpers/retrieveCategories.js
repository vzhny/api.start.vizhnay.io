import get from 'lodash/get';
import findIndex from 'lodash/findIndex';

/* eslint-disable array-callback-return */

export default links => {
  const categories = [];

  links.map(link => {
    const category = get(link, 'category');

    if (findIndex(categories, category) === -1) {
      categories.push({ category, links: [] });
    }
  });

  return categories;
};
