import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { useCartContext } from '../../context/CartContext';
import SearchBox from '../SearchBox';
import { ReactComponent as LogoSvg } from './logo.svg';
import { ReactComponent as ShoppingCartIcon } from './cart.svg';

export default function Header() {
  const router = useRouter();
  const { items } = useCartContext();
  const total = useMemo(() => items.reduce((a, i) => a + i.count, 0), [items]);
  return (
    <div className="bg-primary">
      <nav className="py-2 md:py-4">
        <div className="container flex px-4 mx-auto justify-between md:flex md:items-center">
          <div className="flex items-center space-x-5">
            <div className="flex justify-between items-center">
              <a
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/');
                }}
                className="font-bold text-2xl text-white cursor-pointer leading-none"
              >
                <LogoSvg width={68} height={40} />
              </a>
            </div>
            <SearchBox />
          </div>
          <div
            className="group cursor-pointer flex items-center text-center md:flex-row mt-3 md:mt-0"
            onClick={() => {
              router.push('/cart');
            }}
          >
            <div className="relative">
              <ShoppingCartIcon width={30} className="text-white" />
              {total > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-300 px-1 text-xs rounded-full">
                  {total}
                </span>
              )}
            </div>
            <span className="group-hover:underline text-lg text-white font-bold leading-none ml-1">
              Cart
            </span>
          </div>
        </div>
      </nav>
    </div>
  );
}
