import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import style from "./AdressForm.module.css";

export function AdressForm (){

    let schemaValidation = yup.object().shape({
        countryRegion: yup.string().required().min(4, "Invalid"),
        StreetName: yup.string().required().min(5, "Invalid"),
        cityVillage: yup.string().required().min(8, "Invalid"),
        postalCode: yup.string().required().min(8, "Invalid"),
    })

    return (
        <Formik
            initialValues={{ countryRegion: '', StreetName: '', cityVillage: '', postalCode: '' }}
            validateOnChange={schemaValidation}
            onSubmit={(values, {setSubmitting})=>{

            }}
        >
            <Form className={style.formContent}>
                <div className={style.itemForm}>
                    <label htmlFor="countryRegion">Country/Region *</label>
                    <Field id="countryRegion" type="text" name="countryRegion" placeholder="..." className={style.fieldInput} />
                    <ErrorMessage name="countryRegion" component="p" className={style.errorMessage}/>
                </div>
                <div className={style.itemForm}>
                    <label htmlFor="StreetName">Street Name *</label>
                    <Field id="StreetName" type="text" name="StreetName" placeholder="..." className={style.fieldInput} />
                    <ErrorMessage name="StreetName" component="p" className={style.errorMessage}/>
                </div>
                <div className={style.itemForm}>
                    <label htmlFor="cityVillage">City/Village*</label>
                    <Field id="cityVillage" type="text" name="cityVillage" placeholder="..." className={style.fieldInput} />
                    <ErrorMessage name="cityVillage" component="p" className={style.errorMessage}/>
                </div>
                <div className={style.itemForm}>
                    <label htmlFor="postalCode">Postal Code *</label>
                    <Field id="postalCode" type="text" name="postalCode" placeholder="..." className={style.fieldInput} />
                    <ErrorMessage name="postalCode" component="p" className={style.errorMessage}/>
                </div>
            </Form>
        </Formik>
    );
}