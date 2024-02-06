import styles from "./MenuItems.module.css";
import { type MenuItem as MenuItemType } from "../../api/menu";

const MenuCard = ({
  menuItem,
  onClick,
}: {
  menuItem: MenuItemType;
  onClick: (item: MenuItemType) => void;
}) => {
  return (
    <div className={styles.item} onClick={() => onClick(menuItem)}>
      {menuItem.imgUrl ? (
        <img
          src={menuItem.imgUrl}
          alt={menuItem.name}
          className={styles.image}
        />
      ) : (
        <div className={styles.image} />
      )}
      <div className={styles.right}>
        <span className={styles.title}>{menuItem.name}</span>
        <span className={styles.description}>{menuItem.description}</span>
        <div className={styles.tags}>
          {menuItem.tags.map((tag) => (
            <span key={tag} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
