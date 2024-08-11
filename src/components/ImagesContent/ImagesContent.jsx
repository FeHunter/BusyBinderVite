import style from "./ImagesContent.module.css";

export function ImagesContent ({src, alt, size}){
    return <img className={style.imageContent} style={{width: size}} src={src} alt={alt} />;
}