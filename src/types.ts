export interface usersInfo {
  title: string;
  paid_at: string;
  firstname: string;
  name: {
    firstname: string;
    lastname: string;
  };
  picture: {
    large: string;
  }
  
}

export interface usersInfo {
  title: string;
  firstname: string;
  name: {
    firstname: string;
    lastname: string;
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
