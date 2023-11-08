import {Link} from 'react-router-dom';

type LogoProps = {
  pageName?: string;
}

function Logo({pageName}: LogoProps): JSX.Element {
  const cls = 'header__logo-link' +  (pageName === 'welcome' ? 'header__logo-link--active' : '');

  return (
    <Link className={cls} to="/">
      <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
    </Link>
  );
}

export default Logo;
