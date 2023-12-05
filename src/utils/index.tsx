export {getMapData} from './getMapData';

export const getRating = (rating: number) => `${Math.round(rating) * 100 / 5}%`;
