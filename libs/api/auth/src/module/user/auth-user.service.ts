import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthUserService } from './service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthUserSignInDto, AuthUserSignUpDto } from './dto';
import { AuthUserLoginService } from './service/auth-login.service';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private usersService: AuthUserService,
    private loginUserService: AuthUserLoginService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async signUp(createUserDto: AuthUserSignUpDto): Promise<any> {
    // Check if user exists
    const userExists = await this.usersService.findByEmail(createUserDto.email);
    if (userExists) {
      throw new BadRequestException('User already exists');
    }

    // Hash password
    const hash = await this.hashData(createUserDto.password);
    const newUser = await this.usersService.create({
      ...createUserDto,
      password: hash,
    });
    const tokens = await this.getTokens(newUser.userId, newUser.username);
    await this.updateRefreshToken(newUser.userId, tokens.refreshToken);
    return tokens;
  }

  async signIn(data: AuthUserSignInDto) {
    // Check if user exists
    const user = await this.usersService.findByEmail(data.email);
    if (!user) throw new BadRequestException('Credentials not valid');

    const passwordMatches = await argon2.verify(user.password, data.password);
    if (!passwordMatches)
      throw new BadRequestException('Credejtials not valid');

    const tokens = await this.getTokens(user.userId, user.email);
    await this.updateRefreshToken(user.email, tokens.refreshToken);
    return tokens;
  }

  async logout(id: string) {
    return this.loginUserService.update(id, {
      value: null,
      type: 'refreshToken',
    });
  }

  hashData(data: string) {
    return argon2.hash(data);
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await this.hashData(refreshToken);
    await this.loginUserService.update(userId, {
      value: hashedRefreshToken,
      type: 'refreshToken',
    });
  }

  async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: '15m',
        }
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        }
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
