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

export type DbInfluencer = {
  id: number;
  fname: string;
  lname: string;
  email: string;
  influencerProfile: InfluencerProfile;
  usertype: UserTypes;
};

export type InfluencerProfile = {
  id: number;
  profilePicture: string | null;
  instagramFollowers: number | null;
  instagramLink: string | null;
  twitterLink: string | null;
  youtubeLink: string | null;
  categories: string[];
  ageGroup: string | null;
  gender: string | null;
  followerRange: string | null;
  userId: number;
};

export enum UserTypes {
  INFLUENCER = "INFLUENCER",
  BRAND = "BRAND",
}

// [
//   {
//       "fname": "Jane",
//       "lname": "Molly",
//       "id": 72,
//       "influencerProfile": {
//           "profilePicture": "lol@lol.com"
//       },
//       "profilePicture": "lol@lol.com"
//   },
//   {
//       "fname": "Jane",
//       "lname": "Molly",
//       "id": 72,
//       "influencerProfile": {
//           "profilePicture": "lol@lol.com"
//       },
//       "profilePicture": "lol@lol.com"
//   }

// ]

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
