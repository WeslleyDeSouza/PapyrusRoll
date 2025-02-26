import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

// SignIn
export class AuthUserSignInDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email!: string;

  @IsString()
  @MinLength(4)
  @MaxLength(55)
  @ApiProperty()
  password!: string;

  //Current Device ID
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, type: String })
  uuId!: string;
}
// SignUp
export class AuthUserSignUpDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  email!: string;

  @IsString()
  @MinLength(4)
  @MaxLength(55)
  @ApiProperty()
  password!: string;

  //Current Device ID
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, type: String })
  uuId!: string;
}

// Password Reset
export class AuthUserPasswordVerifyCode {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty()
  @IsNotEmpty()
  code!: string;
}

export class AuthUserPasswordUpdate {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiProperty()
  @IsOptional()
  code!: string;

  @ApiProperty()
  @IsOptional()
  id?: string;

  @IsString()
  @MinLength(8)
  @MaxLength(55)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'passwordweak',
  })
  @ApiProperty()
  password!: string;
}

// Response
export class AuthUserResponseDTO {
  @ApiProperty({ type: String }) userId!: string;
  @ApiProperty({ type: String }) firstName!: string;
  @ApiProperty({ type: String }) lastName!: string;
  @ApiProperty({ type: String }) avatar!: string;
  @ApiProperty({ type: String }) phone!: string;
  @ApiProperty({ type: String }) email!: string;
}
