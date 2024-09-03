import { useEffect, useState } from 'react';
import style from './EditProductPage.module.css'
import { loadProducts } from '../../assets/Firebase';
import { AddItemForm } from '../../components/Forms/AddItemForm/AddItemForm';

export function EditProductPage (){

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

    useEffect(()=>{
        // console.log(albumToEdit)
    },[albumToEdit])

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
                                        <td><button onClick={()=>{setAlbumToEdit(loadedList[index])}}><i class="fa-solid fa-pen-to-square"></i></button></td>
                                        <td><button onClick={()=>{setAlbumToEdit(loadedList[index])}}><i class="fa-solid fa-trash"></i></button></td>
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
                                <div style={{display: 'flex', width: '80%', marginBottom: '3%', borderBottom: '2px dashed #62412E', color: '#62412E'}}>
                                    <p >Album: <b>{albumToEdit.name}</b></p>
                                </div>
                                <AddItemForm />
                            </>
                        :
                            <p>Select a album to edit</p>
                    }
                </div>
            </div>
        </section>
    )
}

