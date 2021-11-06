import { useQuery, useSearchContext, useSorting } from '@sajari/react-hooks';
import Result from './Result';
import Pagination from './Pagination';
import { FilterTags } from './SelectedFilters';
import { formatNumber } from '../../utils/number';

const sortOptions = [
  { value: '', label: 'Most relevant' },
  { value: 'brand', label: 'Brand: A to Z' },
  { value: '-brand', label: 'Brand: Z to A' },
  { value: 'popularity', label: 'Popularity' },
];

export default function Results() {
  const { results = [], totalResults } = useSearchContext();
  const { query, setQuery } = useQuery();
  const { sorting, setSorting } = useSorting();

  return (
    <div className="flex-1 overflow-hidden ml-5 mb-5">
      <div className="flex justify-between w-full border-t border-b border-gray-300 px-3 py-5">
        <span className="font-semibold">
          {formatNumber(totalResults)} items
        </span>
        <div>
          <span className="mr-3 border-gray-300 text-sm">Sort by:</span>
          <select
            className="border border-gray-300 text-sm px-3 py-1 rounded"
            value={sorting}
            onChange={(e) => {
              setSorting(e.target.value);
            }}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <FilterTags />
      <div className="w-full overflow-hidden">
        {results.length === 0 ? (
          <div className="max-w-xl pt-5">
            <p className="text-[20px] font-semibold mb-1">
              Hmmm, we didn't find anything for "{query}"
            </p>
            <p className="text-sm">
              Try a different search term or check out some of our suggestions
              below:
            </p>
            <div className="space-x-3 mt-4">
              {[
                'iPhone',
                'television',
                'apple',
                'philip',
                'vacuum',
                'audio',
              ].map((term) => (
                <button
                  className="text-primary underline"
                  key={term}
                  onClick={() => setQuery(term)}
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        ) : (
          results.map(({ values = {} }) => (
            <Result key={values?._id as string} {...values} />
          ))
        )}
      </div>
      <Pagination />
    </div>
  );
}
