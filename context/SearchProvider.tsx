import {
  SearchProvider,
  Pipeline,
  FieldDictionary,
  FilterBuilder,
} from '@sajari/react-hooks';

const pipeline = new Pipeline(
  {
    account: '1594153711901724220',
    collection: 'bestbuy',
  },
  'query',
);

const fields = new FieldDictionary({
  title: 'name',
  subtitle: (data) =>
    data.level4 || data.level3 || data.level2 || data.level1 || data.brand,
});

const brandFilter = new FilterBuilder({
  name: 'brand',
  field: 'brand',
});

const categoryFilter = new FilterBuilder({
  name: 'category',
  field: 'level1',
});

const ratingFilter = new FilterBuilder({
  name: 'rating',
  field: 'rating',
});

const SearchProviderCustom: React.FC<any> = ({ children }) => {
  return (
    <SearchProvider
      search={{
        pipeline,
        fields,
        filters: [categoryFilter, brandFilter, ratingFilter],
      }}
      searchOnLoad
    >
      {children}
    </SearchProvider>
  );
};

export default SearchProviderCustom;
