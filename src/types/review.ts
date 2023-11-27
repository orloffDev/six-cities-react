import {UserData} from './user-data';

export type Review = {
  id: string;
  date: string;
  user: UserData;
  comment: string;
  rating: number;
}
