import { Model } from 'objection';

class Category extends Model {
  static tableName = 'links';

  static jsonSchema = {
    type: 'object',
    required: ['url', 'title', 'category'],

    properties: {
      id: { type: 'serial' },
      linkId: { type: 'string', unique: true },
      title: { type: 'string', maxLength: 16 },
      url: { type: 'string' },
      owner: { type: 'string' },
      category: { type: 'integer' },
      createdAt: { type: 'timestamptz' },
    },
  };
}

export default Category;
