import style from "./CartPage.module.css";
import { Header } from "../components/Header/Header";
import { CartItem } from "../components/Cart/CartItem/CartItem";
import { useNavigate } from "react-router-dom";
import PagesRoutes from "../assets/PagesRoutes";
import { useEffect, useState } from "react";
import { PaymentForm } from "../components/Forms/PaymentForm/PaymentForm";
import { AdressForm } from "../components/Forms/AdressForm/AdressForm";

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

                {/* My Order */}
                <section className={style.sectionContent}>
                    <p className={style.contentTitle}>My Order</p>
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

                {/* Payment Form */}
                <section className={style.sectionContent}>
                    <p className={style.contentTitle}>Payment Informations</p>
                    <PaymentForm />
                </section>

                {/* Adress Form */}
                <section className={style.sectionContent}>
                    <p className={style.contentTitle}>Delivre adress</p>
                    <AdressForm />
                </section>

                {/* Your Order - Resume */}
                <section className={style.sectionContent}>
                    <p className={style.contentTitle}>Your Order</p>
                    <table style={{ border: '1px solid gray' }}>
                        <thead style={{ background:'gray' }}>
                            <th>Product</th>
                            <th>Subtotal</th>
                        </thead>
                        <tbody style={{ background:'gray' }}>
                            <tr>
                                <td>Album de Velcro x 1</td>
                                <td>$34</td>
                            </tr>
                            <tr>
                                <td>Album de Velcro x 1</td>
                                <td>$34</td>
                            </tr>
                        </tbody>
                    </table>
                </section>

            </section>
        </>
    );
}