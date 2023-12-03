import {Link} from 'react-router-dom';
import Header from '../../components/header/header';


function NotFoundScreen(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Header />
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
