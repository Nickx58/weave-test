import { useEffect, useRef, useState } from "react";
import { ReactComponent as CartIcon } from "../../assets/cart.svg";
import styles from "./Cart.module.css";
import { cls } from "../../utils";
import { useOnClickOutside } from "../../hooks/use-onclick-outside";
import { useCart } from "../../contexts/CartContext";
import { Button } from "../button/Button";
import CartItems from "../CartItems/CartItems";
import { MenuItem } from "../../api/menu";

export function Cart() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [items, setCartItems] = useState<MenuItem[]>([]);
  const [count, setCount] = useState<number>(0);

  const flyoutRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const { items: cartItems, setItems } = useCart();

  useOnClickOutside({
    ref: flyoutRef,
    handler: () => setIsOpen(false),
    captureClicks: false,
    clickCaptureIgnore: [triggerRef],
  });

  useEffect(() => {
    setCartItems(cartItems);
  }, [cartItems]);

  useEffect(() => {
    setCount(items.length);
  }, [items]);

  useEffect(() => {
    if (count === 0) {
      setItems([]);
    }
  }, [count, setItems]);

  const handleIncrease = (itemId: number) => {
    const updatedCart = items.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  const handleDecrease = (itemId: number) => {
    const updatedCart = items
      .map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    setCartItems(updatedCart);
  };

  const handleSubmit = () => {
    window.alert("Order Placed!");
    setItems([]);
  };

  const totalCount = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = Number(
    items.reduce((total, item) => total + item.quantity * item.price, 0)
  ).toFixed(2);

  return (
    <div style={{ position: "relative" }}>
      <button
        className={styles.button}
        disabled={!count}
        onClick={() => setIsOpen((state) => !state)}
        ref={triggerRef}
      >
        <CartIcon />
        <p>{totalCount}</p>
      </button>
      <div
        ref={flyoutRef}
        className={cls(styles.flyout, !isOpen && styles.closed)}
      >
        {count ? (
          items?.map((item) => (
            <CartItems
              key={item.name}
              name={item.name}
              description={item.description}
              imgUrl={item.imgUrl}
              price={item.price}
              quantity={item.quantity}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
              id={item.id}
            />
          ))
        ) : (
          <p>Your order is empty</p>
        )}
        {items.length > 0 && (
          <Button className="place-order" onClick={handleSubmit}>
            <div>Place Order</div>
            <div>Price ${totalPrice}</div>
          </Button>
        )}
      </div>
    </div>
  );
}
