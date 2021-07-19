import { useState } from 'react';

type StarProps = {
  fill?: boolean;
  w: number;
};

const Stars = ({ fill = false, w }: StarProps) => (
  <div className="w-full flex" style={{ width: w }}>
    {Array(5)
      .fill(0)
      .map((_, index) => (
        <svg
          key={index}
          className={`w-1/5 fill-current ${
            fill ? 'text-yellow-500' : 'text-gray-300'
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
            stroke={fill ? '#ec9900' : '#ababab'}
          />
        </svg>
      ))}
  </div>
);

type Props = {
  percent: number;
  width?: number;
};

export default function StarRating({ percent, width }: Props) {
  const [currentWidth, setCurrentWidth] = useState(0);

  return (
    <div
      className="relative"
      style={{
        width: width ? `${width}px` : 'auto',
      }}
      ref={(node) => {
        if (node) {
          setCurrentWidth(node.offsetWidth);
        }
      }}
    >
      <div
        className="overflow-hidden absolute"
        style={{ width: `${percent}%` }}
      >
        <Stars fill w={currentWidth} />
      </div>
      <Stars w={currentWidth} />
    </div>
  );
}
