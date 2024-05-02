import { User } from './userType.js';

export type Comment = {
    content: string;
    date: string;
    rating: number;
    author: User;
}
