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
  const [items, setItems] = React.useState<CartItem[]>([]);

  const add = (itemId: string) => {
    const currentItem = items.find((item) => item.itemId === itemId);
    if (currentItem) {
      increment(itemId);
    } else {
      setItems([...items, { itemId, count: 1 } as CartItem]);
    }
  };

  const increment = (itemId: string) => {
    const currentItem = items.find((item) => item.itemId === itemId);
    if (!currentItem) {
      return;
    }
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
    const currentItem = items.find((item) => item.itemId === itemId);
    if (currentItem?.count && currentItem?.count > 1) {
      setItems(
        items.map((item) => {
          if (item.itemId === itemId) {
            return Object.assign(item, { count: item.count - 1 });
          }
          return item;
        }),
      );
    }
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

  useEffect(() => {
    const newItems = JSON.parse(
      window.localStorage.getItem('bestbuy_cart') || '[]',
    );
    setItems(newItems);
  }, []);

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
