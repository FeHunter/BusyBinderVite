import { ButtonToBuy } from "../Buttons/Buttons";
import { ImagesContent } from "../ImagesContent/ImagesContent";
import style from "./ProdcutCard.module.css";

export function ProdcutCard ({name, price, imageSrc}){
    return (
        <div className={style.prodcutCard}>
            <ImagesContent src={imageSrc} alt={""} size={'100%'} />
            <div className={style.prodcutInfos}>
                <p>{name}</p>
                <p>${price}</p>
            </div>
            <ButtonToBuy label={"Buy"} onclick={()=>{}} />
        </div>
    );
}