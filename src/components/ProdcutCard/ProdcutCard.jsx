import { useNavigate } from "react-router-dom";
import { ButtonToBuy } from "../Buttons/Buttons";
import { ImagesContent } from "../ImagesContent/ImagesContent";
import style from "./ProdcutCard.module.css";

export function ProdcutCard ({item, img, addToCartFunc}){

    const navigate = useNavigate();

    const AddToCart = () => {
        addToCartFunc(item);
    }

    const goToDetails = () => {
        navigate(`/ProductPage/${item.id}`)
    }

    return (
        <div className={style.prodcutCard}>
            <ImagesContent src={img == null ? item.img : img} alt={`${item.name}_image`} size={'100%'} onClick={goToDetails} />
            <div className={style.prodcutInfos}>
                <p>{item.type} - {item.id}</p>
                <p className={style.productName} onClick={goToDetails}>{item.name}</p>
                <p>${item.price}</p>
            </div>
            <ButtonToBuy label={"Buy"} onClick={()=>{AddToCart()}} />
        </div>
    );
}