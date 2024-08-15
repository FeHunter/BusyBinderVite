import style from "./CartPage.module.css";
import { Header } from "../components/Header/Header";
import { useNavigate } from "react-router-dom";
import PagesRoutes from "../assets/PagesRoutes";
import { useEffect, useState } from "react";
import { PaymentForm } from "../components/Forms/PaymentForm/PaymentForm";
import { AdressForm } from "../components/Forms/AdressForm/AdressForm";
import { ButtonToConfirm, ButtonToDelete } from "../components/Buttons/Buttons";
import { DeliveryOptionForm } from "../components/Forms/DeliveryOptionForm/DeliveryOptionForm";

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

                {/* My Order - Cart */}
                <section className={style.sectionContentCart}>
                    <p className={style.contentTitle}> <i class="fa-solid fa-cart-shopping"></i> My Order</p>
                    <table className={style.tableCart}>
                        <thead>
                            <th></th>
                            <th></th>
                            <th>Item</th>
                            <th>Price</th>
                            <th title="Amount">Amt</th>
                            <th>Total</th>
                        </thead>
                        <tbody>
                            {
                                items != null ?
                                    items.map((item, index)=>{
                                        return (
                                            <tr>
                                                <td><ButtonToDelete/></td>
                                                <td><img src={item.img}/></td>
                                                <td>{item.name}</td>
                                                <td>${item.price}</td>
                                                <td>{item.amount}</td>
                                                <td>${parseFloat(item.price) * parseFloat(item.amount)}</td>
                                            </tr>
                                        )
                                    })
                                    :
                                    <></>
                            }
                        </tbody>
                    </table>
                </section>

                {/* Payment Form */}
                <section className={style.sectionContentPaymentForm}>
                    <p className={style.contentTitle}> <i class="fa-solid fa-bag-shopping"></i> Payment Informations</p>
                    <PaymentForm />
                </section>

                {/* Adress Form */}
                <section className={style.sectionContentAdressForm}>
                    <p className={style.contentTitle}> <i class="fa-solid fa-truck"></i> Delivery adress</p>
                    <DeliveryOptionForm/>
                    <AdressForm />
                </section>

                {/* Order - Resume */}
                <section className={style.sectionContentOrderResume}>
                    <p className={style.contentTitle}> <i class="fa-solid fa-bag-shopping"></i> Your Order</p>
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
                    <ButtonToConfirm icon={"Confirm Order"} onClick={()=>{}} />
                </section>

            </section>
        </>
    );
}