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
        // loadCartItems();
    },[]);

    // Load Itens from firebase - debugging load from local
    // const loadCartItems = () => {
    //     fetch("../assets/DebugPurpose/Items.json")
    //     .then(response => response.json())
    //     .then(json => console.log(json));
    // }

    const changeItemAmount = () => {

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
                        <CartItem
                            image={"./src/Images/aux_book_1.png"}
                            name={"Album 1"}
                            price={12}
                            amount={1}
                        />
                        <CartItem
                            image={"./src/Images/aux_book_2.png"}
                            name={"Album 2"}
                            price={24}
                            amount={1}
                        />
                        <CartItem
                            image={"./src/Images/aux_book_3.png"}
                            name={"Album 3"}
                            price={15}
                            amount={1}
                        />
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