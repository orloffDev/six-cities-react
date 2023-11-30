import {useAppSelector} from "../../hooks/use-app-selector";

function FavCount(): JSX.Element {
  alert(111);
  const userFavCount = useAppSelector((state) => state.userFavCount);
  return (
    <span className="header__favorite-count">3</span>
  );
}

export default FavCount;
