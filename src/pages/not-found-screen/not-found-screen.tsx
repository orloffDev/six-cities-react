import Logo from "../../components/logo/logo";
import {Link} from 'react-router-dom';


function NotFoundScreen(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              {<Logo pageName="notFound"></Logo>}
            </div>
          </div>
        </div>
      </header>
      <main className="page__404">
        <div className="container">
          <div style={{display: 'flex', flexDirection:'column', alignItems:'center'}}>
            <span style={{display: 'block', fontSize:'12vw'}}>404</span>
            <Link to="/">На главную</Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default NotFoundScreen;



