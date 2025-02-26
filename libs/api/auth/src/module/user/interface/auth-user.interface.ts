interface User {
  avatar?: string;

  gender?: string;

  firstName: string;

  lastName: string;

  phone?: string;

  birthDay?: string;
}

export interface IAuthUser extends User {
  userId: string;

  email: string;

  username?: string;

  host: string;

  password?: string;

  authCreatedAt: number; //year;

  get resetPasswordRequired(): boolean;

  validatePassword(password: string): Promise<boolean>;

  setAuthCreatedAt(year: number): this;

  setEmail(mail: string): this;

  toJSON(): Record<string, IAuthUser>;

  initialise(data: Partial<this>, secure: boolean): this;
}
