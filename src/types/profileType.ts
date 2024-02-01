export type Profile = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
};
export type ProfileData = {
  isLoading: { [key: string]: boolean };
  hasErr: { [key: string]: string | undefined };
  data: {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    token: string;
  } | null;
};
