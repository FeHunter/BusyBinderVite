import { ErrorMessage, Field, Form, Formik } from "formik";
import style from './ContactsForm.module.css'
import * as yup from 'yup'
import { ButtonToConfirm } from "../../Buttons/Buttons";

export function ContactsForm ({initialValues, readValues}){

    const validation = yup.object({
        email: yup.string().required(),
        phone1: yup.number(),
        phone2: yup.number(),
    })

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validation}
            onSubmit={(values)=>{
                readValues(values)
            }}
        >
            <Form className={style.formContent}>
                <div className={style.itemForm}>
                    <label htmlFor="email">E-mail</label>
                    <Field className={style.fieldInput} id="email" name="email" placeholder="email" />
                    <ErrorMessage name="email" component="p" className={style.errorMessage} />
                </div>
                <div className={style.itemForm}>
                    <label htmlFor="phone1">Phone 1</label>
                    <Field className={style.fieldInput} id="phone1" name="phone1" placeholder="phone number (1)" />
                    <ErrorMessage name="phone1" component="p" className={style.errorMessage} />
                </div>
                <div className={style.itemForm}>
                    <label htmlFor="phone2">Phone 2</label>
                    <Field className={style.fieldInput} id="phone2" name="phone2" placeholder="phone number (2)" />
                    <ErrorMessage name="phone2" component="p" className={style.errorMessage} />
                </div>
                <div className={style.itemForm}>
                    <ButtonToConfirm type="submit" icon="Update" />
                </div>
            </Form>
        </Formik>
    )
}