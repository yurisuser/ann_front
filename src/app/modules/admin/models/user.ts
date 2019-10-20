import { IRole } from './role';

export interface IUser {
    id: number;
    name: string;
    role: IRole;
}
