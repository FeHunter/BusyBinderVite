import { Header } from "../components/Header/Header";
import style from "./RegisterProduct.module.css";

export function RegisterProduct (){
    return (
        <>
            <Header />
            <section>
                <div>
                    <label htmlFor="ProductName">Product Name</label>
                    <input name="ProductName" type="text" placeholder="Product name..." />
                </div>
            </section>
        </>
    );
}