import style from "./AddItemForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { ButtonToConfirm } from "../../Buttons/Buttons";

export function AddItemForm (){

    let schemaValidation = yup.object().shape({
        productName: yup.string().required().min(4, "Invalid"),
        StreetName: yup.string().required().min(5, "Invalid"),
        cityVillage: yup.string().required().min(8, "Invalid"),
        postalCode: yup.string().required().min(8, "Invalid"),
    })

    return (
        <Formik
            initialValues={{}}
            validateOnChange={schemaValidation}
            onSubmit={()=>{}}
        >
            <Form className={style.formContent}>
                <div className={style.itemForm}>
                    <label htmlFor="name">Name *</label>
                    <Field id="name" type="text" name="name" placeholder="Album busyB..." className={style.fieldInput} />
                    <ErrorMessage name="name" component="p" className={style.errorMessage}/>
                </div>
                <div className={style.itemForm}>
                    <label htmlFor="description">Description *</label> 
                    <Field id="description" type="text" as="textarea" rows="5" name="description" placeholder="About the product..." className={style.fieldInput} />
                    <ErrorMessage name="description" component="p" className={style.errorMessage}/>
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: "flex-end",
                        width: '100%',
                    }}
                >
                    <div className={style.itemForm}>
                        <label htmlFor="price">Price *</label>
                        <Field id="price" type="number" name="price" placeholder="$" min="1" className={style.fieldInput} />
                        <ErrorMessage name="price" component="p" className={style.errorMessage}/>
                    </div>
                    <div className={style.itemForm} style={{width: '80%', marginLeft: '10%'}}>
                        <label htmlFor="type">Type | "try to keep the same pattern. Ex: album, book, stickers..."</label>
                        <Field id="type" type="text" name="type" placeholder="category of the product..." className={style.fieldInput} />
                        <ErrorMessage name="type" component="p" className={style.errorMessage}/>
                    </div>
                </div>
                <div className={style.itemForm}>
                    <label htmlFor="price">Image File *</label>
                    <input id="Image" type="file" className={style.formInput} />
                </div>
                <br/>
                <ButtonToConfirm icon={"Register Item"} onClick={()=>{}} />
            </Form>
        </Formik>
    );
}