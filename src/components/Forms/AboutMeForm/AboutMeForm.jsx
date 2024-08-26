import { Form, Formik,Field, ErrorMessage} from "formik"
import style from "./AboutMeForm.module.css"
import { ButtonToConfirm } from "../../Buttons/Buttons"

export function AboutMeForm (){

    return (
        <Formik>
            <Form className={style.formContent}>
                <div className={style.itemForm}>
                    <label htmlFor="aboutMeDescription">Description</label>
                    <Field className={style.fieldInput} id="aboutMeDescription" name="aboutMeDescription" as="textarea" />
                    <ErrorMessage name="aboutMeDescription" component="p" />
                </div>
                <div className={style.itemForm}>
                    <label htmlFor="photosGallery">Photos to gallery</label>
                    <Field className={style.fieldInput} id="photosGallery" name="photosGallery" type="file" multiple="multiple" />
                    <ErrorMessage name="photosGallery" component="p" />
                </div>
                <div className={style.itemForm}>
                    <ButtonToConfirm icon="Update" />
                </div>
            </Form>
        </Formik>
    )
}