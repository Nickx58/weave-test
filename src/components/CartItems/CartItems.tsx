import { type CartItemsProps } from "./CartItemsType";
import { FC } from "react";
import plusSvg from "../../assets/plus.svg";
import minusSvg from "../../assets/minus.svg";

const CartItems: FC<CartItemsProps> = ({
  description,
  price,
  name,
  imgUrl,
  quantity,
  id,
  onDecrease,
  onIncrease,
}) => {
  return (
    <div className="item">
      <div className="image">
        <img className="item-image" src={imgUrl} alt={name} />
      </div>
      <div className="description">
        <span>{name}</span>
        <span>{description}</span>
        <span>${Number(price * quantity).toFixed(2)}</span>
      </div>
      <div className="quantity">
        <button
          onClick={() => onIncrease(id)}
          className="plus-btn"
          type="button"
          name="button"
        >
          <img src={plusSvg} alt="pluse icon" />
        </button>
        <input type="text" name="name" value={quantity} />
        <button
          onClick={() => onDecrease(id)}
          className="minus-btn"
          type="button"
          name="button"
        >
          <img src={minusSvg} alt="minus icon" />
        </button>
      </div>
    </div>
  );
};

export default CartItems;
