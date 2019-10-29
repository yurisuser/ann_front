export interface LoginUser {
    id: number;
    login: string;
    role: IRole;
    email: string;
    firstName: string;
    patronymic: string;
    lastName: string;
    registrationDate: Date;
}

export interface IRole {
    id: number;
    role: string;
}
