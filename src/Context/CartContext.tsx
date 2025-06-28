// context/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import Toast from 'react-native-toast-message';

export type Product = {
    id: string;
    name: string;
    image: string;
    description: string;
    price: string;
    quantity?: number;
};

type CartContextType = {
    cart: Product[];
    addToCart: (product: Product) => void;
    removeFromCart: (id: string) => void;
    increaseQty: (id: string) => void;
    decreaseQty: (id: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<Product[]>([]);

    const addToCart = (product: Product) => {
        const exists = cart.find((p) => p.id === product.id);
        if (exists) {
            Toast.show({
                type: 'info',
                text1: `${product.name} is already in the cart`,
                visibilityTime: 1500,
                position: 'top',
            });
            return;
        }

        setCart([...cart, { ...product, quantity: 1 }]);

        Toast.show({
            type: 'success',
            text1: `${product.name} added to cart`,
            visibilityTime: 1500,
            position: 'top',
        });
    };

    const removeFromCart = (id: string) => {
        setCart((prev) => prev.filter((p) => p.id !== id));
        Toast.show({
            type: 'success',
            text1: ` Removed from the cart`,
            visibilityTime: 1500,
            position: 'top',
        });
    };

    const increaseQty = (id: string) => {
        setCart((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, quantity: (p.quantity || 1) + 1 } : p
            )
        );
    };

    const decreaseQty = (id: string) => {
        setCart((prev) =>
            prev
                .map((p) =>
                    p.id === id ? { ...p, quantity: Math.max((p.quantity || 1) - 1, 1) } : p
                )
        );
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQty, decreaseQty }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
};
