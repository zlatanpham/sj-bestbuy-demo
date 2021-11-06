import { useQuery, useSearchContext } from '@sajari/react-hooks';
import Results from '../components/Results';
import Filters from '../components/Filters';
import { Skeleton } from '../components/Skeleton';

const ProductCardSkeleton = () => (
  <div className="flex">
    <div className="w-80">
      <div className="w-full pb-[100%] relative">
        <Skeleton className="absolute inset-0" />
      </div>
    </div>
    <div className="w-1/2 px-10 space-y-6">
      <div className="space-y-3">
        <Skeleton className="w-full h-6" />
        <Skeleton className="w-2/3 h-5" />
        <Skeleton className="w-full h-5" />
        <Skeleton className="w-4/5 h-5" />
        <Skeleton className="w-4/5 h-5" />
      </div>

      <div className="space-y-2">
        <Skeleton className="w-1/2 h-4" />
        <Skeleton className="w-2/3 h-4" />
        <Skeleton className="w-1/2 h-4" />
      </div>
    </div>
    <div className="space-y-2 flex-1">
      <Skeleton className="w-40 h-3" />
      <Skeleton className="w-40 h-10" />
      <Skeleton className="w-full h-8" />
    </div>
  </div>
);

const LoadingScreen = () => (
  <div className="flex">
    <div className="space-y-3 w-80">
      <Skeleton className="w-full h-5" />
      <Skeleton className="w-2/3 h-5" />
      <Skeleton className="w-full h-5" />
      <Skeleton className="w-4/5 h-5" />
      <Skeleton className="w-full h-5" />
    </div>
    <div className="flex-1 space-y-10 pl-10">
      <Skeleton className="w-full h-10" />
      <ProductCardSkeleton />
    </div>
  </div>
);

export default function SearchPage() {
  const { query } = useQuery();
  const { results } = useSearchContext();

  return (
    <div className="max-w-[1520px] px-4 mx-auto w-full">
      <div className="flex items-center text-xs h-10">
        {!!query && (
          <>
            <span>Result for </span>
            <b>"{query}"</b>.
          </>
        )}
      </div>
      {typeof results === 'undefined' ? (
        <LoadingScreen />
      ) : (
        <div className="flex">
          <Filters />
          <Results />
        </div>
      )}
    </div>
  );
}
