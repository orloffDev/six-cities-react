import {CitiesList} from "../const";
type ValueOf<T> = T[keyof T];
export type CityName = ValueOf<CitiesList>;
