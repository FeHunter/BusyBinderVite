import { AddItemForm } from "../components/Forms/AddItemForm/AddItemForm";
import { Header } from "../components/Header/Header";
import style from "./RegisterProduct.module.css";

export function RegisterProduct (){
    return (
        <>
            <Header />
            <section className={style.content}>
                <p>Follow the steps to register a new product</p>
                <AddItemForm />
            </section>
        </>
    );
}