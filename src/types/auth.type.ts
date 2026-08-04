export interface IAuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface IAuthResponse {
  user: IAuthUser;
  token: string;
}

export interface IAuthLoginDto {
  email: string;
  password: string;
}

export interface IAuthRegisterDto {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}
