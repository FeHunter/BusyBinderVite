import { Formik, ErrorMessage, Field, Form } from "formik";
import style from "./HomePageForm.module.css";
import * as yup from 'yup';
import { ButtonToConfirm } from "../../Buttons/Buttons";
import { useState } from "react";
import { deleteAllFilesInFolder, storageLoadRoutes, storageUploaddRoutes, uploadToStorage } from "../../../assets/FBStorage/FirebaseStorageLoad";
import { toast } from "react-toastify";

export function HomePageForm({ initialValues, getValues }) {

    const [presentationImage1, setPresentationImage1] = useState(null);
    const [presentationImage2, setPresentationImage2] = useState(null);
    const [presentationImage3, setPresentationImage3] = useState(null);
    const [aboutWorkImageCover, setAboutWorkImageCover] = useState(null);
    const [sliderImages, setSliderImages] = useState([]);

    async function uploadImage() {
        if (presentationImage1) {
            await uploadToStorage(presentationImage1, "HomePageImg1", storageUploaddRoutes.pagesImages);
            toast("Presentation Image-1 successfully uploaded")
        }
        if (presentationImage2) {
            await uploadToStorage(presentationImage2, "HomePageImg2", storageUploaddRoutes.pagesImages);
            toast("Presentation Image-2 successfully uploaded")
        }
        if (presentationImage3) {
            await uploadToStorage(presentationImage3, "HomePageImg3", storageUploaddRoutes.pagesImages);
            toast("Presentation Image-3 successfully uploaded")
        }
        if (aboutWorkImageCover) {
            await uploadToStorage(aboutWorkImageCover, "MyWorkCoverImage", storageUploaddRoutes.pagesImages);
            toast("My Work Cover Image successfully uploaded")
        }
    }

    async function uploadSliderImages() {
        if (sliderImages.length > 0) {
            try {
                deleteAllFilesInFolder(storageLoadRoutes.sliderHomePage)
                // Save all images
                await Promise.all(
                    sliderImages.map((img, index) =>
                        uploadToStorage(img, `HomePageSliderImage${index}`, storageLoadRoutes.sliderHomePage)
                    )
                );
                toast("Slider images successfully uploaded");
            } catch (error) {
                toast("Error on uploading slider images");
                console.log("Error to upload SliderImages: " + error);
            }
        }
    }

    const validation = yup.object({
        briefPresentation: yup.string().max(50).required(),
        briefAboutMe: yup.string().max(300).required(),
    });

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validation}
            onSubmit={async (values) => {
                await uploadImage()
                await uploadSliderImages()
                getValues(values)
            }}
        >
            <Form className={style.formContent}>
                <section style={{ width: '100%' }}>
                    {/* PRESENTATION */}
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
                    {/* MY WORK */}
                    <section className={style.formSections}>
                        <p className={style.formSectionsLabel}>Brief About me</p>
                        <div className={style.itemForm}>
                            <label htmlFor="briefAboutMe">About me *</label>
                            <Field id="briefAboutMe" type="text" name="briefAboutMe" placeholder="type..." as="textarea" className={style.textAreaField} />
                            <ErrorMessage name="briefAboutMe" component="p" className={style.errorMessage} />
                        </div>
                        <div className={style.itemForm}>
                            <label htmlFor="aboutMeCoverImage">Cover Image *</label>
                            <input
                                name="aboutMeCoverImage" type="file" className={style.fieldInput}
                                onChange={(event) => {
                                    // Acessar o arquivo selecionado
                                    const file = event.target.files[0];
                                    if (file) {
                                        setAboutWorkImageCover(file);
                                    }
                                }}
                            />
                        </div>
                        <div className={style.itemForm}>
                            <label htmlFor="workImagesSlider">My work images slider *</label>
                            <input
                                name="workImagesSlider"
                                type="file"
                                multiple
                                className={style.fieldInput}
                                onBlur={(event) => {
                                    const files = event.target.files;
                                    if (files) {
                                        setSliderImages(Array.from(files)); // Converte FileList para Array
                                    }
                                }}
                            />
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
