import { useNavigate } from "react-router-dom";
import { ButtonToBuy } from "../Buttons/Buttons";
import { ImagesContent } from "../ImagesContent/ImagesContent";
import style from "./ProdcutCard.module.css";

export function ProdcutCard ({item, addToCartFunc}){

    const navigate = useNavigate();

    const AddToCart = () => {
        addToCartFunc(item);
    }

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
            <ButtonToBuy label={"Buy"} onClick={()=>{AddToCart()}} />
        </div>
    );
}