import { useMemo } from 'react';
import { useCartContext } from '../context/CartContext';
import { Variables, useSearch, Pipeline } from '@sajari/react-hooks';
import Link from 'next/link';

const pipeline = new Pipeline(
  {
    account: '1594153711901724220',
    collection: 'bestbuy',
  },
  'query',
);

export default function SearchPage() {
  const { items, increment, decrement, remove } = useCartContext();

  const variables = useMemo(() => {
    const filter = items.map((i) => `_id = '${i.itemId}'`).join(' OR ');
    return new Variables({
      filter,
    });
  }, [items]);

  const { results = [], searching } = useSearch({ variables, pipeline });

  const cartItems = useMemo(() => {
    return items.map((item) => {
      const { values = {} } =
        results.find((r) => r.values._id === item.itemId) || {};
      return {
        _id: values._id as string,
        name: values.name,
        image: values.image as string,
        price: parseFloat((values.price as string) || '0'),
        count: item.count,
      };
    });
  }, [items, results]);

  const total = useMemo(() => {
    return cartItems.reduce((a, i) => a + i.count * i.price, 0).toFixed(2);
  }, [cartItems]);

  const isEmpty = cartItems.length === 0;

  return (
    <div className="bg-gray-50 flex-grow w-full">
      <div className="max-w-[1520px] px-4 mx-auto flex">
        <div className="w-2/3 flex-none overflow-hidden py-6 pr-6">
          <h2 className="text-xl font-bold pb-3">Your cart</h2>
          {isEmpty ? (
            <p className="text-sm">
              Your cart is empty. Start browsering thousands of items in{' '}
              <Link href="/">
                <a className="text-primary underline">marketplace</a>
              </Link>
              .
            </p>
          ) : (
            cartItems.map((item) =>
              !item._id ? null : (
                <div
                  key={item._id}
                  className="w-full flex justify-between bg-white border border-gray-300 p-5 mb-3"
                >
                  <div
                    className="w-1/6 flex items-center"
                    style={{ aspectRatio: '1/1' }}
                  >
                    <img src={item.image} alt={item.name as string} />
                  </div>
                  <div className="mx-5 w-5/12">
                    <span className="text-blue-400 text-sm cursor-pointer hover:underline">
                      {item.name}
                    </span>
                  </div>
                  <div className="w-1/4 flex flex-col flex-none items-center">
                    <div className="flex items-center">
                      <button
                        onClick={() => decrement(item._id)}
                        className="border rounded px-3 py-1 text-lg"
                      >
                        -
                      </button>
                      <span className="text-lg w-10 text-center">
                        {item.count}
                      </span>
                      <button
                        onClick={() => increment(item._id)}
                        className="border rounded px-3 py-1 text-lg"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => remove(item._id)}
                      className="text-blue-400 mt-4 text-xs cursor-pointer hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                  <span className="w-1/6 text-right font-bold">
                    ${item.price}
                  </span>
                </div>
              ),
            )
          )}
        </div>
        <div className="flex-none border bg-white w-1/3 p-9">
          <h2 className="text-xl text-center font-bold pb-3 border-b">
            Order Summary
          </h2>
          <div className="border-b py-2">
            <div className="flex justify-between text-sm">
              <span>Item Total</span>
              <span>${total}</span>
            </div>
            <div className="flex justify-between text-sm ">
              <span>Estimated Sales Tax</span>
              <span>Calculated in checkout</span>
            </div>
          </div>
          <div className="flex justify-between font-bold py-2">
            <span>Total</span>
            <span>${total}</span>
          </div>
          <div className="my-2">
            <button
              key={String(searching)}
              className={`w-full rounded py-3 font-semibold ${
                !isEmpty
                  ? 'bg-yellow-500 hover:bg-yellow-300 cursor-pointer'
                  : 'bg-gray-100 text-gray-500 cursor-not-allowed'
              }`}
              disabled={isEmpty}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
