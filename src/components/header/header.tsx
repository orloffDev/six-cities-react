import {Link} from "react-router-dom";
import Logo from "../logo/logo";
import {useAppDispatch} from "../../hooks/use-app-dispatch";
import {logoutAction, loginAction} from "../../store/api-actions";


function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const signHandler = (e)=>{
    evt.preventDefault();
    dispatch(logoutAction());
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
                  onClick={(evt) => {
                    evt.preventDefault();
                    dispatch(logoutAction());
                  }}
                  to='/'
                >
                  <span className="header__signout">Sign out</span>
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
