import style from "./ImagesContent.module.css";

export function ImagesContent ({src, alt, size, onClick}){
    return <img className={style.imageContent} style={{width: size}} src={src} alt={alt} onClick={onClick}/>;
}