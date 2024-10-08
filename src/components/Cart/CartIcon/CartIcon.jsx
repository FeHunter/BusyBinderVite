import { useNavigate } from "react-router-dom";
import style from "./CartIcon.module.css";
import PagesRoutes from "../../../assets/PagesRoutes";
import { useEffect, useState } from "react";
import { localStorageRoutes } from "../../../assets/localStorageRoutes";

export function CartIcon (){

    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState(0);

    useEffect(()=>{
        loadCartItems();
    }, []);

    // Load Itens from firebase - debugging load from local
    const loadCartItems = () => {
        // localStorage.removeItem(localStorageRoutes.myCart)
        const loadCart = localStorage.getItem(localStorageRoutes.myCart)
        setCartItems(loadCart != null ? JSON.parse(loadCart) : [])
    }

    const cartIconSVG = <svg width={30} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
    </svg>

    return (
        <div className={style.cartContent} onClick={()=>{navigate(PagesRoutes.Cart)}}>
            <div className={style.qtdContent}>{cartItems.length}</div>
            <div style={{fontSize: '1.3em'}}>{<i class="fa-solid fa-bag-shopping"></i>}</div>
        </div>
    );
}