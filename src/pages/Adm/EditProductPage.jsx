import { useEffect, useState } from 'react';
import style from './EditProductPage.module.css'
import { firebaseRoutes, loadProducts } from '../../assets/Firebase';
import { AddItemForm } from '../../components/Forms/AddItemForm/AddItemForm';
import { Loading } from '../../assets/Loading';
import { toast } from 'react-toastify';

export function EditProductPage (){

    const [loadingProduct, setLoadingProcut] = useState(false)
    const [loadedList, setLoadedList] = useState([]);
    const [albumToEdit, setAlbumToEdit] = useState(null)

    useEffect(() => {
        getProducts()
    }, []);

    // Load Products
    const getProducts = async () => {
        try {
            const products = await loadProducts()
            setLoadedList(products)
        }catch (error){
            console.log(error)
        }
    }

    const changeAlbumToEdit = (index) => {
        setLoadingProcut(true)
        setTimeout(() => {
            setAlbumToEdit(loadedList[index])
            setLoadingProcut(false)
        }, 500);
    }

    const updateItem = async (values) => {
        // Find index to change album
        const indexToUpdate = loadedList.findIndex(item => item.id === albumToEdit.id)
        
        // change item on the list
        let listToUpdate = [...loadedList]
        listToUpdate[indexToUpdate] = {...values}
        console.log(listToUpdate)

        // Update on serve
        await fetch(firebaseRoutes.products, {
            method: 'put',
            body: JSON.stringify(listToUpdate)
        })
        .then(res => {
            if (res.ok){
                toast(`${albumToEdit.name} was updated with success!`)
            }
        })
        .catch(error => console.log(error))
    }

    return (
        <section className={style.editProductPage}>
            <div>
                <p>My Albuns</p>
                {/* CHOOSE ALBUM TO EDIT */}
                <table className={style.myAlbunsContent}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loadedList && loadedList.length > 0 ?
                                loadedList.map((album, index) => {
                                    return <tr key={`${index}_album_to_edit`}>
                                        <td>{album.name}</td>
                                        <td>{album.price}</td>
                                        <td><button onClick={()=>{changeAlbumToEdit(index)}}><i class="fa-solid fa-pen-to-square"></i></button></td>
                                        <td><button onClick={()=>{}}><i class="fa-solid fa-trash"></i></button></td>
                                    </tr>
                                })
                                :
                                <></>
                        }
                    </tbody>
                </table>
                <div className={style.editContent}>
                    {
                        albumToEdit ?
                            <>
                                {loadingProduct ?
                                    <Loading/>
                                :
                                    <>
                                        <div style={{display: 'flex', width: '80%', marginBottom: '3%', borderBottom: '2px dashed #62412E', color: '#62412E'}}>
                                            <p >Album: <b>{albumToEdit.name}</b></p>
                                        </div>
                                        <AddItemForm initialValues={albumToEdit} addNewProduct={updateItem} />
                                    </>
                                }
                            </>
                        :
                            <p>Select a album to edit</p>
                    }
                </div>
            </div>
        </section>
    )
}

