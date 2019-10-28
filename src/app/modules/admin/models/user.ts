import { IRole } from './role';

export interface IUser {
    id: number;
    login: string;
    role: IRole;
}
