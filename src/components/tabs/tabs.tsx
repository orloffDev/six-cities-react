import {MouseEvent} from 'react';
import {Link} from 'react-router-dom';
import {useAppSelector} from '../../hooks/use-app-selector';
import {useAppDispatch} from '../../hooks/use-app-dispatch';
import {CityName} from '../../types/city-name';
import {CitiesList} from '../../const';
import {setActiveCityName} from '../../store/city-data/city-data';
import {getActiveCityName} from '../../store/city-data/selectors';
type ItemProps = {
  name: CityName;
}

function Item({name}: ItemProps): JSX.Element {
  const activeCityName: CityName = useAppSelector(getActiveCityName);
  const dispatch = useAppDispatch();
  const handleItemClick = function(e: MouseEvent){
    e.preventDefault();
    if(name === activeCityName){
      return;
    }
    dispatch(setActiveCityName(name));
  };

  return (
    <li className="locations__item">
      <Link
        to="#"
        className={`locations__item-link tabs__item  ${ activeCityName === name && 'tabs__item--active' }`}
        onClick={handleItemClick}
      >
        <span>{name}</span>
      </Link>
    </li>
  );
}

function Tabs(): JSX.Element {
  const list = Object.values(CitiesList) as Array<keyof typeof CitiesList>;

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {list.map((val) => (
            <Item key={val} name={val} />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Tabs;
