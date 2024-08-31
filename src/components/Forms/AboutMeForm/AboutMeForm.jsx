import { Form, Formik,Field, ErrorMessage} from "formik"
import style from "./AboutMeForm.module.css"
import { ButtonToConfirm } from "../../Buttons/Buttons"
import * as yup from "yup"
import { toast } from "react-toastify";
import { useState } from "react";
import { storageUploaddRoutes, uploadToStorage } from "../../../assets/FBStorage/FirebaseStorageLoad";

export function AboutMeForm ({initialValues, readValues}){

    const [aboutMeImage, setAboutImage] = useState(null);

    async function uploadImage() {
        if (aboutMeImage) {
            console.log(storageUploaddRoutes.pagesImages)
            await uploadToStorage(aboutMeImage, "AboutMePageImage", storageUploaddRoutes.pagesImages);
            toast("About me image was successfully uploaded")
        }
    }

    const validationForm = yup.object({
        description: yup.string().required().min(10),
    })

    return (
        <Formik
        initialValues={initialValues ? initialValues : { description: '',  photosGallery: [] }}
            validationSchema={validationForm}
            onSubmit={(values)=>{
                uploadImage()
                readValues(values)
            }}
        >
            <Form className={style.formContent}>
                <div className={style.itemForm}>
                    <label htmlFor="description">Description</label>
                    <Field className={style.textAreaField} id="description" name="description" as="textarea" style={{ whiteSpace: 'pre-wrap' }} />
                    <ErrorMessage name="description" component="p" className={style.errorMessage} />
                </div>
                <div className={style.itemForm}>
                    <label htmlFor="aboutMeImage">Image Cover *</label>
                    <input
                        name="aboutMeImage" type="file" className={style.fieldInput}
                        onChange={(event) => {
                            // Acessar o arquivo selecionado
                            const file = event.target.files[0];
                            if (file) {
                                setAboutImage(file);
                            }
                        }}
                    />
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