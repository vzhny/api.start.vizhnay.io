import { Model } from 'objection';

class Category extends Model {
  static tableName = 'links';

  static jsonSchema = {
    type: 'object',
    required: ['url', 'title', 'category'],

    properties: {
      id: { type: 'serial' },
      title: { type: 'string', maxLength: 16 },
      url: { type: 'string', unique: true },
      owner: { type: 'string' },
      category: { type: 'integer' },
      createdAt: { type: 'timestamptz' },
    },
  };
}

export default Category;
