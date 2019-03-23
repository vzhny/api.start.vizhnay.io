import to from 'await-to-js';
import findIndex from 'lodash/findIndex';
import Link from '@/models/link.model';
import Category from '@/models/category.model';
import handleError from '@/api/helpers/handleError';
import formatCategory from '@/api/helpers/formatCategory';

/* eslint-disable consistent-return */

export const getAllLinks = async (req, res) => {
  const { userId } = res.locals;

  const [linksError, links] = await to(
    Link.query()
      .select('links.url', 'links.title', 'links.owner', 'categories.name as category')
      .join('categories', 'links.category', 'categories.id')
      .where('links.owner', userId)
  );

  if (linksError) {
    return handleError(res, 404, "There was an error retrieving the user's links.", linksError);
  }

  return res.status(200).json({ links });
};

export const addNewLink = async (req, res) => {
  const { userId } = res.locals;
  const { url, title, category } = req.body;
  const sanitizedCategory = formatCategory(category);
  let categoryId = null;

  const [categoryError, categories] = await to(Category.query().select());

  if (categoryError) {
    return handleError(res, 400, 'There was an error adding the link, please try again later.', categoryError);
  }

  if (sanitizedCategory === '') {
    return handleError(res, 400, 'Please add a category associated with the link.');
  }

  const categoryIndex = findIndex(categories, { name: sanitizedCategory });

  if (categoryIndex >= 0) {
    categoryId = categories[categoryIndex].id;
  } else {
    const [addedCategoryError, addedCategory] = await to(Category.query().insert({ name: sanitizedCategory }));

    if (addedCategoryError) {
      return handleError(res, 400, 'There was an error adding the link, please try again later.', addedCategoryError);
    }

    categoryId = addedCategory.id;
  }

  const [addedLinkError, addedLink] = await to(
    Link.query().insert({
      url,
      title,
      category: categoryId,
      owner: userId,
    })
  );

  if (addedLinkError) {
    return handleError(res, 400, 'There was an error adding the link, please try again later.', addedLinkError);
  }

  return res.status(201).json(addedLink);
};

export const getOneLink = async (req, res) => {};

export const updateLink = async (req, res) => {};

export const deleteLink = async (req, res) => {};
