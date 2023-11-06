import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import OfferScreen from '../../pages/offer-screen/offer-screen';
import WelcomeScreen from '../../pages/welcome-screen/welcome-screen';
import NotFoundScreen from '../../pages/not-found-screen/not-found-screen';

type BaseTemplateProps = {
  pageName: string;
  modifierClass: string;
}

function BaseTemplate(props): JSX.Element {
  console.log(props);
  const cls = props;
  return (
    <div>
      {props}
    </div>
  )

}

export default BaseTemplate;
