//react
import {MouseEvent} from 'react';
import {Link} from 'react-router-dom';
//hooks
import {useAppSelector} from '../../hooks/use-app-selector';
import {useAppDispatch} from '../../hooks/use-app-dispatch';
//action
import {setActiveCityName} from '../../store/action';
//types
import {CityName} from '../../types/city-name';
//const
import {CitiesList} from '../../const';
//props
type ItemProps = {
  name: CityName;
}

function Item({name}: ItemProps): JSX.Element {
  const activeCityName: CityName = useAppSelector((state) => state.activeCityName);
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
  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {(Object.keys(CitiesList) as Array<keyof typeof CityName>).map((name) => (
            <Item key={name} name={name} />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Tabs;
