import { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import { useCart } from "../../contexts/CartContext";
import { type MenuItem as MenuItemType } from "../../api/menu";

import styles from "./MenuItems.module.css";

type MenuListProps = {
  items: MenuItemType[];
  selectedItem: string;
};

export function MenuItems({ items, selectedItem }: MenuListProps) {
  const [filteredItems, setFilteredItems] = useState<MenuItemType[]>(items);
  const { addItem } = useCart();

  const handleSelected = (item: MenuItemType) => {
    addItem(item);
  };

  useEffect(() => {
    if (!selectedItem || selectedItem === "all") return setFilteredItems(items);

    setFilteredItems(
      items.filter((item) => item.tags.some((tag) => tag === selectedItem))
    );
  }, [selectedItem, items]);

  return (
    <div className={styles.root}>
      {filteredItems.map((item, idx) => (
        <MenuCard
          key={item.name + idx}
          menuItem={item}
          onClick={handleSelected}
        />
      ))}
    </div>
  );
}
