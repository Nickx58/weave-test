export type CartItemsProps = {
    description: string;
    price: number;
    name: string;
    imgUrl?: string;
    quantity: number;
    id: number;
    onIncrease: (id: number) => void;
    onDecrease: (id: number) => void;
}