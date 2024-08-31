import { Formik, ErrorMessage, Field, Form } from "formik";
import style from "./HomePageForm.module.css";
import * as yup from 'yup';
import { ButtonToConfirm } from "../../Buttons/Buttons";
import { useState } from "react";
import { storageLoadRoutes, storageUploaddRoutes, uploadToStorage } from "../../../assets/FBStorage/FirebaseStorageLoad";
import { toast } from "react-toastify";

export function HomePageForm({ initialValues, getValues }) {

    const [presentationImage1, setPresentationImage1] = useState(null);
    const [presentationImage2, setPresentationImage2] = useState(null);
    const [presentationImage3, setPresentationImage3] = useState(null);

    async function uploadImage() {
        if (presentationImage1) {
            await uploadToStorage(presentationImage1, "HomePageImg1", storageUploaddRoutes.HomePageFolder);
            toast("Presentation Image-1 successfully uploaded");
        }
        if (presentationImage2) {
            await uploadToStorage(presentationImage2, "HomePageImg2", storageUploaddRoutes.HomePageFolder);
            toast("Presentation Image-2 successfully uploaded");
        }
        if (presentationImage3) {
            await uploadToStorage(presentationImage3, "HomePageImg3", storageUploaddRoutes.HomePageFolder);
            toast("Presentation Image-3 successfully uploaded");
        }
    }

    const validation = yup.object({
        briefPresentation: yup.string().max(50).required(),
        briefAboutMe: yup.string().max(70).required(),
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validation}
            onSubmit={(values) => {
                uploadImage();
                getValues(values);
            }}
        >
            <Form className={style.formContent}>
                <section style={{ width: '100%' }}>
                    <section className={style.formSections}>
                        <p className={style.formSectionsLabel}>Brief</p>
                        <div className={style.itemForm}>
                            <label htmlFor="briefPresentation">Brief presentation *</label>
                            <Field className={style.fieldInput} id="briefPresentation" type="text" name="briefPresentation" placeholder="type..." />
                            <ErrorMessage name="briefPresentation" component="p" className={style.errorMessage} />
                        </div>
                        <div className={style.itemForm}>
                            <label >Presentation Images (3 images) *</label>
                            <input
                                name="presentationImage1" type="file" className={style.fieldInput}
                                onChange={(event) => {
                                    // Acessar o arquivo selecionado
                                    const file = event.target.files[0];
                                    if (file) {
                                        setPresentationImage1(file);
                                    }
                                }}
                            />
                            <input
                                name="presentationImage2" type="file" className={style.fieldInput}
                                onChange={(event) => {
                                    // Acessar o arquivo selecionado
                                    const file = event.target.files[0];
                                    if (file) {
                                        setPresentationImage2(file);
                                    }
                                }}
                            />
                            <input
                                name="presentationImage3" type="file" className={style.fieldInput}
                                onChange={(event) => {
                                    // Acessar o arquivo selecionado
                                    const file = event.target.files[0];
                                    if (file) {
                                        setPresentationImage3(file);
                                    }
                                }}
                            />
                            <ErrorMessage name="presentationImages" component="p" className={style.errorMessage} />
                        </div>
                    </section>
                    <section className={style.formSections}>
                        <p className={style.formSectionsLabel}>Brief About me</p>
                        <div className={style.itemForm}>
                            <label htmlFor="briefAboutMe">About me *</label>
                            <Field id="briefAboutMe" type="text" name="briefAboutMe" placeholder="type..." as="textarea" className={style.fieldInput} />
                            <ErrorMessage name="briefAboutMe" component="p" className={style.errorMessage} />
                        </div>
                        <div className={style.itemForm}>
                            <label htmlFor="aboutMeCoverImage">Cover Image *</label>
                            <input id="aboutMeCoverImage" type="file" className={style.fieldInput} />
                        </div>
                        <div className={style.itemForm}>
                            <label htmlFor="workImagesSlider">My work images slider *</label>
                            <input id="workImagesSlider" multiple type="file" className={style.fieldInput} />
                        </div>
                        <div className={style.itemForm}>
                            <ButtonToConfirm type="submit" icon="Update" />
                        </div>
                    </section>
                </section>
            </Form>
        </Formik>
    );
}
