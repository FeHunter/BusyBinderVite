import { ButtonToBuy } from "../Buttons/Buttons";
import { ImagesContent } from "../ImagesContent/ImagesContent";
import style from "./ProdcutCard.module.css";

export function ProdcutCard ({item, addToCartFunc}){

    const AddToCart = () => {
        addToCartFunc(item);
    }

    return (
        <div className={style.prodcutCard}>
            <ImagesContent src={item.img} alt={`${item.name}_image`} size={'100%'} />
            <div className={style.prodcutInfos}>
                <p>{item.type}</p>
                <p>{item.name}</p>
                <p>${item.price}</p>
            </div>
            <ButtonToBuy label={"Buy"} onclick={()=>{AddToCart()}} />
        </div>
    );
}