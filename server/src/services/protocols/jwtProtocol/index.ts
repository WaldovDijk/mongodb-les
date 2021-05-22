import { Req } from '@tsed/common';
import { Arg, OnVerify, Protocol } from '@tsed/passport';
import { Strategy, StrategyOptions } from 'passport-jwt';
import { AuthService } from '../../service/auth';

const cookieExtractor = (req: Req): any => {
  var token = null;
  if (req && req.cookies) token = req.cookies['loginToken'];
  return token;
};

@Protocol<StrategyOptions>({
  name: 'jwt',
  useStrategy: Strategy,
  settings: {
    jwtFromRequest: cookieExtractor,
    secretOrKey: 'secret',
  },
})
export class JwtProtocol implements OnVerify {
  constructor(private authService: AuthService) {}

  async $onVerify(@Req() req: Req, @Arg(0) jwtPayload: any) {
    if (!jwtPayload.id) {
      return false;
    }
    const user = await this.authService.findOne({ id: jwtPayload.id });

    return user ? user : false;
  }
}
