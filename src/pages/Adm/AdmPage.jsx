import { useEffect, useState } from "react";
import PagesRoutes from "../../assets/PagesRoutes";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { LinkToPage } from "../../components/Link/LinkToPage";
import style from "./AdmPage.module.css";
import { localStorageRoutes } from "../../assets/localStorageRoutes";
import { AddItemForm } from "../../components/Forms/AddItemForm/AddItemForm";

export function AdmPage (){

    // const [products, setProducts] = useState({})

    // useEffect(()=>{
    //     loadLocalProducts()
    // }, [])

    // useEffect(()=>{
    //     console.log(products)
    // }, [products])

    // const loadLocalProducts = () => {
    //     const loadedProducts = localStorage.getItem(localStorageRoutes.localProducts)
    //     ? localStorage.getItem(localStorageRoutes.localProducts)
    //     : []
    //     setProducts(JSON.parse(loadedProducts))
    // }

    // Register Form
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
            <section className={style.admPage}>
                <div className={style.buttonArea}>
                    <LinkToPage to={PagesRoutes.RegisterProduct}><p>Add new Product</p></LinkToPage>
                    <LinkToPage to={PagesRoutes.RegisterProduct}><p>Social Links</p></LinkToPage>
                    <LinkToPage to={PagesRoutes.RegisterProduct}><p>About me</p></LinkToPage>
                </div>
                <div className={style.formsArea}>
                    <>
                        <p className={style.formTitle}># Register new product</p>
                        <AddItemForm addNewProduct={addNewProduct} />
                    </>
                </div>
            </section>
            <Footer/> 
        </>
    );
}