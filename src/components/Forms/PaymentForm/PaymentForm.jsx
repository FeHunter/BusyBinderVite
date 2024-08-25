import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import style from "./PaymentForm.module.css";
import { ButtonFormValidation } from "../../Buttons/Buttons";
import { useState } from "react";

export function PaymentForm (){

    const [isValid, setIsValid] = useState(false)

    let schemaValidation = yup.object().shape({
        name: yup.string().required().min(4, "Name too small"),
        surname: yup.string().required().min(5, "Surname too small"),
        phone: yup.string().required().matches(/^\d{10}$/, "Invalid phone number"),
        email: yup.string().required().min(8, "Invalid email"),
    });
    

    return (
        <Formik
            initialValues={{ name: '', surname: '', phone: '', email: '', note: '' }}
            validationSchema={schemaValidation}
            onSubmit={(values, {setSubmitting})=>{
                setIsValid(true)
            }}
        >
            <Form className={style.formContent}>
                <div style={{width: '100%'}} onClick={()=>{setIsValid(false)}}>
                    <div className={style.itemForm}>
                        <label htmlFor="name">Name *</label>
                        <Field id="name" type="text" name="name" placeholder="enter your name" className={style.fieldInput} />
                        <ErrorMessage name="name" component="p" className={style.errorMessage}/>
                    </div>
                    <div className={style.itemForm}>
                        <label htmlFor="surname">Surname *</label>
                        <Field id="surname" type="text" name="surname" placeholder="enter your surname" className={style.fieldInput} />
                        <ErrorMessage name="surname" component="p" className={style.errorMessage}/>
                    </div>
                    <div className={style.itemForm}>
                        <label htmlFor="phone">Phone number *</label>
                        <Field id="phone" type="text" name="phone" placeholder="enter your phone" className={style.fieldInput} />
                        <ErrorMessage name="phone" component="p" className={style.errorMessage}/>
                    </div>
                    <div className={style.itemForm}>
                        <label htmlFor="email">Email *</label>
                        <Field id="email" type="text" name="email" placeholder="enter your email" className={style.fieldInput} />
                        <ErrorMessage name="email" component="p" className={style.errorMessage}/>
                    </div>
                    <div className={style.itemForm}>
                        <label htmlFor="note">Adicional Note</label>
                        <Field id="note" type="text" name="note" placeholder="..." className={style.fieldInput} />
                        <ErrorMessage name="note" component="p" className={style.errorMessage}/>
                    </div>
                </div>
                
                <ButtonFormValidation isValid={isValid} />
            </Form>
        </Formik>
    );
}