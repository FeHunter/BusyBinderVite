import { Formik, Form, Field, ErrorMessage } from "formik"
import { ButtonToConfirm, ButtonWebLink } from "../components/Buttons/Buttons"
import { Footer } from "../components/Footer/Footer"
import { Header } from "../components/Header/Header"
import style from "./ContactsPage.module.css"
import * as yup from 'yup'

export function ContactsPage () {

    const validationSchema = yup.object({
        name: yup.string().required().min(3),
        phone: yup.string().required(),
        msg: yup.string(),
    })

    return (
        <>
            <Header/>
            <section className={style.contactsPage}>
                <div className={style.content}>
                    <p className={style.pageTitle}>Contacts</p>
                    <ButtonWebLink icon={<i class="fa-solid fa-envelope"></i>} label={"busybinder@gmail.com"} />
                    <ButtonWebLink icon={<i class="fa-solid fa-phone"></i>} label={"+ 00 (00) 100-10-10"} />
                    <ButtonWebLink icon={<i class="fa-solid fa-phone"></i>} label={"+ 00 (00) 100-10-10"} />
                    <p>Opening hours 08:00 to 18:00</p>
                    <div className={style.socialNetworkLinks}>
                        <ButtonWebLink label={<i class="fa-brands fa-instagram"></i>} />
                        <ButtonWebLink label={<i class="fa-brands fa-facebook"></i>} />
                        <ButtonWebLink label={<i class="fa-brands fa-tiktok"></i>} />
                    </div>
                </div>
                <div className={style.content}>
                    <Formik
                        initialValues={{ name: '', phone: '', msg: '' }}
                        validationSchema={validationSchema}
                    >
                        <Form className={style.formContact}>
                            <p className={style.pageTitle}>Send me a message</p>
                            <div className={style.inputField}>
                                <label htmlFor="name">Name*</label>
                                <Field id="name" name="name" className={style.input} />
                                <ErrorMessage name="name" component="p" className={style.erroForm} />
                            </div>
                            <div className={style.inputField}>
                                <label htmlFor="phone">Phone*</label>
                                <Field id="phone" name="phone" className={style.input} />
                                <ErrorMessage name="phone" component="p" className={style.erroForm} />
                            </div>
                            <div className={style.inputField}>
                                <label htmlFor="msg">Mensage*</label>
                                <Field id="msg" name="msg" as="textArea" className={style.input} />
                                <ErrorMessage name="msg" component="p" className={style.erroForm} />
                            </div>
                            <div className={style.inputField}>
                                <ButtonToConfirm type="submit" icon="Send" />
                            </div>
                        </Form>
                    </Formik>
                </div>
            </section>
            <Footer/>
        </>
    )
}

/*
Email
Telefones
Horario de funcionamento
Links redes sociais

Campo para perguntas
Nome*
Número de telefone*
Mensagem*
Enviar
*/