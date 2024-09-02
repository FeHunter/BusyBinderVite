import { Form, Formik, Field, ErrorMessage } from "formik";
import style from "./AboutMeForm.module.css";
import { ButtonToConfirm } from "../../Buttons/Buttons";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useState } from "react";
import { storageLoadRoutes, storageUploaddRoutes, uploadToStorage } from "../../../assets/FBStorage/FirebaseStorageLoad";

export function AboutMeForm({ initialValues, readValues }) {
    const [aboutMeImage, setAboutImage] = useState(null);
    const [sliderImages, setSliderImages] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    async function uploadImage() {
        if (aboutMeImage) {
            try {
                await uploadToStorage(aboutMeImage, "AboutMePageImage", storageUploaddRoutes.pagesImages);
                toast("About me image was successfully uploaded");
            } catch (error) {
                toast("Error uploading about me image");
                console.log("Error to upload AboutMeImage: " + error);
            }
        }
    }

    async function uploadSliderImages() {
        if (sliderImages.length > 0) {
            try {
                await Promise.all(
                    sliderImages.map((img, index) =>
                        uploadToStorage(img, `AboutMeSliderImage${index}`, storageLoadRoutes.sliderAboutMe)
                    )
                );
                toast("Slider images successfully uploaded");
            } catch (error) {
                toast("Error on uploading slider images");
                console.log("Error to upload SliderImages: " + error);
            }
        }
    }

    const handleSubmit = async (values) => {
        if (isUploading) return; // Impede múltiplos envios

        setIsUploading(true); // Define como carregando para impedir múltiplos envios

        await uploadImage();
        await uploadSliderImages();
        readValues(values);

        setIsUploading(false); // Redefine o estado para permitir novos envios
    };

    const validationForm = yup.object({
        description: yup.string().required().min(10),
    });

    return (
        <Formik
            initialValues={initialValues ? initialValues : { description: '', photosGallery: [] }}
            validationSchema={validationForm}
            onSubmit={handleSubmit}
        >
            <Form className={style.formContent}>
                <div className={style.itemForm}>
                    <label htmlFor="description">Description</label>
                    <Field
                        className={style.textAreaField}
                        id="description"
                        name="description"
                        as="textarea"
                        style={{ whiteSpace: 'pre-wrap' }}
                    />
                    <ErrorMessage name="description" component="p" className={style.errorMessage} />
                </div>
                <div className={style.itemForm}>
                    <label htmlFor="aboutMeImage">Image Cover *</label>
                    <input
                        name="aboutMeImage"
                        type="file"
                        className={style.fieldInput}
                        onChange={(event) => {
                            const file = event.target.files[0];
                            if (file) {
                                setAboutImage(file);
                            }
                        }}
                    />
                </div>
                <div className={style.itemForm}>
                    <label htmlFor="photosGallery">Photos to gallery</label>
                    <input
                        name="photosGallery"
                        type="file"
                        multiple
                        className={style.fieldInput}
                        onChange={(event) => {
                            const files = event.target.files;
                            if (files) {
                                setSliderImages(Array.from(files)); // Converte FileList para Array
                            }
                        }}
                    />
                    <ErrorMessage name="photosGallery" component="p" />
                </div>
                <div className={style.itemForm}>
                    <ButtonToConfirm type="submit" icon="Update" disabled={isUploading} /> {/* Desativa o botão durante o upload */}
                </div>
            </Form>
        </Formik>
    );
}
