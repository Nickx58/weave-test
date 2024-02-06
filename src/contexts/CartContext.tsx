import { createContext, useContext, useState } from "react";
import { MenuItem } from "../api/menu";

type CartContextType = {
  items: MenuItem[];
  addItem: (item: MenuItem) => void;
  setItems: (item: MenuItem[]) => void;
};

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  setItems: () => {},
});

type CartProviderProps = {
  children: React.ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<MenuItem[]>([]);

  const addItem = (item: MenuItem) => {
    return setItems((items) => [...items, item]);
  };

  return (
    <CartContext.Provider value={{ items, addItem, setItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
