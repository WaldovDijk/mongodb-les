import { BodyParams, Res } from '@tsed/common';
import { OnInstall, OnVerify, Protocol } from '@tsed/passport';
import { IStrategyOptions, Strategy } from 'passport-local';
import { Credentials } from '../../../models/credentials';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../../service/auth';

@Protocol<IStrategyOptions>({
  name: 'login',
  useStrategy: Strategy,
  settings: {
    usernameField: 'email',
    passwordField: 'password',
  },
})
export class LoginLocalProtocol implements OnVerify, OnInstall {
  constructor(private authService: AuthService) {}

  async $onVerify(@Res() res: Res, @BodyParams() credentials: Credentials) {
    const { email, password } = credentials;

    const user: any = await this.authService.User.findOne({ email });

    if (!user) {
      return res.status(401).json({ isUser: 'Email not found!' });
    }
    const isMatch = await this.checkPassword(email, password);

    if (!isMatch) {
      return res.status(401).json({ password: 'Password incorrect' });
    }

    return user;
  }

  async checkPassword(email: string, password: string): Promise<boolean> {
    const user = await this.authService.User.findOne({ email }).select(
      'password'
    );
    if (user && bcrypt.compareSync(password, user.password)) {
      return true;
    } else {
      return false;
    }
  }

  $onInstall(strategy: Strategy): void {
    // intercept the strategy instance to adding extra configuration
  }
}
