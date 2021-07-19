import React, { useState, useMemo } from 'react';
import { useFilter } from '@sajari/react-hooks';
import StarRating from '../StarRating';

type Props = {
  name: string;
  title: string;
};

type OptionType = {
  count: number;
  label: string;
  value: string;
};

const size = 8;
export default function ListFilter({ name, title }: Props) {
  const { options, selected, setSelected } = useFilter(name);
  const [searchFilter, setSearchFilter] = useState('');
  const [limit, setLimit] = useState(1);

  const { listOption, totalOption } = useMemo(() => {
    if (name === 'rating') {
      return {
        listOption: options.slice(1).reverse(),
        totalOption: options.length,
      };
    }

    const listOption: OptionType[] = [];
    options.forEach((option) => {
      if (
        options.length > size &&
        !option.label.toLowerCase().includes(searchFilter.toLowerCase())
      ) {
        return;
      }

      if (selected.includes(option.label)) {
        listOption.unshift(option as OptionType);
      } else {
        listOption.push(option as OptionType);
      }
    });

    return {
      listOption,
      totalOption: listOption.length,
    };
  }, [options, selected, searchFilter]);

  const handleChangeValue = (value: string) => {
    value = value.replace(/"/g, "'");
    if (selected.includes(value)) {
      setSelected(selected.filter((s) => s != value));
    } else {
      setSelected(selected.concat(value));
    }
  };

  const showMore = () => {
    if (limit * size >= totalOption) return;
    setLimit(limit + 1);
  };

  return (
    <div className="border-b px-5 py-4 border-gray-300">
      <b className="text-sm">{title}</b>
      <div className="mt-3">
        {options.length > size && (
          <input
            className="w-full px-2 py-1 mb-3 text-sm text-gray-900 border rounded border-gray-300"
            value={searchFilter}
            placeholder={`Search ${title?.toLowerCase()}`}
            onChange={(e) => {
              setSearchFilter(e.target.value?.trim());
            }}
          />
        )}
        {listOption.slice(0, limit * size).map((o, id) => {
          return (
            <div
              key={o.value}
              className="flex justify-between items-center py-1 cursor-pointer"
              onClick={(e) => {
                handleChangeValue(o.label);
                e.preventDefault();
              }}
            >
              <div className="flex items-center">
                <input
                  id={o.label}
                  checked={selected.includes(o.label)}
                  readOnly
                  type="checkbox"
                />
                <label
                  className="ml-2 cursor-pointer text-sm"
                  htmlFor={o.label}
                >
                  {name === 'rating' ? (
                    <div className="flex items-center">
                      <StarRating
                        width={70}
                        percent={Number(o.label[0]) * 20}
                      />
                      <span className="pl-2">
                        {Number(o.label) === 5 ? o.label : `${o.label} & Up`}
                      </span>
                    </div>
                  ) : (
                    o.label
                  )}
                </label>
              </div>
              <span className="text-xs text-gray-500">{o.count}</span>
            </div>
          );
        })}
      </div>

      {limit * size < totalOption ? (
        <button className="text-primary text-sm mt-2" onClick={showMore}>
          Show more
        </button>
      ) : null}
    </div>
  );
}
