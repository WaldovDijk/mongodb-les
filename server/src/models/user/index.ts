import { Default, Property, Required } from '@tsed/schema';
import { Model, ObjectID, Select } from '@tsed/mongoose';

@Model()
export class User {
  @ObjectID('id')
  _id: string;

  @Property()
  @Default(false)
  admin: boolean;

  @Property()
  @Required()
  email: string;

  @Property()
  @Default('')
  @Select(false)
  password: string;

  @Property()
  username: string;
}
