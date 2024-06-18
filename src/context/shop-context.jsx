import React, { createContext, useState} from "react";
import { PRODUCTS } from "../products";

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {}
    for (let i = 1; i < PRODUCTS.length + 1; i++) {
        cart[i] = 0
    }
    return cart;
}

export const ShopContextProvider = (props) => {

    const [cartItems, setCartItems] = useState(getDefaultCart());
    
    const getTotalCartAmount = () => {
        let totalCartAmount = 0;
        for (const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = PRODUCTS.find((product) => product.id === Number(item));
                totalCartAmount += cartItems[item] * itemInfo.price;
            }
        }
        return totalCartAmount;
    }

    const addToCart = (ItemId) => {
        setCartItems((prev) => ({...prev, [ItemId]: prev[ItemId] + 1}));
    };

    const removeFromCart = (ItemId) => {
        setCartItems((prev) => ({...prev, [ItemId]: prev[ItemId] - 1}));
    };

    const updateCartItemsCount = (newAmount, ItemId) => {
        setCartItems((prev) => ({...prev, [ItemId]: newAmount}));
    };

    const checkout = () => {
        setCartItems(getDefaultCart());
    }

    const contextValue = {
        cartItems,
        addToCart,
        removeFromCart,
        updateCartItemsCount,
        getTotalCartAmount,
        checkout,
    };

    
    console.log(cartItems);

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}