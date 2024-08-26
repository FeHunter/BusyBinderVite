import { Form, Formik,Field, ErrorMessage} from "formik"
import style from "./AboutMeForm.module.css"
import { ButtonToConfirm } from "../../Buttons/Buttons"
import * as yup from "yup"

export function AboutMeForm ({readValues}){

    const validationForm = yup.object({
        description: yup.string().required().min(10),
    })

    return (
        <Formik
        initialValues={{ description: '', photosGallery: [] }}
            validationSchema={validationForm}
            onSubmit={(values)=>{
                readValues(values)
            }}
        >
            <Form className={style.formContent}>
                <div className={style.itemForm}>
                    <label htmlFor="description">Description</label>
                    <Field className={style.fieldInput} id="description" name="description" as="textarea" />
                    <ErrorMessage name="description" component="p" className={style.errorMessage} />
                </div>
                <div className={style.itemForm}>
                    <label htmlFor="photosGallery">Photos to gallery</label>
                    <Field className={style.fieldInput} id="photosGallery" name="photosGallery" type="file" multiple="multiple" />
                    <ErrorMessage name="photosGallery" component="p" />
                </div>
                <div className={style.itemForm}>
                    <ButtonToConfirm type="submit" icon="Update" />
                </div>
            </Form>
        </Formik>
    )
}