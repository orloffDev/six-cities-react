import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {CityName} from '../../types/city-name';

export const getActiveCityName = (state: State): CityName => state[NameSpace.City].activeCityName;
