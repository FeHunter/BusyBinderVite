import { Header } from "../components/Header/Header";
import style from "./RegisterProduct.module.css";

export function RegisterProduct (){
    return (
        <>
            <Header />
            <section className={style.content}>
                <p>Follow the steps to register a new product</p>
                <div className={style.formContent}>
                    <div className={style.formItem}>
                        <label htmlFor="Name">Name</label>
                        <input id="Name" type="text" placeholder="Product name..." className={style.formInput} />
                    </div>
                    <div className={style.formItem}>
                        <label htmlFor="Price">Price</label>
                        <input id="Price" type="number" placeholder="Product price..." className={style.formInput} />
                    </div>
                    <div className={style.formItem}>
                        <label htmlFor="Type">Type</label>
                        <select id="id" className={style.formInput}>
                            <option value="Album">Album</option>
                            <option value="Sticker">Sticker</option>
                            <option value="Album">Book</option>
                        </select>
                    </div>
                    <div className={style.formItem}>
                        <label htmlFor="Image">Image</label>
                        <input id="Image" type="file" className={style.formInput} />
                    </div>
                    <div className={style.formItem}>
                        <input id="Send" type="button" value={"Register Product"} style={{width: '50%'}} />
                    </div>
                </div>
            </section>
        </>
    );
}