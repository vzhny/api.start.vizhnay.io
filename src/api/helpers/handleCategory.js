import to from 'await-to-js';
import findIndex from 'lodash/findIndex';
import Category from '@/models/category.model';

const formatCategory = category => {
  const trimmedCategory = category.trim();

  return `${trimmedCategory.charAt(0).toUpperCase()}${trimmedCategory.slice(1)}`;
};

export default category =>
  new Promise(async (resolve, reject) => {
    if (category === undefined || typeof category !== 'string') {
      reject(new Error('Please add a category associated with the link.'));
    } else {
      const sanitizedCategory = formatCategory(category);
      let categoryId = null;

      const [categoryError, categories] = await to(Category.query().select());

      if (categoryError) {
        reject(categoryError);
      }

      const categoryIndex = findIndex(categories, { name: sanitizedCategory });

      if (categoryIndex >= 0) {
        categoryId = categories[categoryIndex].id;
      } else {
        const [addedCategoryError, addedCategory] = await to(Category.query().insert({ name: sanitizedCategory }));

        if (addedCategoryError) {
          reject(addedCategoryError);
        }

        categoryId = addedCategory.id;
      }

      resolve(categoryId);
    }
  });
