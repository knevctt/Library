export interface IUser {
  name: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  role: string;
}
export class User implements IUser {
  name: string = '';
  lastName: string = '';
  userName: string = '';
  email: string = '';
  password: string = '';
  role: string = '';
}
