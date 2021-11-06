import ListFilter from './ListFilter';

export default function Filters() {
  return (
    <div className="flex-none w-80 max-h-screen border border-gray-300 sticky top-20 overflow-auto">
      <ListFilter name="brand" title="Brand" />
      <ListFilter name="category" title="Category" />
      <ListFilter name="rating" title="Rating" />
    </div>
  );
}
