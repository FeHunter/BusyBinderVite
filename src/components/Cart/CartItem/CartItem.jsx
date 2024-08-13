import { useEffect, useState } from "react";
import style from "./CartItem.module.css";
import { ButtonToDelete } from "../../Buttons/Buttons";

export function CartItem ({name, price, amount, image, onClick}){

    const [itemAmount, setItemAmount] = useState(amount);
    const [totalPrice, setTotalPrice] = useState(amount * price);

    useEffect(()=>{
        setTotalPrice(itemAmount * price);
    },[itemAmount]);

    return (
        <div className={style.CartItemContent}>
            <div className={style.ItemRevome}>
                <ButtonToDelete icon={<i class="fa-solid fa-delete-left"></i>} onClick={()=>{}} />
            </div>
            <div className={style.ItemImage}>
                <img src={image} />
            </div>
            <div className={style.ItemName}>
                <p className={style.itemInformation}>{name}</p>
            </div>
            <div className={style.ItemPrice}>
                <p className={style.itemInformation}>${price}</p>
            </div>
            <div className={style.ItemAmount}>
                <input className={style.itemInformation} type="number" min="1" value={itemAmount} onChange={(e)=>{setItemAmount(e.target.value)}} />
            </div>
            <div className={style.ItemTotal}>
                <p className={style.itemInformation}>${totalPrice}</p>
            </div>
        </div>
    );
}