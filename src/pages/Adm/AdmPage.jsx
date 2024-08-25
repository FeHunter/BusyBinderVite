import { useEffect, useState } from "react";
import PagesRoutes from "../../assets/PagesRoutes";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { LinkToPage } from "../../components/Link/LinkToPage";
import style from "./AdmPage.module.css";
import { localStorageRoutes } from "../../assets/localStorageRoutes";
import { AddItemForm } from "../../components/Forms/AddItemForm/AddItemForm";
import { SocialMediaForm } from "../../components/Forms/SocialMediaForm/SocialMediaForm";
import { AboutMeForm } from "../../components/Forms/AboutMeForm/AboutMeForm";
import { firebaseRoutes } from "../../assets/Firebase";

export function AdmPage (){

    // Navigation controller? 0 - Register Item | 1 - Social Media | 2 - About Me
    const [visible, setVisible] = useState(0)

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

    const updateSocialLinks = async (values) => {
        try {
            const response = await fetch(firebaseRoutes.facebookLink, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ facebook: values.facebook })
            });
    
            if (!response.ok) {
                throw new Error(`Error to update: ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log('Serve answer:', data);
        } catch (error) {
            console.log('Erro:', error.message);
        }
    };
    

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
                    <>
                        <p className={style.formTitle}># Social Links</p>
                        <SocialMediaForm readValues={updateSocialLinks} />
                    </>
                    <>
                        <p className={style.formTitle}># About Me</p>
                        <AboutMeForm/>
                    </>
                </div>
            </section>
            <Footer/> 
        </>
    );
}