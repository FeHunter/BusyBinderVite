import style from "./CartPage.module.css";
import { Header } from "../components/Header/Header";
import { CartItem } from "../components/Cart/CartItem/CartItem";
import { useNavigate } from "react-router-dom";
import PagesRoutes from "../assets/PagesRoutes";

export function CartPage (){

    const navigate = useNavigate();

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

                <p>Payment Informations</p>
                <div>
                    <button>Go to payment</button>
                </div>
            </section>
        </>
    );
}