export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface IColor {
  id: string;
  name: string;
  code: string;
}

export interface IIcon {
  id: string;
  name: string;
  symbol: string;
}

export interface ICategory {
  name: string;
  user: IUser | string;
  isEditable: boolean;
  color: IColor | string;
  icon: IIcon | string;
}
