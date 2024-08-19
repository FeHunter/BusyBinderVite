import { localStorageRoutes } from "../../assets/localStorageRoutes";
import { ButtonAdmHeader } from "../../components/Buttons/Buttons";
import { Footer } from "../../components/Footer/Footer";
import { AddItemForm } from "../../components/Forms/AddItemForm/AddItemForm";
import { Header } from "../../components/Header/Header";
import style from "./AdmPage.module.css";

export function AdmPage (){

    const addNewProduct = (product) => {
        // load current itens
        const products = localStorage.getItem(localStorageRoutes.localProducts)
        ? JSON.parse(localStorage.getItem(localStorageRoutes.localProducts))
        : [{}]

        console.log(products)

        // add new product to the list
        products.push(product)
        localStorage.setItem(localStorageRoutes.localProducts, JSON.stringify(products))
    }

    return (
        <>
            <Header />
            <div className={style.buttonsNavigation}>
                <ButtonAdmHeader label={"Add Product"} />
                <ButtonAdmHeader label={"Social Networks"} />
            </div>
            <section className={style.admPage}>
                <div className={style.content}>
                    <p className={style.contentTitle}>Register a new product</p>
                    <AddItemForm addNewProduct={addNewProduct} />
                </div>
                <div className={style.content}>
                    <p className={style.contentTitle}>Social Networks</p>
                </div>
            </section>
            <Footer/>
        </>
    );
}