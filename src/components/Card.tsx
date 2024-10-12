// Base imports 
import React, { FC, SetStateAction, Dispatch, useState, useRef, useEffect } from 'react';
import { CartItem, Dessert } from '../interfaces';
// Icons/Images
import Baklava from '../assets/image-baklava-desktop.jpg';
import Brownie from '../assets/image-brownie-desktop.jpg';
import Cake from '../assets/image-cake-desktop.jpg';
import CremeBrulee from '../assets/image-creme-brulee-desktop.jpg';
import Macaron from '../assets/image-macaron-desktop.jpg';
import PannaCotta from '../assets/image-panna-cotta-desktop.jpg';
import Pie from '../assets/image-pie-desktop.jpg';
import Tiramisu from '../assets/image-tiramisu-desktop.jpg';
import Waffle from '../assets/image-waffle-desktop.jpg';
import AddToCartIcon from '../assets/icon-add-to-cart.svg';
import incrementIcon from '../assets/icon-increment-quantity.svg';
import decrementIcon from '../assets/icon-decrement-quantity.svg';

interface CardPropTypes {
    index: number;
    dessert: Dessert;
    itemsInCart: CartItem[];
    setItemsInCart: Dispatch<SetStateAction<CartItem[]>>;
    itemsInCartCount: number;
    setItemsInCartCount: Dispatch<SetStateAction<number>>;
}

const Card: FC<CardPropTypes> = ({ index, dessert, itemsInCart, setItemsInCart, itemsInCartCount, setItemsInCartCount }) => {
    const [isInCart, setIsInCart] = useState(false);

    const addToCartBtnRef = useRef<HTMLButtonElement | null>(null);

    const itemQuantity = itemsInCart.find(item => item.name === dessert.name)?.quantity;

    const getImageUrl = (category: string) => {
        switch (category) {
            case 'Baklava':
                return Baklava;
            case 'Brownie':
                return Brownie;
            case 'Cake':
                return Cake;
            case 'Crème Brûlée':
                return CremeBrulee;
            case 'Macaron':
                return Macaron;
            case 'Panna Cotta':
                return PannaCotta;
            case 'Pie':
                return Pie;
            case 'Tiramisu':
                return Tiramisu;
            case 'Waffle':
                return Waffle;
        }
    };

    const handleItemInCart = () => {
        const cartItems = [...itemsInCart];

        const item: CartItem = {
            name: dessert.name,
            category: dessert.category,
            price: dessert.price,
            quantity: 1
        }

        if (addToCartBtnRef.current?.innerText === 'Add to Cart') {
            setIsInCart(true);

            cartItems.push(item);

            setItemsInCart(cartItems);
            setItemsInCartCount(itemsInCartCount + 1);
        }

    };

    const addToCart = () => {
        const cartItems = [...itemsInCart];

        const itemIndex = cartItems.findIndex(obj => obj.name === dessert.name);
        cartItems[itemIndex].quantity = cartItems[itemIndex].quantity + 1;

        setItemsInCart(cartItems);
        setItemsInCartCount(itemsInCartCount + 1);
    };

    const removeFromCart = () => {
        const cartItems = [...itemsInCart];

        const itemIndex = cartItems.findIndex(obj => obj.name === dessert.name);

        if (itemsInCart[itemIndex]?.quantity === 1) {
            setIsInCart(false);
            cartItems.splice(itemIndex, 1);
        } else {
            cartItems[itemIndex].quantity = cartItems[itemIndex].quantity - 1;
        }

        setItemsInCart(cartItems);
        setItemsInCartCount(itemsInCartCount - 1);
    };

    return (
        <div className='card'>
            <div className='img-container'>
                <img className='dessert-img' src={getImageUrl(dessert.category)} alt='dessert-img' />
                {isInCart ?
                    <button ref={addToCartBtnRef} className='in-cart-btn'>
                        <img className='increment-decrement-icons' src={decrementIcon} alt='decrement-icon' onClick={removeFromCart} />
                        <span>{itemQuantity}</span>
                        <img className='increment-decrement-icons' src={incrementIcon} alt='increment-icon' onClick={addToCart} />
                    </button>
                    :
                    <button ref={addToCartBtnRef} className='img-container-btn' onClick={handleItemInCart}>
                        <>
                            <img src={AddToCartIcon} alt='add-to-cart-icon' />
                            <span>Add to Cart</span>
                        </>
                    </button>
                }
            </div>

            <div>
                <div className='dessert-category'>{dessert.category}</div>
                <div className='dessert-name'>{dessert.name}</div>
                <div className='dessert-price'>{(dessert.price).toFixed(2)}</div>
            </div>
        </div>
    )
};

export default Card;