export enum ApiOps {
  LOGOUT = "LOGOUT",
  DISCOVER = "DISCOVER-INFLUENCERS",
  GET_USER = "GET-USER",
  PROFILE = "PROFILE",
}

// export user types

export type Influencer = {
  id: number;
  fname: string;
  lname: string;
  tags: string[];
  profilePicture: string;
  followers: number | null;
};

export type User = {
  id: number;
  fname: string;
  lname: string;
  email: string;
  tags: string[] | null;
  usertype: UserTypes;
};
export interface DbInfluencer extends User {
  influencerProfile: InfluencerProfile;
}

export interface DbBrand extends User {
  brandProfile: BrandProfile;
}

export type InfluencerProfile = {
  id: number;
  profilePicture: string | null;
  instagramFollowers: number | null;
  instagramLink: string | null;
  twitterLink: string | null;
  youtubeLink: string | null;
  categories: string[];
  ageGroup: AgeGroup | null;
  gender: Gender | null;
  followerRange: FollowersRange | null;
  userId: number;
  country: string | null;
  languages: string[] | null;
  aboutMe: string | null;
  minimumCampaignValue: number | null;
  photos: string[] | null;
  campaignId: number[] | null;
  instagramFollowersInt: number | null;
};

export type BrandProfile = {
  id: number;
  profilePicture: string | null;
  userId: number;
  campaigns: Campaign[] | null;
};

export type Campaign = {
  id: number;
  name: string;
  image: string;
  work: string;
  postMessage: string | null;
  postDos: string | null;
  postDonts: string | null;
  linkBackURL: string;
  startDate: string;
  endDate: string;
  budgetPerInfluencer: number;
  categories: string[];
  minReach: number;
  numInfluencers: number;
  maxReach: number | null;
  influencers: InfluencerProfile[];
  reach: number | null;
  impressions: number | null;
  engagement: number | null;
  brandId: number;
};

export enum AgeGroup {
  AG_0_14 = "AG_0_14",
  AG_15_29 = "AG_15_29",
  AG_30_45 = "AG_30_45",
  AG_45_60 = "AG_45_60",
  AG_ABOVE_60 = "AG_ABOVE_60",
}

export enum Gender {
  FEMALE = "FEMALE",
  MALE = "MALE",
  NON_BINARY = "NON_BINARY",
  OTHER = "OTHER",
}

export enum FollowersRange {
  R0_1K = "R0_1K",
  R1K_10K = "R1K_10K",
  R10K_100K = "R10K_100K",
  R100K_1M = "R100K_1M",
  R1M_UP = "R1M_UP",
}

export enum UserTypes {
  INFLUENCER = "INFLUENCER",
  BRAND = "BRAND",
}

export type Chats = {
  peopleChat: PeopleChat[];
};

export type PeopleChat = {
  fname: string;
  lname: string;
  id: number;
  influencerProfilePic: InfluencerProfilePic;
  profilePicture: string;
};

export type InfluencerProfilePic = {
  profilePicture: string;
};
