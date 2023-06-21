export interface IUser{
    mail?: string;
    token?: string;
    user?:string;
    id?:number
}

export interface IContext extends IUser{
    authenticate: ( mail: string, password: string  ) => Promise<void>;

    logout:() => void;
}

export interface IAuthProvider{
    children: JSX.Element;
}