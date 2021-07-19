import { useState } from 'react';
import { useQuery } from '@sajari/react-hooks';
import Results from '../components/Results';
import Filter from '../components/Filter';

export default function SearchPage() {
  const { query } = useQuery();

  return (
    <div className="container mx-auto">
      <div className="flex items-center text-xs h-10">
        {!!query && (
          <>
            <span>Result for </span>
            <b>"{query}"</b>.
          </>
        )}
      </div>
      <div className="flex ">
        <Filter />
        <Results />
      </div>
    </div>
  );
}
