import { useEffect, useState } from "react";
import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import style from "./AdmPage.module.css";
import { localStorageRoutes } from "../../assets/localStorageRoutes";
import { AddItemForm } from "../../components/Forms/AddItemForm/AddItemForm";
import { SocialMediaForm } from "../../components/Forms/SocialMediaForm/SocialMediaForm";
import { AboutMeForm } from "../../components/Forms/AboutMeForm/AboutMeForm";
import { firebaseRoutes } from "../../assets/Firebase";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export function AdmPage() {
    const [visible, setVisible] = useState(0);

    const addNewProduct = (product) => {
        const products = localStorage.getItem(localStorageRoutes.localProducts)
            ? JSON.parse(localStorage.getItem(localStorageRoutes.localProducts))
            : [];
        products.push(product);
        localStorage.setItem(localStorageRoutes.localProducts, JSON.stringify(products));
    };

    const updateSocialLinks = async (values) => {
        try {
            // Obtendo o usuário autenticado
            const user = firebase.auth().currentUser;
    
            if (!user) {
                throw new Error('User is not authenticated');
            }
    
            // Obtendo o token de ID do usuário
            const idToken = await user.getIdToken();
    
            // Enviando a requisição com o token de ID
            const response = await fetch(firebaseRoutes.facebookLink, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${idToken}` // Inclua o token no cabeçalho
                },
                body: JSON.stringify({ facebook: values.facebook })
            });
    
            if (!response.ok) {
                throw new Error(`Error to update: ${response.statusText}`);
            }
    
            const data = await response.json();
            console.log('Server answer:', data);
        } catch (error) {
            console.log('Error:', error.message);
        }
    };

    return (
        <>
            <Header />
            <section className={style.admPage}>
                <div className={style.buttonArea}>
                    <button onClick={() => setVisible(0)}>Add new Product</button>
                    <button onClick={() => setVisible(1)}>Social Links</button>
                    <button onClick={() => setVisible(2)}>About me</button>
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
                            <SocialMediaForm readValues={updateSocialLinks} />
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
