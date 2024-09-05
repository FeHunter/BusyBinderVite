import style from "./AddItemForm.module.css";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as yup from "yup";
import { ButtonToConfirm } from "../../Buttons/Buttons";
import { useEffect, useState } from "react";
import { deleteAllFilesInFolder, storageLoadRoutes, storageUploaddRoutes, uploadToStorage } from "../../../assets/FBStorage/FirebaseStorageLoad";
import { toast } from "react-toastify";

export function AddItemForm ({addNewProduct, initialValues}){

    const product = {
        id: "",
        imgCoverFile : "",
        imgCoverLink : "",
        images: [],
        name : "",
        type : "",
        price : "",
        amount : "",
        postDate: "",
        description: "",
    }

    const [uploadType, setUploadType] = useState(true)
    const [productCover, setProductCover] = useState(null)
    const [productImages, setProductImages] = useState(null)

    let schemaValidation = !uploadType ?
            yup.object().shape({
                name: yup.string().required().min(4, "Invalid"),
                description: yup.string().required().min(5, "Invalid"),
                price: yup.number().required(),
                type: yup.string().required().min(2, "Invalid"),
            })
        :
        yup.object().shape({
            name: yup.string().required().min(4, "Invalid"),
            description: yup.string().required().min(5, "Invalid"),
            price: yup.number().required(),
            type: yup.string().required().min(2, "Invalid"),
            imgCoverLink: yup.string().required(),
        })

    const addProduct = (values) => {
        addNewProduct(values)
    }

    async function uploadProductCover (name) {
        uploadToStorage(productCover, name, storageUploaddRoutes.productsImages)
        .finally(()=>{
            toast("product cover was successfully uploaded")
        })
    }
    async function uploadProductImages (productName){
        console.log(productImages)
        if (productImages.length > 0) {
            try {
                deleteAllFilesInFolder(`${storageLoadRoutes.productsSliderImages}/${productName}`)
                // Save all images
                await Promise.all(
                    productImages.map((img, index) =>
                        uploadToStorage(img, `${img.name}_${index}`, `${storageLoadRoutes.productsSliderImages}/${productName}`)
                    )
                );
                toast("products images successfully uploaded");
            } catch (error) {
                toast("Error on uploading products images");
                console.log("Error to upload products images: " + error);
            }
        }
    }

    return (
        <Formik
            initialValues={initialValues ? initialValues : {...product}}
            validationSchema={schemaValidation}
            onSubmit={(values)=>{
                values.amount = 1 // Default amount value
                values.id = `${new Date().getDay().toString()}_${new Date().getSeconds()}_${values.name}`;
                values.postDate = new Date()
                if (productCover){
                    uploadProductCover(`${values.name}${values.id}`)
                }
                uploadProductImages(values.name)
                addProduct(values);
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
                    <Field id="description" type="text" as="textarea" rows="5" name="description" placeholder="About the product..." className={style.textAreaField} />
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
                                <label htmlFor="imgCoverLink">Image Link *</label>
                                <Field id="imgCoverLink" type="text" name="imgCoverLink" placeholder="https://......" className={style.fieldInput} />
                                <ErrorMessage name="imgCoverLink" component="p" className={style.errorMessage}/>
                            </div>
                        </>
                        :
                        <>
                            <div className={style.itemForm}>
                                <label htmlFor="imgCoverFile">Image File *</label>
                                <input
                                    name="imgCoverFile" type="file" className={style.fieldInput}
                                    onChange={(event) => {
                                        // Acessar o arquivo selecionado
                                        const file = event.target.files[0];
                                        if (file) {
                                            setProductCover(file);
                                        }
                                    }}
                                />
                                <ErrorMessage name="imgCoverFile" component="p" className={style.errorMessage}/>
                            </div>
                        </>
                    }
                    
                </div>
                <div className={style.itemForm} >
                        <label htmlFor="images">Products Images</label>
                        <input
                            name="images" type="file" className={style.fieldInput} multiple="multiple"
                            onChange={(event)=>{
                                setProductImages(Array.from(event.target.files))
                            }}
                        />
                    </div>
                <br/>
                <ButtonToConfirm type="submit" icon={"Register Item"} onClick={()=>{}} />
            </Form>
        </Formik>
    );
}