import { Body, Controller, Get, Post, Req } from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../auth-user.service';
import { AuthUserSignInDto, AuthUserSignUpDto } from '../dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthUserController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: AuthUserSignUpDto) {
    return this.authService.signUp(createUserDto);
  }

  @Post('signin')
  signin(@Body() data: AuthUserSignInDto) {
    return this.authService.signIn(data);
  }

  @Get('logout')
  logout(@Req() req: Request & { user: any }) {
    this.authService.logout(req.user['sub']);
  }
}
