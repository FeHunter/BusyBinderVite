import style from "./CartPage.module.css";
import { Header } from "../components/Header/Header";
import { CartItem } from "../components/Cart/CartItem/CartItem";
import { useNavigate } from "react-router-dom";
import PagesRoutes from "../assets/PagesRoutes";
import { useEffect, useState } from "react";
import { PaymentForm } from "../components/PaymentForm/PaymentForm";

export function CartPage (){

    const navigate = useNavigate(); // site navigation
    const [items, setItems] = useState(null);

    useEffect(()=>{
        loadCartItems();
    },[]);

    // Load Itens from firebase - debugging load from local
    const loadCartItems = () => {
        fetch("/src/assets/DebugPurpose/Items.json")
        .then(response => response.json())
        .then(json => setItems(json));
    }

    return (
        <>
            <Header/>
            <section className={style.CartPage}>
                
                <div>
                    <button onClick={()=>{navigate(PagesRoutes.HomePage)}}>Keep buying</button>
                </div>

                <section className={style.sectionContent}>
                    <p>My Order</p>
                    <div className={style.CartItemsHeader}>
                        <p>Item</p>
                        <p>Price</p>
                        <p>Amount</p>
                        <p>Total</p>
                    </div>
                    <div className={style.CartItens}>
                    {
                        items != null ?
                            items.map((item, index) => {
                                return (
                                    <CartItem
                                        key={`CartItem_${index}`}
                                        image={item.img}
                                        name={item.name}
                                        price={item.price}
                                        amount={item.amount}
                                        onClick={() => {}}
                                    />
                                );
                            })
                        :
                            <p>Add items to your cart</p>
                    }
                    </div>
                </section>

                <section className={style.sectionContent}>
                    <p>Payment Informations</p>
                    <div>
                        <PaymentForm />
                    </div>
                </section>
            </section>
        </>
    );
}