import React, { useState, useMemo } from 'react';
import { useFilter } from '@sajari/react-hooks';
import StarRating from '../StarRating';
import { formatNumber } from '../../utils/number';

type Props = {
  name: string;
  title: string;
  size?: number;
};

type OptionType = {
  count: number;
  label: string;
  value: string;
};

export default function ListFilter({ name, title, size = 8 }: Props) {
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
      setSelected(selected.filter((s) => s !== value));
    } else {
      setSelected(selected.concat(value));
    }
  };

  const showMore = () => {
    if (limit * size >= totalOption) return;
    setLimit(limit + 1);
  };

  return (
    <div className="border-t px-5 py-4 border-gray-300 -mt-px">
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
        {listOption.slice(0, limit * size).map((option) => {
          return (
            <div
              key={option.value}
              className="flex justify-between items-center w-full py-1"
            >
              <div className="flex items-center">
                <input
                  id={option.label}
                  checked={selected.includes(option.label)}
                  type="checkbox"
                  className="cursor-pointer"
                  onChange={() => handleChangeValue(option.label)}
                />
                <label
                  className="ml-2 cursor-pointer text-sm"
                  htmlFor={option.label}
                >
                  {name === 'rating' ? (
                    <div className="flex items-center">
                      <StarRating percent={Number(option.label[0]) * 20} />
                      <span className="pl-2">
                        {Number(option.label) === 5
                          ? option.label
                          : `${option.label} & Up`}
                      </span>
                    </div>
                  ) : (
                    option.label
                  )}
                </label>
              </div>
              <span className="text-xs text-gray-500">
                {formatNumber(option.count)}
              </span>
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
