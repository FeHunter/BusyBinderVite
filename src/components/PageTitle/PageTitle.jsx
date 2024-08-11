import style from './PageTitle.module.css';

export function PageTitle ({title}){
    return <h1 className={style.titlePage}>{title}</h1>
}