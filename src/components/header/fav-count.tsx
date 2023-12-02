import {useAppSelector} from "../../hooks/use-app-selector";

function FavCount(): JSX.Element {
  const favoriteCount = useAppSelector((state) => state.favoriteCount);

  return (
    <>
      <span className="header__favorite-count">
        {favoriteCount}
      </span>
    </>
  );
}

export default FavCount;
