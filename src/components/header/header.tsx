import {Link} from "react-router-dom";
import Logo from "../logo/logo";
import {useAppDispatch} from "../../hooks/use-app-dispatch";
import {logoutAction, loginAction} from "../../store/api-actions";
import {useAppSelector} from "../../hooks/use-app-selector";
import {AuthorizationStatus} from "../../const";


function SignOut(): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <Link
      className="header__nav-link"
      onClick={(e)=>{
        e.preventDefault();
        dispatch(loginAction());
      }}
      to='/'
    >
      <span className="header__signout">Sign out</span>
    </Link>
  );
};

function SignIn(): JSX.Element {
  const dispatch = useAppDispatch();
  return (
    <Link
      className="header__nav-link"
      to='/'
    >
      <span className="header__signout">Sign in</span>
    </Link>
  );
};

function Header(): JSX.Element {

  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const signText = authorizationStatus === AuthorizationStatus.Auth ? 'Sign out' : 'Sign in';
  const signHandler = (e)=>{
    evt.preventDefault();

    dispatch(loginAction());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            {<Logo pageName="welcome"></Logo>}
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <a className="header__nav-link header__nav-link--profile" href="#">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                  <span className="header__favorite-count">3</span>
                </a>
              </li>
              <li className="header__nav-item">
                <Link
                  className="header__nav-link"
                  onClick={signHandler}
                  to='/'
                >
                  <span className="header__signout">{signText}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
