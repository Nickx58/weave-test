import { useEffect, useState, FC } from "react";
import styles from "./Menu.module.css";
import { MenuFilters } from "./MenuFilters";
import { MenuItems } from "./MenuItems";
import * as api from "../../api/menu";
import { MenuLoadingSkeleton } from "./MenuLoadingSkeleton";

const MenuPage: FC = () => {
  const [selectedItem, setSelectedItem] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);

  const [menuFilters, setMenuFilters] = useState<
    Awaited<ReturnType<(typeof api)["getMenuFilters"]>>
  >([]);
  const [menuItems, setMenuItems] = useState<
    Awaited<ReturnType<(typeof api)["getMenuItems"]>>
  >([]);

  useEffect(() => {
    let isMounted = true;
    const fetchMenuData = async () => {
      try {
        const [filters, items] = await Promise.all([
          api.getMenuFilters(),
          api.getMenuItems(),
        ]);

        if (!isMounted) return;

        setMenuFilters(filters);
        setMenuItems(items);
        setLoading(false);
      } catch (error) {
        alert("Error Fetching Data");
        setLoading(false);
      }
    };
    fetchMenuData();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={styles.root}>
      <h1>Menu</h1>
      {loading ? (
        <MenuLoadingSkeleton />
      ) : (
        <>
          <MenuFilters
            menuFilters={menuFilters}
            selectedItem={selectedItem}
            onSelected={(key) => setSelectedItem(key)}
          />
          <MenuItems selectedItem={selectedItem} items={menuItems} />
        </>
      )}
    </div>
  );
};

export default MenuPage;
