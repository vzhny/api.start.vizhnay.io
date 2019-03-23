import { Model } from 'objection';

class Category extends Model {
  static tableName = 'categories';

  static jsonSchema = {
    type: 'object',
    required: 'name',

    properties: {
      id: { type: 'serial' },
      name: { type: 'string', unique: true, maxLength: 24 },
      createdAt: { type: 'timestamptz' },
    },
  };
}

export default Category;
