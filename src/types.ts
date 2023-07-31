export interface usersInfo {
  title?: string;
  firstname: string;
  name: {
    first: string;
    last: string;
  };
  picture: {
    large: string;
  }
  
}

export interface usersInfo {
  title?: string;
  firstname: string;
  name: {
    first: string;
    last: string;
  };
  lastname: string;
  passport?: string;
  id: string;
}

export type userData = {
  status: string;
  data: usersInfo;
};

export interface IFetchSucess {
  userData: { status: string; data: userData }[];
}
