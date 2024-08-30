import { Formik, ErrorMessage, Field, Form } from "formik"
import style from "./HomePageForm.module.css"
import * as yup from 'yup'
import { ButtonToConfirm } from "../../Buttons/Buttons"

export function HomePageForm ({initialValues, getValues}){

    const validation = yup.object({
        briefPresentation: yup.string().max(50).required(),
        briefAboutMe: yup.string().max(70).required(),
    })

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validation}
            onSubmit={(values)=>{
                getValues(values)
            }}
        >
            <Form className={style.formContent}>
                <section style={{width: '100%'}} onClick={()=>{setIsValid(false)}}>
                    <section className={style.formSections}>
                        <p className={style.formSectionsLabel}>Brief</p>
                        <div className={style.itemForm}>
                            <label htmlFor="briefPresentation">Brief presentation *</label>
                            <Field id="briefPresentation" type="text" name="briefPresentation" placeholder="type..." className={style.fieldInput} />
                            <ErrorMessage name="briefPresentation" component="p" className={style.errorMessage}/>
                        </div>
                        <div className={style.itemForm}>
                            <label htmlFor="presentationImages">Presentation Images (1 or 3 images) *</label>
                            <input id="presentationImages" type="file" multiple="multiple" max="3" min="1" className={style.fieldInput}  />
                            <ErrorMessage name="presentationImages" component="p" className={style.errorMessage}/>
                        </div>
                    </section>
                    <section className={style.formSections}>
                        <p className={style.formSectionsLabel}>Brief About me</p>
                        <div className={style.itemForm}>
                            <label htmlFor="briefAboutMe">About me *</label>
                            <Field id="briefAboutMe" type="text" name="briefAboutMe" placeholder="type..." as="textarea" className={style.fieldInput} />
                            <ErrorMessage name="briefAboutMe" component="p" className={style.errorMessage}/>
                        </div>
                        <div className={style.itemForm}>
                            <label htmlFor="aboutMeCoverImage">Cover Image *</label>
                            <input id="aboutMeCoverImage" type="file" max="1"className={style.fieldInput}  />
                        </div>
                        <div className={style.itemForm}>
                            <label htmlFor="workImagesSlider">My work images slider *</label>
                            <input id="workImagesSlider" multiple="multiple" type="file" className={style.fieldInput}  />
                        </div>
                        <div className={style.itemForm}>
                            <ButtonToConfirm type="submit" icon="Update" />
                        </div>
                    </section>
                </section>
            </Form>
        </Formik>
    )
}