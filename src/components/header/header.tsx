import {Link} from 'react-router-dom';
import Logo from '../logo/logo';
import {useAppDispatch} from '../../hooks/use-app-dispatch';
import {logoutAction} from '../../store/api-actions';
import {useAppSelector} from '../../hooks/use-app-selector';
import {AppRoute, AuthorizationStatus} from '../../const';
import {useFavoriteCount} from '../../hooks/use-favorite-count';
import {getUserData} from '../../store/user-data/selectors';
import {getAuthorizationStatus} from '../../store/user-data/selectors';


function SignOut(): JSX.Element {
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUserData);
  const favoriteCount = useFavoriteCount();

  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <Link
          className="header__nav-link header__nav-link--profile"
          to={AppRoute.Favorites}
        >
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__user-name user__name">{userData?.name}</span>
          <span className="header__favorite-count">
            {favoriteCount}
          </span>
        </Link>
      </li>
      <li className="header__nav-item">
        <Link
          className="header__nav-link"
          onClick={(e)=>{
            e.preventDefault();
            dispatch(logoutAction());
          }}
          to={AppRoute.Main}
        >
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </ul>

  );
}

function SignIn(): JSX.Element {
  return (
    <ul className="header__nav-list">
      <li className="header__nav-item">
        <Link
          className="header__nav-link"
          to={AppRoute.Login}
        >
          <span className="header__signout">Sign in</span>
        </Link>
      </li>
    </ul>
  );
}

function Nav(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  return (
    <nav className="header__nav">
      {authorizationStatus === AuthorizationStatus.Auth ? <SignOut /> : <SignIn />}
    </nav>
  );
}

type HeaderProps = {
  nav?: boolean;
}

function Header({nav}: HeaderProps): JSX.Element {
  return (
    <header data-testid="header" className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            {<Logo pageName="welcome"></Logo>}
          </div>
          {nav && <Nav />}
        </div>
      </div>
    </header>
  );
}

export default Header;
