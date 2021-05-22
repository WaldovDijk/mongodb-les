import { BodyParams, Controller, Get, Post, Put, Req, Res } from '@tsed/common';
import { Authenticate } from '@tsed/passport';
import { AuthService } from '../../services/service/auth';
import { ILogin } from '../../services/protocols/userTypes';
import * as fs from 'fs';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Put('/register')
  async RegisterAccount(
    @Res() res: Res,
    @BodyParams() data: { email: string; password: string }
  ) {
    const { email, password } = data;
    await this.authService.RegisterUser(email, password, res);
  }

  @Put('/login')
  @Authenticate('login')
  async loginUser(@BodyParams() data: ILogin, @Res() res: Res) {
    await this.authService.loginUser(data, res);
  }

  @Get('/checklogin')
  @Authenticate('jwt')
  async CheckAuth() {}

  @Get('/logout')
  logoutUser(@Res() res: Res) {
    res.clearCookie('loginToken');
    res.send({ logout: 'User has been logged out!' });
  }
}
