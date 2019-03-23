import { Model } from 'objection';

class Category extends Model {
  static tableName = 'links';

  static jsonSchema = {
    type: 'object',
    required: ['name', 'url'],

    properties: {
      id: { type: 'serial' },
      name: { type: 'string', maxLength: 16 },
      url: { type: 'string', unique: true },
      owner: { type: 'string' },
      category: { type: 'integer' },
      createdAt: { type: 'timestamptz' },
    },
  };
}

export default Category;
