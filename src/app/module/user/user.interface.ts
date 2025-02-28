
export interface IUSer { 
    name : string;
    email : string;
    password: string;
    role : 'admin' | 'user'
    avatar?: string;
}