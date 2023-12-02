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
import classNames from "classnames";
import {store} from "../../store/index";
import {setFavoriteCount} from "../../store/action";

type FavButtonProps = {
  offer: Offer,
  parent: string,
  width: number
  height: number
}

function FavoriteButton({offer, parent, width, height}: FavButtonProps): JSX.Element {
  const [isFavorite, setIsFavorite] = useState(offer.isFavorite);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const favoriteCount = useAppSelector((state) => state.favoriteCount);

  const navigate = useNavigate();
  const controllerRef:MutableRefObject<AbortController> = useRef(null);
  const api = createAPI();
  const buttonClasses = classNames([`button ${parent}__bookmark-button`, isFavorite && `${parent}__bookmark-button--active`]);
  const onToggle= function(data:Offer){
    const sign = data.isFavorite ? 1 : -1;
    const newCount = favoriteCount ? favoriteCount + sign : sign;
    store.dispatch(setFavoriteCount(newCount));
    setIsFavorite(data.isFavorite);
  }

  const handleButtonDown = function(){
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }
    if(controllerRef.current){ return; }

    const newStatus = isFavorite ? 0 : 1;

    controllerRef.current = new AbortController();
    const signal:AbortSignal = controllerRef.current.signal;
    const config = {
      signal: signal
    } as AxiosRequestConfig;

    api.post<Offer[]>(`${APIRoute.Favorite}/${offer.id}/${newStatus}`, null, config)
      .then(({data})=>{
        onToggle(data);
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
