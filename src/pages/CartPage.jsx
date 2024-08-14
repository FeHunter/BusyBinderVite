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
    const [totalValue, setTotalValue] = useState(0);

    useEffect(()=>{
        loadCartItems()
    },[])

    useEffect(()=>{
        getTotalValue()
    }, [items])

    // Load Itens from firebase - debugging load from local
    const loadCartItems = () => {
        fetch("/src/assets/DebugPurpose/Items.json")
        .then(response => response.json())
        .then(json => setItems(json));
    }

    const getTotalValue = () => {
        let count = 0;
        if (items != null){
            for (let i=0; i < items.length; i++){
                count += parseFloat(items[i].price);
            }
        }
        setTotalValue(count);
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
                    <table className={style.OrderResumeTable}>
                        <thead style={{ textAlign: 'left' }}>
                            <th>Product</th>
                            <th>Subtotal</th>
                        </thead>
                        <tbody>
                            {
                                items != null ?
                                    items.map((item, index) => {
                                        return (
                                            <tr key={`table_row_${index}`}>
                                                <td style={{ borderBottom: '1px dashed gray' }}>{item.name} x {item.amount}</td>
                                                <td style={{ textAlign: 'center', borderBottom: '1px dashed gray' }}>${item.price}</td>
                                            </tr>
                                        )
                                    })
                                :
                                <></>
                            }
                            <tr>
                                <td>Total</td>
                                <td style={{ textAlign: 'center' }}>${totalValue}</td>
                            </tr>
                        </tbody>
                    </table>
                    <button>Confirm Order</button>
                </section>

            </section>
        </>
    );
}