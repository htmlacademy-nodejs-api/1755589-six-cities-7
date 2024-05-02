import { UserType } from './userType.enum.js';

export type User = {
    name: string;
    mail: string;
    avatar?: string;
    level: UserType;
}
