import { Footer } from "../../components/Footer/Footer"
import { AddItemForm } from "../../components/Forms/AddItemForm/AddItemForm"
import { Header } from "../../components/Header/Header"
import style from "./RegisterProductPage.module.css"

export function RegisterProductPage (){

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
            <Header/>
            <section className={style.registerPage}>
                    <p className={style.contentTitle}>Register a new product</p>
                    <AddItemForm addNewProduct={addNewProduct} />
            </section>
            <Footer/>
        </>
    )
}