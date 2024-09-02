import style from "./GetInTouchForm.module.css"
import { ErrorMessage, Field, Form, Formik } from "formik";
import { ButtonToConfirm } from "../../Buttons/Buttons";
import * as yup from 'yup'

export function GetInTouchForm () {

    const validationSchema = yup.object({
        name: yup.string().required().min(3),
        phone: yup.number().required(),
        msg: yup.string(),
    })

    const handleSubmit = (values, { resetForm }) => {
        // Construa a URL mailto
        const subject = encodeURIComponent("New message from contact form");
        const body = encodeURIComponent(`Name: ${values.name}\nPhone: ${values.phone}\nMessage: ${values.msg}`);
        const mailtoURL = `mailto:felipehunter001@gmail.com?subject=${subject}&body=${body}`;

        // Redirecione para a URL mailto
        window.location.href = mailtoURL;

        // Redefine o formulário após o envio
        resetForm();
    }

    return (
        <Formik
            initialValues={{ name: '', phone: '', msg: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
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
                    <label htmlFor="msg">Message*</label>
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
