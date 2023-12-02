import { useState } from 'react';
import { SortingOption, SORTING_DEFAULT_OPTION} from '../../const';
import classNames from "classnames";

type SortingProps = {
  onChangeSort: (sortingOption: string) => void;
}

function SortingForm({ onChangeSort }: SortingProps): JSX.Element {
  const [isOpened, setIsOpened] = useState(false);
  const [activeOption, setActiveOption] = useState<string>(SORTING_DEFAULT_OPTION);
  const sortListClass = classNames(['places__options places__options--custom', isOpened && 'places__options--opened']);

  const handleListClick = () => {
    setIsOpened(!isOpened);
  };

  const handleItemClick = (key: string) => {
    setActiveOption(key);
    onChangeSort(key);
    handleListClick();
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleListClick}>
        {activeOption}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={sortListClass}>
        {Object.keys(SortingOption).map((key) =>
          (
            <li
              tabIndex={0}
              key={key}
              className={`places__option ${key === activeOption && 'places__option--active'}`}
              onClick={() => handleItemClick(key)}
            >
              {SortingOption[key]}
            </li>
          )
        )}
      </ul>
    </form>
  );
}

export default SortingForm;
