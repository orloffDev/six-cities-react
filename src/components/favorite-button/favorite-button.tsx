import {Offer} from '../../types/offer';
import {OfferItem} from '../../types/offer-item';
import {useEffect, useRef} from 'react';
import axios, {AxiosRequestConfig} from 'axios';
import {APIRoute} from '../../const';
import {AppRoute} from '../../const';
import {toast} from 'react-toastify';
import {MutableRefObject} from '../../types/index';
import {AuthorizationStatus} from '../../const';
import {createAPI} from '../../services/api';
import {useAppSelector} from '../../hooks/use-app-selector';
import {useNavigate} from 'react-router-dom';
import classNames from 'classnames';
import {useAppDispatch} from '../../hooks/use-app-dispatch';
import {ValidationError} from '../../types/index';
import {updateOffersAction} from '../../store/api-actions';
import {getAuthorizationStatus} from '../../store/user-data/selectors';
import {getFavoriteOffers} from '../../store/favorites-data/selectors';
import {setFavoriteOffers} from '../../store/favorites-data/favorites-data';

type FavButtonProps = {
  offer: Offer;
  parent: string;
  width: number;
  height: number;
  onToggle?: (offerItem: OfferItem) => void;
}

function FavoriteButton({offer, parent, width, height, onToggle}: FavButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const isFavorite = offer.isFavorite;
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const favoriteOffers: Offer[] = useAppSelector(getFavoriteOffers);
  const navigate = useNavigate();
  const controllerRef:MutableRefObject<AbortController> = useRef(null);
  const api = createAPI();
  const buttonClasses = classNames([`button ${parent}__bookmark-button`, isFavorite && `${parent}__bookmark-button--active`]);
  const onFetch = function(toggleOffer:OfferItem){
    const newFavoriteOffers: Offer[] = JSON.parse(JSON.stringify(favoriteOffers)) as Offer[];
    if(toggleOffer.isFavorite){
      newFavoriteOffers.push(toggleOffer);
    } else {
      const curItemIndex: number = newFavoriteOffers.findIndex((item) => item.id === toggleOffer.id);
      newFavoriteOffers.splice(curItemIndex, 1);
    }
    dispatch(setFavoriteOffers(newFavoriteOffers));
    dispatch(updateOffersAction(toggleOffer));

    if(onToggle) {
      onToggle(toggleOffer);
    }
  };

  const handleButtonDown = function(){
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }

    if(controllerRef.current){
      return;
    }

    const newStatus = isFavorite ? 0 : 1;

    controllerRef.current = new AbortController();
    const signal:AbortSignal = controllerRef.current.signal;
    const config = {
      signal: signal
    } as AxiosRequestConfig;

    api.post<OfferItem>(`${APIRoute.Favorite}/${offer.id}/${newStatus}`, null, config)
      .then(({data})=>{
        onFetch(data);
      })
      .catch((error: unknown)=>{
        if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error) && error.code !== 'ERR_CANCELED') {
          const errorText: string | undefined = error.response?.data?.message;
          if (errorText) {
            toast.error(errorText);
          }
        }
      })
      .finally(()=>{
        controllerRef.current = null;
      });
  };

  useEffect(() => controllerRef.current?.abort(), []);

  return (
    <button
      className={buttonClasses}
      type="button"
      onPointerDown={handleButtonDown}
    >
      <svg className={`${parent}__bookmark-icon`} width={width} height={height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default FavoriteButton;
