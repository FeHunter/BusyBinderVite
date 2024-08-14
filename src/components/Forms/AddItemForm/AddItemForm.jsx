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
                    <Field id="name" type="text" name="name" placeholder="A.." className={style.fieldInput} />
                    <ErrorMessage name="name" component="p" className={style.errorMessage}/>
                </div>
                <div className={style.itemForm}>
                    <label htmlFor="price">Price *</label>
                    <Field id="price" type="number" name="price" placeholder="$" min="1" className={style.fieldInput} />
                    <ErrorMessage name="price" component="p" className={style.errorMessage}/>
                </div>
                <div className={style.itemForm}>
                    <label htmlFor="type">Type *</label>
                    <Field
                        component="select"
                        id="type"
                        name="type"
                        multiple={false}
                    >
                        <option value="Album">Album</option>
                        <option value="Sticker">Sticker</option>
                        <option value="Book">Book</option>
                        <option value="Pen">Pen</option>
                    </Field>
                    <ErrorMessage name="type" component="p" className={style.errorMessage}/>
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