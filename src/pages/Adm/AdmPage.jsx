import { useEffect, useState } from "react";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import style from "./AdmPage.module.css";
import { localStorageRoutes } from "../../assets/localStorageRoutes";
import { AddItemForm } from "../../components/Forms/AddItemForm/AddItemForm";
import { SocialMediaForm } from "../../components/Forms/SocialMediaForm/SocialMediaForm";
import { AboutMeForm } from "../../components/Forms/AboutMeForm/AboutMeForm";
import { ButtonAdmHeader } from "../../components/Buttons/Buttons";

export function AdmPage() {
    const [visible, setVisible] = useState(0);

    const addNewProduct = (product) => {
        const products = localStorage.getItem(localStorageRoutes.localProducts)
            ? JSON.parse(localStorage.getItem(localStorageRoutes.localProducts))
            : [];
        products.push(product);
        localStorage.setItem(localStorageRoutes.localProducts, JSON.stringify(products));
    };

    return (
        <>
            <Header />
            <section className={style.admPage}>
                <div className={style.buttonArea}>
                    <ButtonAdmHeader onClick={() => setVisible(0)} label="Add new Product" />
                    <ButtonAdmHeader onClick={() => setVisible(1)} label="Social Links" />
                    <ButtonAdmHeader onClick={() => setVisible(2)} label="About me" />
                </div>
                <div className={style.formsArea}>
                    {visible === 0 && (
                        <>
                            <p className={style.formTitle}># Register new product</p>
                            <AddItemForm addNewProduct={addNewProduct} />
                        </>
                    )}
                    {visible === 1 && (
                        <>
                            <p className={style.formTitle}># Social Links</p>
                            <SocialMediaForm />
                        </>
                    )}
                    {visible === 2 && (
                        <>
                            <p className={style.formTitle}># About Me</p>
                            <AboutMeForm/>
                        </>
                    )}
                </div>
            </section>
            <Footer/> 
        </>
    );
}
