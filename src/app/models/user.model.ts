export interface IUser {
    name: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
};
export class User implements IUser {
    name: string = '';
    lastName: string = '';
    userName: string = '';
    email: string = '';
    password: string = '';
 }