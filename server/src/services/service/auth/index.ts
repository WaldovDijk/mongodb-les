import { Inject, Res, Service } from '@tsed/common';
import { MongooseModel } from '@tsed/mongoose';
import { User } from '../../../models/user';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { ILogin } from '../../protocols/UserTypes';
import * as dotenv from 'dotenv';
dotenv.config();

@Service()
export class AuthService {
  @Inject(User)
  User: MongooseModel<User>;

  async RegisterUser(email: string, password: string, @Res() res: Res) {
    const isUser = await this.isUser(email);
    if (!isUser) {
      const model = new this.User({
        email: email,
        password: bcrypt.hashSync(password, 10),
        snowflake: this.CreateSnowflake(),
      });
      await model.save().catch((err) => console.log(err));
      const { token, date } = this.setToken(model.id);
      res.cookie('loginToken', token, {
        maxAge: 365 * 24 * 60 * 60 * 1000,
        expires: date,
        sameSite: true,
        httpOnly: true,
      });
      const returnData = model;
      delete returnData.__v;

      res.status(200).send(returnData);
    }
    res.send({ error: 'User already excists!' });
  }

  async loginUser(data: ILogin, @Res() res: Res) {
    const email = data.email;
    const user = await this.User.findOne({ email });
    if (user) {
      const { token, date } = this.setToken(user.id);
      res.cookie('loginToken', token, {
        maxAge: 365 * 24 * 60 * 60 * 1000,
        expires: date,
        sameSite: true,
        httpOnly: true,
      });

      res.status(200).send(user);
    }
  }

  async checkAuth(token: string) {
    const data: string | { [key: string]: any } | null = jwt.decode(token);
    if (data && typeof data !== 'string') {
      const id = data['id'];
      const user = await this.User.findOne({ _id: id });
      if (!user) {
        return null;
      }
      delete user.__v;
      return user;
    } else {
      return data;
    }
  }

  async findOne({ id }: { id: string }): Promise<any> {
    const user = await this.User.findOne({ _id: id });
    if (user) return user;
    else return null;
  }

  private async isUser(email: string): Promise<boolean> {
    const user = await this.User.findOne({ email: email });
    if (user) {
      return true;
    } else {
      return false;
    }
  }
  private CreateSnowflake() {
    let number;
    number = Math.floor(1000 + Math.random() * 9000);
    return number;
  }
  private setToken(id: string): { token: string; date: Date } {
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    const token = jwt.sign({ id }, 'secret');
    return { token, date };
  }
}
