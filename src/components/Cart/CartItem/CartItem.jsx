import { useEffect, useState } from "react";
import style from "./CartItem.module.css";

export function CartItem ({name, price, amount, image, onClick}){

    const [itemAmount, setItemAmount] = useState(amount);
    const [totalPrice, setTotalPrice] = useState(amount * price);

    useEffect(()=>{
        setTotalPrice(itemAmount * price);
    },[itemAmount]);

    return (
        <div className={style.CartItemContent}>
            <div className={style.CartItemImage}>
                <img src={image} />
            </div>
            <div className={style.CartItem}>
                <p>Item</p>
                <p className={style.itemInformation}>{name}</p>
            </div>
            <div className={style.CartItem}>
                <p>Price</p>
                <p className={style.itemInformation}>${price}</p>
            </div>
            <div className={style.CartItem}>
                <p>Amout</p>
                <input className={style.itemInformation} type="number" min="1" value={itemAmount} onChange={(e)=>{setItemAmount(e.target.value)}} />
            </div>
            <div className={style.CartItem}>
                <p>Total Price</p>
                <p className={style.itemInformation}>${totalPrice}</p>
            </div>
            <div className={style.CartItem}>
                <p>Remove</p>
                <button>Delete</button>
            </div>
        </div>
    );
}