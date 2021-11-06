import { useMemo } from 'react';
import { useSearchContext, useFilter } from '@sajari/react-hooks';
import { ReactComponent as TimesIcon } from '../svg/times.svg';

type FilterType = 'brand' | 'category' | 'rating';
type Filter = { filter: FilterType; value: string };

export const FilterTags = () => {
  const { resetFilters } = useSearchContext();
  const { selected: selectedBrand, setSelected: setSelectedBrand } =
    useFilter('brand');
  const { selected: selectedCategory, setSelected: setSelectedCategory } =
    useFilter('category');
  const { selected: selectedRating, setSelected: setSelectedRating } =
    useFilter('rating');

  const setSelected = {
    brand: setSelectedBrand,
    category: setSelectedCategory,
    rating: setSelectedRating,
  };

  const selected = {
    brand: selectedBrand,
    category: selectedCategory,
    rating: selectedRating,
  };

  const allSelected: Filter[] = useMemo(() => {
    return [
      ...selectedBrand.map((e) => ({ filter: 'brand', value: e } as Filter)),
      ...selectedCategory.map(
        (e) => ({ filter: 'category', value: e } as Filter),
      ),
      ...selectedRating.map((e) => ({ filter: 'rating', value: e } as Filter)),
    ];
  }, [selectedBrand, selectedCategory, selectedRating]);

  const remove = ({ filter, value }: Filter) => {
    setSelected[filter](selected[filter]?.filter((e) => e !== value));
  };

  if (allSelected.length <= 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center space-x-2.5 my-2">
      <b className="text-sm">Filters: </b>
      {allSelected.map((e) => {
        return (
          <button
            key={e.value}
            className="border border-gray-300 py-1 rounded text-sm my-1 px-4 inline-flex items-center"
            onClick={() => remove(e)}
          >
            {e.value}
            <span className="font-bold text-primary ml-3">
              <TimesIcon width={10} />
            </span>
          </button>
        );
      })}
      <button className="text-xs text-blue-700" onClick={() => resetFilters()}>
        Clear all
      </button>
    </div>
  );
};
