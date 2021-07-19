import { useMemo } from 'react';
import { usePagination } from '@sajari/react-hooks';

const range = (min: number, max: number) =>
  Array.from({ length: max - min + 1 }, (_, i) => min + i);

export default function Pagination() {
  const { page, setPage, resultsPerPage, pageCount, totalResults } =
    usePagination();
  const show = 5;

  const [start, end] = useMemo(() => {
    const get = (min: number, max: number, num: number) => {
      return num < min ? min : num > max ? max : num;
    };
    const s = get(1, pageCount - show, page - 2);
    const e = get(pageCount < show ? pageCount : show, pageCount, page + 2);
    return [s, e];
  }, [page, pageCount]);

  const PageLink = ({ children, page }: { children: any; page: number }) => (
    <span
      className="p-2 text-blue-700 font-bold text-sm cursor-pointer hover:underline"
      onClick={() => setPage(page)}
    >
      {children}
    </span>
  );

  const [from, to] = useMemo(() => {
    const from = (page - 1) * resultsPerPage + 1;
    const to =
      totalResults < page * resultsPerPage
        ? totalResults
        : page * resultsPerPage;
    return [from, to];
  }, [page, resultsPerPage, totalResults]);

  if (totalResults === 0 || pageCount === 1) {
    return <div />;
  }

  return (
    <div className="flex justify-between my-3">
      <div className="text-xs">
        {from} - {to} of&nbsp;
        {totalResults} items
      </div>
      <div>
        {start !== 1 && (
          <>
            <PageLink page={page - 1 || 1}>&lt;</PageLink>
            <PageLink page={1}>1</PageLink>
            <span>...</span>
          </>
        )}
        {range(start, end).map((i) => {
          if (i === page) {
            return <span className="p-2 font-bold text-sm">{i}</span>;
          }
          return <PageLink page={i}>{i}</PageLink>;
        })}
        {end !== pageCount && (
          <>
            <span>...</span>
            <PageLink page={pageCount}>{pageCount}</PageLink>
            <PageLink page={page + 1 > pageCount ? pageCount : page + 1}>
              &gt;
            </PageLink>
          </>
        )}
      </div>
    </div>
  );
}
