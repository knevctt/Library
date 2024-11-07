export interface IUser {
    name: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    accessLevel: number;
};
export class User implements IUser {
    name: string = '';
    lastName: string = '';
    userName: string = '';
    email: string = '';
    password: string = '';
    accessLevel: number = 0;
 }