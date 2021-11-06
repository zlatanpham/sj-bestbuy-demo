import { useCartContext } from '../../context/CartContext';
import StarRating from '../StarRating';

export default function Result(props: any) {
  const { add } = useCartContext();

  return (
    <div className="mb-4 border-b">
      <div className="flex space-x-4 p-3">
        <div
          className="w-1/4 flex items-center p-4 cursor-pointer"
          style={{
            aspectRatio: '1/1',
          }}
        >
          <img className="m-auto" src={props?.image} alt={props?.name} />
        </div>
        <div className="flex-grow w-2/4 p-4">
          <div className="bg-primary inline-flex px-8 font-bold py-0.5 mb-2 text-white text-sm">
            A BEST BUY Brand
          </div>
          <div>
            <a className="text-blue-600 text-sm cursor-pointer hover:underline">
              {props?.name}
            </a>
          </div>
          <div className="flex items-center w-24 py-2">
            <StarRating percent={parseFloat(props.rating) * 20} />
            <span className="ml-1">({props.rating})</span>
          </div>
          <h3 className="text-base font-bold text-green-600">Get it today</h3>
          <div className="pt-2 text-sm">
            <strong className="font-bold">Pickup: </strong>
            <span>Available today at Aiea</span>
          </div>
          <div className="pb-2">
            <a className="text-xs text-blue-600 cursor-pointer hover:underline">
              See all pickup locations
            </a>
          </div>
          <div className="pt-2 text-sm">
            <strong className="font-bold">Shipping: </strong>
            <span>Unavailable in your area</span>
          </div>
          <div className="pt-1 text-xs leading-none">
            This item is only available in certain markets.
          </div>
          <div className="pb-2">
            <a className="text-xs leading-none text-blue-600 cursor-pointer hover:underline">
              Estimates for 96939
            </a>
          </div>
        </div>
        <div className="w-1/4 flex flex-col justify-start p-4">
          <h3 className="text-2xl font-bold mb-3">${props?.price}</h3>
          <button
            className="w-full bg-yellow-500 hover:bg-yellow-300 rounded font-medium text-sm px-3 py-1.5 transition duration-200"
            onClick={() => add(props?._id)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
