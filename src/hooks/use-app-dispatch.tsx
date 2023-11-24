import {useDispatch} from 'react-redux';
import type {AppDispatch} from '../types/app-dispatch';

export const useAppDispatch = () => useDispatch<AppDispatch>();
