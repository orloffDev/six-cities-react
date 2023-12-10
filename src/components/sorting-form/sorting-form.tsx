import { useState } from 'react';
import { SortingOption, SORTING_DEFAULT_OPTION} from '../../const';
import classNames from 'classnames';

type SortingProps = {
  onChangeSort: (value: string) => void;
}

function SortingForm({ onChangeSort }: SortingProps): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);
  const [activeOptionValue, setActiveOptionValue] = useState<string>(SORTING_DEFAULT_OPTION);
  const sortListClass = classNames(['places__options places__options--custom', isOpened && 'places__options--opened']);

  const handleListClick = () => {
    setIsOpened(!isOpened);
  };

  const handleItemClick = (value: string) => {
    setActiveOptionValue(value);
    onChangeSort(value);
    handleListClick();
  };

  return (
    <form data-testid="sorting-form" className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleListClick}>
        {activeOptionValue}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={sortListClass}>
        {Object.entries(SortingOption).map(([key, value]: string[]) =>
          (
            <li
              tabIndex={0}
              key={key}
              className={`places__option ${value === activeOptionValue && 'places__option--active'}`}
              onClick={() => handleItemClick(value)}
            >
              {value}
            </li>
          )
        )}
      </ul>
    </form>
  );
}

export default SortingForm;
