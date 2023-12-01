import {Offer} from "../../types/offer";
import {useEffect, useRef, useState} from "react";
import {AxiosError, AxiosRequestConfig} from "axios";
import {Review} from "../../types/review";
import {APIRoute} from "../../const";
import {AppRoute} from "../../const";
import {toast} from "react-toastify";
import {MutableRefObject} from "../../types/index";
import {AuthorizationStatus} from "../../const";
import {createAPI} from "../../services/api";
import {useAppSelector} from "../../hooks/use-app-selector";
import {useNavigate} from "react-router-dom";

type FavButtonProps = {
  offer: Offer
}

function FavoriteButton({offer}: FavButtonProps): JSX.Element {
  const [isFavorite, setIsFavorite] = useState(offer.isFavorite);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const navigate = useNavigate();
  const controllerRef:MutableRefObject<AbortController> = useRef(null);
  const api = createAPI();

  const onSuccess = function(data:Offer){
    setIsFavorite(data.isFavorite);
  }

  const pointerHandler = function(evt: React.PointerEvent<HTMLButtonElement>){
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }
    if(controllerRef.current){ console.log(88888); return; }

    const newStatus = isFavorite ? 0 : 1;

    controllerRef.current = new AbortController();
    const signal:AbortSignal = controllerRef.current.signal;
    const config = {
      signal: signal
    } as AxiosRequestConfig;

    api.post<Review>(`${APIRoute.Favorite}/${offer.id}/${newStatus}`, null, config)
      .then(({data})=>{
        onSuccess(data);
      })
      .catch((error: unknown)=>{
        if (error instanceof AxiosError && error.code !== "ERR_CANCELED") {
          const errorText: string | undefined = error?.response?.data?.message;
          if (errorText) {
            toast.error(errorText);
          }
        }
      })
      .finally(()=>{
        controllerRef.current = null;
      })
  }

  useEffect(() => {
    return()=>{
      controllerRef.current?.abort();
    }
  }, []);

  return (
    <button
      className={`place-card__bookmark-button button ${isFavorite && 'place-card__bookmark-button--active'}`}
      type="button"
      onPointerDown={pointerHandler}
    >
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default FavoriteButton;
