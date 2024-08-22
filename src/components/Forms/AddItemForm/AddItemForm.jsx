import style from "./AddItemForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { ButtonToConfirm } from "../../Buttons/Buttons";
import { useState } from "react";

export function AddItemForm ({addNewProduct}){

    const product = {
        id: "",
        imgCoverFile : "",
        imgCoverLink : "",
        images: "",
        name : "",
        type : "",
        price : "",
        amount : "",
        postDate: "",
        description: "",
    }

    const [uploadType, setUploadType] = useState(true);

    let schemaValidation = !uploadType ?
            yup.object().shape({
                name: yup.string().required().min(4, "Invalid"),
                description: yup.string().required().min(5, "Invalid"),
                price: yup.number().required(),
                type: yup.string().required().min(2, "Invalid"),
                imgFile: yup.string().required(),
            })
        :
        yup.object().shape({
            name: yup.string().required().min(4, "Invalid"),
            description: yup.string().required().min(5, "Invalid"),
            price: yup.number().required(),
            type: yup.string().required().min(2, "Invalid"),
            imgLink: yup.string().required(),
        })

    const addProduct = (values) => {
        addNewProduct(values)
    }

    return (
        <Formik
            initialValues={{...product}}
            validationSchema={schemaValidation}
            onSubmit={(valeus)=>{
                valeus.amount = 1 // Default amount value
                valeus.id = `${new Date().getDay().toString()}_${new Date().getSeconds()}_${valeus.name}`;
                valeus.postDate = new Date()
                addProduct(valeus);
            }}
        >
            <Form className={style.formContent}>
                <div className={style.itemForm}>
                    <label htmlFor="name">Name *</label>
                    <Field id="name" type="text" name="name" placeholder="Album busyB..." className={style.fieldInput} />
                    <ErrorMessage name="name" component="p" className={style.errorMessage}/>
                </div>
                <div className={style.itemForm}>
                    <label htmlFor="description">Description *</label> 
                    <Field id="description" type="text" as="textarea" rows="5" name="description" placeholder="About the product..." className={style.fieldInput} />
                    <ErrorMessage name="description" component="p" className={style.errorMessage}/>
                </div>
                <div className={style.towItemForm}>
                    <div className={style.itemForm}>
                        <label htmlFor="price">Price *</label>
                        <Field id="price" type="number" min="1" name="price" placeholder="$" className={style.fieldInput} />
                        <ErrorMessage name="price" component="p" className={style.errorMessage}/>
                    </div>
                    <div className={style.itemForm}>
                        <label htmlFor="type">Type | "try to keep the same pattern. Ex: album, book, stickers..."</label>
                        <Field id="type" type="text" name="type" placeholder="category of the product..." className={style.fieldInput} />
                        <ErrorMessage name="type" component="p" className={style.errorMessage}/>
                    </div>
                </div>
                <div className={style.towItemForm}>
                    <p>Product Cover Image</p>
                    {/* Select upload type */}
                    <div style={{ display: 'flex', width: '50%', justifyContent: 'space-between' }}>
                        <div style={{display: 'flex', width: '30%', justifyContent: 'space-between'}}>
                            <label htmlFor="UploadImageCheckbox">Upload</label>
                            <input type="checkbox" id="UploadImageCheckbox" checked={!uploadType} onChange={(e)=>{setUploadType(!uploadType)}} />
                        </div>
                        <div style={{display: 'flex', width: '20%', justifyContent: 'space-between'}}>
                            <label htmlFor="UrlImageCheckbox">Url</label>
                            <input type="checkbox" id="UrlImageCheckbox" checked={uploadType} onChange={(e)=>{setUploadType(!uploadType)}} />
                        </div>
                    </div>
                    {
                        uploadType ?
                        <>
                            <div className={style.itemForm}>
                                <label htmlFor="imgLink">Image Link *</label>
                                <Field id="imgLink" type="text" name="imgLink" placeholder="https://......" className={style.fieldInput} />
                                <ErrorMessage name="imgLink" component="p" className={style.errorMessage}/>
                            </div>
                        </>
                        :
                        <>
                            <div className={style.itemForm}>
                                <label htmlFor="imgFile">Image File *</label>
                                <Field id="imgFile" type="file" name="imgFile" className={style.fieldInput} />
                                <ErrorMessage name="imgFile" component="p" className={style.errorMessage}/>
                            </div>
                        </>
                    }
                    
                </div>
                <div className={style.itemForm}>
                        <label htmlFor="images">Products Images</label>
                        <Field id="images" type="file" multiple="multiple" name="images" placeholder="category of the product..." className={style.fieldInput} />
                    </div>
                <br/>
                <ButtonToConfirm type="submit" icon={"Register Item"} onClick={()=>{}} />
            </Form>
        </Formik>
    );
}