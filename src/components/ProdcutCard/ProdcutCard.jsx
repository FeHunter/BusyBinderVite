import { useNavigate } from "react-router-dom";
import { ButtonToBuy } from "../Buttons/Buttons";
import { ImagesContent } from "../ImagesContent/ImagesContent";
import style from "./ProdcutCard.module.css";
import { localStorageRoutes } from "../../assets/localStorageRoutes";
import PagesRoutes from "../../assets/PagesRoutes";

export function ProdcutCard ({item}){

    const navigate = useNavigate();

    // local cart
    const AddToCart = async () => {
        // localStorage.removeItem(localStorageRoutes.myCart)
        // Load the cart from localStorage
        const loadCart = localStorage.getItem(localStorageRoutes.myCart) 
            ? JSON.parse(localStorage.getItem(localStorageRoutes.myCart)) 
            : [];
    
        // Check if the product is already in the cart
        const productIndex = loadCart.findIndex(cartItem => (cartItem.id+cartItem.name) === (item.id+item.name));
    
        let updatedCart;
    
        if (productIndex !== -1) {
            // Product is already in the cart, increment the amount by the selected amount
            updatedCart = loadCart.map((item, index) => 
                index === productIndex 
                    ? { ...item, amount: parseInt(item.amount) + 1 } 
                    : item
            );
        } else {
            // Product is not in the cart, add it with the selected amount
            const newProduct = { ...item, amount: 1 };
            updatedCart = [...loadCart, newProduct];
        }
    
        // Update the state and save to localStorage
        localStorage.setItem(localStorageRoutes.myCart, JSON.stringify(updatedCart));
        navigate(PagesRoutes.Cart);
    };

    const goToDetails = () => {
        navigate(`/ProductPage/${item.id}`)
        window.scroll(0, 0)
        // reload only on the product page
        if (window.location.pathname.includes("/ProductPage/")) {
            location.reload();
        }
    }

    return (
        <div className={style.prodcutCard}>
            <ImagesContent src={item.img} alt={`${item.name}_image`} size={'100%'} onClick={goToDetails} />
            <div className={style.prodcutInfos}>
                <p>{item.type}</p>
                <p className={style.productName} onClick={goToDetails}>{item.name}</p>
                <p>${item.price}</p>
            </div>
            <ButtonToBuy label={"Buy"} onClick={AddToCart} />
        </div>
    );
}