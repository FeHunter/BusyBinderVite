import { Formik, Form, Field, ErrorMessage } from 'formik'
import style from './SocialMediaForm.module.css'
import { ButtonToConfirm } from '../../Buttons/Buttons'
import * as yup from 'yup'

export function SocialMediaForm ({initialValues, getValues}){

    const validateForm = yup.object({
        instagram: yup.string()
            .url('Por favor, insira um link válido para o Instagram')
            .matches(
                /^(https?:\/\/)?(www\.)?instagram\.com\/[a-zA-Z0-9(_)?]+\/?$/,
                'Por favor, insira um link válido para o Instagram'
            ),
        facebook: yup.string()
            .url('Por favor, insira um link válido para o Facebook')
            .matches(
                /^(https?:\/\/)?(www\.)?facebook\.com\/[a-zA-Z0-9(\.\_)?]+\/?$/,
                'Por favor, insira um link válido para o Facebook'
            ),
        tiktok: yup.string()
            .url('Por favor, insira um link válido para o TikTok')
            .matches(
                /^(https?:\/\/)?(www\.)?tiktok\.com\/@[a-zA-Z0-9(\.\_)?]+\/?$/,
                'Por favor, insira um link válido para o TikTok'
            ),
    });

    return (
        <Formik
            initialValues={initialValues ? initialValues : {instagram: '', facebook: '', tiktok: '' }}
            validationSchema={validateForm}
            onSubmit={(values)=>{
                getValues(values)
            }}
        >
            <Form className={style.formContent}>
                <p>Corrigir onChange pra salvar alterações</p>
                <div className={style.itemForm}>
                    <label htmlFor="instagram">Instagram</label>
                    <Field className={style.fieldInput} id="instagram" name="instagram" placeholder="https://www.instagram.com/" />
                    <ErrorMessage name="instagram" component="p" className={style.errorMessage} />
                </div>
                <div className={style.itemForm}>
                    <label htmlFor="facebook">Facebook</label>
                    <Field className={style.fieldInput} id="facebook" name="facebook" placeholder="https://www.facebook.com/" />
                    <ErrorMessage name="facebook" component="p" className={style.errorMessage} />
                </div>
                <div className={style.itemForm}>
                    <label htmlFor="tiktok">TikTok</label>
                    <Field className={style.fieldInput} id="tiktok" name="tiktok" placeholder="https://www.tiktok.com/@" />
                    <ErrorMessage name="tiktok" component="p" className={style.errorMessage} />
                </div>
                <div className={style.itemForm}>
                    <ButtonToConfirm type="submit" icon="Uptade" />
                </div>
            </Form>
        </Formik>
    )
}