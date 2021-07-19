import { useMemo } from 'react';
import { useSearchContext, useSorting, useFilter } from '@sajari/react-hooks';
import Result from './Result';
import Pagination from './Pagination';
import { ReactComponent as TimesIcon } from '../svg/times.svg';

const sortOptions = [
  { value: '', label: 'Most relevant' },
  { value: 'brand', label: 'Brand: A to Z' },
  { value: '-brand', label: 'Brand: Z to A' },
  { value: 'popularity', label: 'Popularity' },
];

export default function Results() {
  const { results = [], totalResults } = useSearchContext();
  const { sorting, setSorting } = useSorting();

  return (
    <div className="flex-1 overflow-hidden ml-5 mb-5">
      <div className="flex justify-between w-full border-t border-b border-gray-300 px-3 py-5">
        <span className="font-semibold">{totalResults} items</span>
        <div>
          <span className="mr-3 border-gray-300 text-sm">Sort by:</span>
          <select
            className="border border-gray-300 text-sm px-3 py-1 rounded"
            value={sorting}
            onChange={(e) => {
              setSorting(e.target.value);
            }}
          >
            {sortOptions.map((option) => {
              return (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div>
        <Filtered />
      </div>
      <div className="w-full overflow-hidden">
        {results.map(({ values = {} }) => (
          <Result key={values?._id as string} {...values} />
        ))}
      </div>
      <div>
        <Pagination />
      </div>
    </div>
  );
}

type FilterKind = 'brand' | 'category' | 'rating';

type Filter = { filter: FilterKind; value: string };

const Filtered = () => {
  const { resetFilters } = useSearchContext();
  const { selected: selectedBrand, setSelected: setSelectedBrand } =
    useFilter('brand');
  const { selected: selectedCategory, setSelected: setSelectedCategory } =
    useFilter('category');
  const { selected: selectedRating, setSelected: setSelectedRating } =
    useFilter('rating');

  const setSelecteds = {
    brand: setSelectedBrand,
    category: setSelectedCategory,
    rating: setSelectedRating,
  };

  const selecteds = {
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
    const setSelected = setSelecteds[filter];
    setSelected(selecteds[filter]?.filter((e) => e !== value));
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
            className="border border-gray-300 py-1 rounded text-sm my-1 px-4 inline-flex items-center"
            onClick={() => remove(e)}
          >
            {e.value}
            <span className="font-bold text-primary ml-3 cursor-pointer">
              <TimesIcon width={10} />
            </span>
          </button>
        );
      })}
      <button
        className="text-xs text-blue-700 cursor-pointer"
        onClick={() => resetFilters()}
      >
        Clear all
      </button>
    </div>
  );
};
