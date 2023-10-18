export enum ApiOps {
  LOGOUT = "LOGOUT",
}

// export user types

export type Influencer = {
  id: number;
  fname: string;
  lname: string;
  tags: string[];
  followers: number | null;
};
