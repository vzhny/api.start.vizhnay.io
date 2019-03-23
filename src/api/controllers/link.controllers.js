/* eslint-disable */

import to from 'await-to-js';
import bcrypt from 'bcryptjs';
import User from '@/models/user.model';
import Link from '@/models/link.model';
import Category from '@/models/category.model';
import handleError from '@/api/helpers/handleError';

/* eslint-disable consistent-return */

export const getAllLinks = async (req, res) => {
  const { userId } = res.locals;

  const [error, links] = await to(
    Link.query()
      .select('links.url', 'links.name', 'links.owner', 'categories.name as category')
      .join('categories', 'links.category', 'categories.id')
      .where('links.owner', userId)
  );

  if (error) {
    return handleError(res, 404, "There was an error retrieving the user's links.", error);
  }

  return res.status(200).json({ links });
};

export const addNewLink = async (req, res) => {};

export const getOneLink = async (req, res) => {};

export const updateLink = async (req, res) => {};

export const deleteLink = async (req, res) => {};
