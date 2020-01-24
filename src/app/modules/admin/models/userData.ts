import { IRole } from 'src/app/models/loginUser';

export interface IUserData {
    id: number;
    login: string;
    role: IRole;
    email: string;
    firstName: string;
    patronymic: string;
    lastName: string;
    registrationDate: Date;
}