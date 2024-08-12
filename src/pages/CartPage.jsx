import style from "./CartPage.module.css";
import { Header } from "../components/Header/Header";
import { CartItem } from "../components/Cart/CartItem/CartItem";

export function CartPage (){
    return (
        <>
            <Header/>
            <section className={style.CartPage}>
                <h2>Cart</h2>
                <div>
                    <CartItem
                        image={"./src/Images/aux_book_1.png"}
                        name={"Album"}
                        price={12}
                        amount={1}
                    />
                </div>
            </section>
        </>
    );
}