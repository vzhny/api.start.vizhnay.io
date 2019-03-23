import to from 'await-to-js';
import shortId from 'shortid';
import pick from 'lodash/pick';
import Link from '@/models/link.model';
import handleError from '@/api/helpers/handleError';
import handleCategory from '@/api/helpers/handleCategory';

/* eslint-disable consistent-return */

export const getAllLinks = async (req, res) => {
  const { userId } = res.locals;

  const [linksError, links] = await to(
    Link.query()
      .select('links.url', 'links.title', 'categories.name as category', 'links.link_id')
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

  const [categoryError, categoryId] = await to(handleCategory(category));

  if (categoryError) {
    const { message } = categoryError;

    if (message === 'Please add a category associated with the link.') {
      return handleError(res, 400, message, categoryError);
    }

    return handleError(res, 400, 'There was an error adding the link, please try again later.', categoryError);
  }

  const [addedLinkError, addedLink] = await to(
    Link.query().insert({
      linkId: shortId.generate(),
      url,
      title,
      category: categoryId,
      owner: userId,
    })
  );

  if (addedLinkError) {
    return handleError(res, 400, 'There was an error adding the link, please try again later.', addedLinkError);
  }

  const returnedLink = pick(addedLink, ['linkId', 'url', 'title']);

  return res.status(201).json({ ...returnedLink, category });
};

export const getOneLink = async (req, res) => {
  const { linkId } = req.params;
  const { userId } = res.locals;

  const [linkError, link] = await to(
    Link.query()
      .select('links.link_id', 'links.url', 'links.title', 'categories.name as category')
      .join('categories', 'links.category', 'categories.id')
      .where('owner', userId)
      .andWhere('linkId', linkId)
      .first()
  );

  if (linkError) {
    return handleError(res, 404, 'There was an error retrieving the link.', linkError);
  }

  if (link === undefined) {
    return handleError(res, 401, 'Unauthorized access to specified link.');
  }

  return res.status(200).json(link);
};

export const updateLink = async (req, res) => {
  const { linkId } = req.params;
  const { userId } = res.locals;

  const { url, title, category } = req.body;

  const [categoryError, categoryId] = await to(handleCategory(category));

  if (categoryError) {
    const { message } = categoryError;

    if (message === 'Please add a category associated with the link.') {
      return handleError(res, 400, message, categoryError);
    }

    return handleError(res, 400, 'There was an error adding the link, please try again later.', categoryError);
  }

  const [updateError, updated] = await to(
    Link.query()
      .patch({
        url,
        title,
        category: categoryId,
      })
      .where('owner', userId)
      .andWhere('linkId', linkId)
  );

  if (updateError) {
    return handleError(res, 404, 'There was an error updating the link.', updateError);
  }

  if (updated <= 0) {
    return handleError(res, 401, 'Unauthorized access to specified link.');
  }

  return res.status(204).json();
};

export const deleteLink = async (req, res) => {};
