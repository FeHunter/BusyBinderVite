import { Formik, Form, Field, ErrorMessage } from "formik"
import * as yup from "yup"
import style from "./AdmLoginForm.module.css"
import { ButtonToConfirm } from "../../Buttons/Buttons";

export function AdmLoginForm ({getValues}) {

    const validate = yup.object({
        email: yup.string().email('Please enter a valid email').required('Email is required'),
        password: yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required')
    });

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validate}
            onSubmit={(values)=>{
                getValues(values)
            }}
        >
            <Form className={style.formContent}>
                <div className={style.itemForm}>
                    <h2>Adm Login</h2>
                </div>
                <div className={style.itemForm}>
                    <label htmlFor="email">Email</label>
                    <Field id="email" type="email" name="email" className={style.fieldInput} />
                    <ErrorMessage name="email" component="p" className={style.errorMessage}/>
                </div>
                <div className={style.itemForm}>
                    <label htmlFor="password">Password</label>
                    <Field id="password" type="password" name="password" className={style.fieldInput} />
                    <ErrorMessage name="password" component="p" className={style.errorMessage}/>
                </div>
                <div className={style.itemForm}>
                    <ButtonToConfirm type="submit" icon={"Login"} />
                </div>
            </Form>
        </Formik>
    )
}