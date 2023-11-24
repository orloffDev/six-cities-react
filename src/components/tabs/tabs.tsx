//react
import {Link} from "react-router-dom";
//types
import {CityName} from '../../types/city-name';
//const
import {CitiesList} from '../../const';
//store
import {store} from '../../store/index';

type ItemProps = {
  name: CityName;
}

const activeCityName: CityName = store.getState()['activeCityName'];

function Item({name}: ItemProps): JSX.Element {
  return (
    <li className="locations__item" >
      <Link
        to="#"
        className={`locations__item-link tabs__item  ${ activeCityName === name && 'tabs__item--active' }`}
      >
        <span>{name}</span>
      </Link>
    </li>
  );
}

function Tabs(): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {(Object.keys(CitiesList) as Array<keyof typeof CitiesList>).map((name) => (
            <Item key={name} name={name} />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Tabs;
