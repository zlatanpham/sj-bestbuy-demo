import { useQuery } from '@sajari/react-hooks';
import { ReactComponent as SearchIcon } from './svg/search.svg';
import { ChangeEvent } from 'react';

export default function SearchBox() {
  const { setQuery } = useQuery();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form className="relative">
      <input
        className="w-screen max-w-2xl h-10 px-3 text-base text-gray-900 border rounded"
        placeholder="Search best buy"
        onChange={onChange}
      />
      <button className="text-primary absolute inset-y-0 right-0 px-2">
        <SearchIcon width={22} />
      </button>
    </form>
  );
}
