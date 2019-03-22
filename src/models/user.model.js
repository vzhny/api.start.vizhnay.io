import { Model } from 'objection';

class User extends Model {
  static tableName = 'users';

  static jsonSchema = {
    type: 'object',
    required: ['email', 'password'],

    properties: {
      id: { type: 'serial' },
      userId: { type: 'string' },
      email: { type: 'string', unique: true, maxLength: 32 },
      password: { type: 'string' },
      createdAt: { type: 'timestamptz' },
    },
  };
}

export default User;
