import style from "./GetInTouchForm.module.css"
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ButtonToConfirm } from "../../Buttons/Buttons";
import * as yup from 'yup'

export function GetInTouchForm ({getValues}){

    const validationSchema = yup.object({
        name: yup.string().required().min(3),
        phone: yup.string().required(),
        msg: yup.string(),
    })

    return (
        <Formik
            initialValues={{ name: '', phone: '', msg: '' }}
            validationSchema={validationSchema}
            onSubmit={(values)=>{
                getValues(values)
            }}
        >
            <Form className={style.formContent}>
                <p className={style.pageTitle}>Send me a message</p>
                <div className={style.itemForm}>
                    <label htmlFor="name">Name*</label>
                    <Field id="name" name="name" className={style.fieldInput} />
                    <ErrorMessage name="name" component="p" className={style.errorMessage} />
                </div>
                <div className={style.itemForm}>
                    <label htmlFor="phone">Phone*</label>
                    <Field id="phone" name="phone" className={style.fieldInput} />
                    <ErrorMessage name="phone" component="p" className={style.errorMessage} />
                </div>
                <div className={style.itemForm}>
                    <label htmlFor="msg">Mensage*</label>
                    <Field id="msg" name="msg" className={style.fieldInput} />
                    <ErrorMessage name="msg" component="p" className={style.errorMessage} />
                </div>
                <div className={style.itemForm}>
                    <ButtonToConfirm type="submit" icon="Send" />
                </div>
            </Form>
        </Formik>
    )
}