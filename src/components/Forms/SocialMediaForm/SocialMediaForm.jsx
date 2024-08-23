/*
Use Yup to validate typed link
*/

import { Formik, Form, Field, ErrorMessage } from 'formik'
import style from './SocialMediaForm.module.css'
import { ButtonToConfirm } from '../../Buttons/Buttons'

export function SocialMediaForm (){
    return (
        <Formik>
            <Form className={style.formContent}>
                <div className={style.itemForm}>
                    <label htmlFor="instagram">Instagram</label>
                    <Field className={style.fieldInput} id="instagram" name="instagram" placeholder="https://" />
                    <ErrorMessage name="instagram" component="p" />
                </div>
                <div className={style.itemForm}>
                    <label htmlFor="facebook">Facebook</label>
                    <Field className={style.fieldInput} id="facebook" name="facebook" placeholder="https://" />
                    <ErrorMessage name="facebook" component="p" />
                </div>
                <div className={style.itemForm}>
                    <label htmlFor="tiktok">TikTok</label>
                    <Field className={style.fieldInput} id="tiktok" name="tiktok" placeholder="https://" />
                    <ErrorMessage name="tiktok" component="p" />
                </div>
                <div className={style.itemForm}>
                    <ButtonToConfirm type="submit" icon="Uptade" />
                </div>
            </Form>
        </Formik>
    )
}