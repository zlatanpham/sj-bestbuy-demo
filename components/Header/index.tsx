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
    <header className="bg-primary fixed inset-x-0 top-0 z-50">
      <div className="max-w-[1520px] mx-auto flex px-4 justify-between md:items-center py-2 md:py-4">
        <div className="flex items-center space-x-5">
          <a
            onClick={(e) => {
              e.preventDefault();
              router.push('/');
            }}
            className="font-bold text-2xl text-white cursor-pointer leading-none"
          >
            <LogoSvg width={68} height={40} />
          </a>
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
    </header>
  );
}
