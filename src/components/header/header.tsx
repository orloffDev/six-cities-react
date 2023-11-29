import {Link} from "react-router-dom";
import Logo from "../logo/logo";
import {useAppDispatch} from "../../hooks/use-app-dispatch";
import {logoutAction} from "../../store/api-actions";
import {useAppSelector} from "../../hooks/use-app-selector";
import {AppRoute, AuthorizationStatus} from "../../const";


function SignOut(): JSX.Element {
  const dispatch = useAppDispatch();
  const userData = useAppSelector((state) => state.userData);

  return (
    <ul className="header__nav-list">
      <li className="header__nav-item user">
        <a className="header__nav-link header__nav-link--profile" href="#">
          <div className="header__avatar-wrapper user__avatar-wrapper">
          </div>
          <span className="header__user-name user__name">{userData?.name}</span>
          <span className="header__favorite-count">3</span>
        </a>
      </li>
      <li className="header__nav-item">
        <Link
          className="header__nav-link"
          onClick={(e)=>{
            e.preventDefault();
            dispatch(logoutAction());
          }}
          to='/'
        >
          <span className="header__signout">Sign out</span>
        </Link>
      </li>
    </ul>

  );
};

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
};

function Header(): JSX.Element {
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            {<Logo pageName="welcome"></Logo>}
          </div>
          <nav className="header__nav">
            {authorizationStatus === AuthorizationStatus.Auth ? <SignOut /> : <SignIn />}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
