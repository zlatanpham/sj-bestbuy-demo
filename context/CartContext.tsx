import React, { useEffect } from 'react';

interface CartItem {
  itemId: string;
  count: number;
}

type CartContextType = {
  items: CartItem[];
  add: (itemId: string) => void;
  increment: (itemId: string) => void;
  decrement: (itemId: string) => void;
  remove: (itemId: string) => void;
};

export const CartContext = React.createContext<CartContextType>(null!);

export const CartProvider: React.FC = ({ children }) => {
  const [items, setItems] = React.useState<CartItem[]>(() => {
    if (typeof window === 'undefined') {
      return [];
    }
    const newItems = JSON.parse(
      window.localStorage.getItem('bestbuy_cart') || '[]',
    );
    return newItems;
  });

  const add = (itemId: string) => {
    const currentItem = items.find((item) => item.itemId === itemId);
    if (currentItem) {
      increment(itemId);
    } else {
      setItems([...items, { itemId, count: 1 }]);
    }
  };

  const increment = (itemId: string) => {
    setItems(
      items.map((item) => {
        if (item.itemId === itemId) {
          return Object.assign(item, { count: item.count + 1 });
        }
        return item;
      }),
    );
  };

  const decrement = (itemId: string) => {
    setItems(
      items.map((item) => {
        if (item.itemId === itemId && item.count > 1) {
          return Object.assign(item, { count: item.count - 1 });
        }
        return item;
      }),
    );
  };

  const remove = (itemId: string) => {
    setItems(items.filter((item) => item.itemId !== itemId));
  };

  const saveToLocal = () => {
    window.localStorage.setItem('bestbuy_cart', JSON.stringify(items));
  };

  useEffect(() => {
    window.addEventListener('beforeunload', saveToLocal);
    return () => {
      window.removeEventListener('beforeunload', saveToLocal);
    };
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        add,
        increment,
        decrement,
        remove,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => React.useContext(CartContext);
