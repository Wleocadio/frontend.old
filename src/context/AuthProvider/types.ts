import { Buffer } from 'buffer';

export interface IUser{
    mail?: string;
    token?: string;
    user?:string;
    id?:number;
    image?:Buffer
}

export interface IContext extends IUser{
    authenticate: ( mail: string, password: string  ) => Promise<void>;

    logout:() => void;
}

export interface IAuthProvider{
    children: JSX.Element;
}