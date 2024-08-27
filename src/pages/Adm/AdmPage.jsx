import {  useState } from "react";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import style from "./AdmPage.module.css";
import { AddItemForm } from "../../components/Forms/AddItemForm/AddItemForm";
import { SocialMediaForm } from "../../components/Forms/SocialMediaForm/SocialMediaForm";
import { AboutMeForm } from "../../components/Forms/AboutMeForm/AboutMeForm";
import { ButtonAdmHeader } from "../../components/Buttons/Buttons";
import { firebaseRoutes } from "../../assets/Firebase";

export function AdmPage() {
    const [visible, setVisible] = useState(0);

    // const addNewProduct = (product) => {
    //     const products = localStorage.getItem(localStorageRoutes.localProducts)
    //         ? JSON.parse(localStorage.getItem(localStorageRoutes.localProducts))
    //         : [];
    //     products.push(product);
    //     localStorage.setItem(localStorageRoutes.localProducts, JSON.stringify(products));
    // };

    async function addNewProduct (product) {
        try {
            await fetch(firebaseRoutes.products, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify(product)
            })
            .then ((data)=> {
                if (!data.ok){
                    throw new Error(data.status)
                }
                data.json()
                alert("Product was added to the list")
            })
            .then (product => console.log(product))
        }catch (erro){
            console.log(erro)
        }
    }

    return (
        <>
            <Header />
            <section className={style.admPage}>
                <div className={style.buttonArea}>
                    <ButtonAdmHeader onClick={() => setVisible(0)} label={<><i class="fa-solid fa-bag-shopping"></i>Add new Product</>} />
                    <ButtonAdmHeader onClick={() => setVisible(1)} label={<><i class="fa-solid fa-share-nodes"></i>Social Links</>} />
                    <ButtonAdmHeader onClick={() => setVisible(2)} label={<><i class="fa-regular fa-address-card"></i>About me</>} />
                </div>
                <div className={style.formsArea}>
                    {visible === 0 && (
                        <>
                            <p className={style.formTitle}><i class="fa-solid fa-bag-shopping"></i> Register new product</p>
                            <AddItemForm addNewProduct={addNewProduct} />
                        </>
                    )}
                    {visible === 1 && (
                        <>
                            <p className={style.formTitle}><i class="fa-solid fa-share-nodes"></i> Social Links</p>
                            <SocialMediaForm />
                        </>
                    )}
                    {visible === 2 && (
                        <>
                            <p className={style.formTitle}><i class="fa-regular fa-address-card"></i> About Me</p>
                            <AboutMeForm/>
                        </>
                    )}
                </div>
            </section>
            <Footer/> 
        </>
    );
}
