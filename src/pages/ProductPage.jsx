import style from "./ProductPage.module.css";
import { Header } from "../components/Header/Header";
import { Footer } from "../components/Footer/Footer";
import { ButtonToBuy, FieldNumber } from "../components/Buttons/Buttons";
import { useEffect, useState } from "react";
import { ProdcutCard } from "../components/ProdcutCard/ProdcutCard";
import { useNavigate, useParams } from "react-router-dom";
import PagesRoutes from "../assets/PagesRoutes";
import { localStorageRoutes } from "../assets/localStorageRoutes";
import { loadProducts } from "../assets/Firebase";
import { Loading } from "../assets/Loading";
import { loadAllImagesFromFolder, loadFromStorage, storageLoadRoutes } from "../assets/FBStorage/FirebaseStorageLoad";

/*
To fix:
- Se não tiver images adicionar esconder botões para trocar de imagens
*/

export function ProductPage (){

    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true)

    const [allItems, setAllItems] = useState([])
    const [allProducts, setAllProducts] = useState({})
    const [product, setProduct] = useState({})
    const [productImages, setProductImages] = useState([])
    const [amount, setAmount] = useState(1)

    useEffect(()=>{
        getProducts()
    },[]);

    // Load product cover
    useEffect(()=>{
        if (!product.imgCoverLink || product.imgCoverLink === ''){
            loadProductImage()
        }
    },[loading])

    // load product images
    useEffect(()=>{
        if (product){
            const images = loadAllImagesFromFolder(`${storageLoadRoutes.productsSliderImages}/${product.name}/`)
            setProductImages(images)
        }
    },[product])

    // Load Requested product
    const getProducts = async () => {
        try {
            setLoading(true)
            const products = await loadProducts()
            setAllProducts(products)
            const index = products.findIndex((product) => product.id == id) // GET PRODUCT INDEX
            setProduct(products[index])
            // end load and fix scroll position
            window.scroll({
                behavior: 'smooth',
                 top: 0
            })
        }catch (error){
            console.log(error)
        }finally {
            setLoading(false)
        }
    }

    // Load Similar products - only 4 Items from local JSON
    useEffect(()=>{
        if (allItems.length < 3){
            try {
                const randomStart = Math.floor(Math.random() * (allProducts.length - 4)); 
                let onlyFour = [];
                for (let i= randomStart; i < randomStart + 4; i++){
                    onlyFour.push(allProducts[i]);
                }
                setAllItems(onlyFour);
            }catch (error){
                console.log(error)
            }
        }
    }, [allProducts])

    // Local cart handling
    const AddToCart = async () => {
        // Load the cart from localStorage
        const loadCart = localStorage.getItem(localStorageRoutes.myCart) 
            ? JSON.parse(localStorage.getItem(localStorageRoutes.myCart)) 
            : [];
    
        // Check if the product is already in the cart
        const productIndex = loadCart.findIndex(item => item.id === product.id);
    
        let updatedCart;
    
        if (productIndex !== -1) {
            // Product is already in the cart, increment the amount by the selected amount
            updatedCart = loadCart.map((item, index) => 
                index === productIndex 
                    ? { ...item, amount: parseInt(item.amount) + parseInt(amount) } 
                    : item
            );
        } else {
            // Product is not in the cart, add it with the selected amount
            const newProduct = { ...product, amount: parseInt(amount) };
            updatedCart = [...loadCart, newProduct];
        }
    
        // Update the state and save to localStorage
        localStorage.setItem(localStorageRoutes.myCart, JSON.stringify(updatedCart));
        navigate(PagesRoutes.Cart);
    };

    const [proudctCover, setProductCover] = useState(null)
    async function loadProductImage() {
        const coverUrl = `${storageLoadRoutes.productsImages}${product.name+product.id}.png`
        try {
            setLoading(true)
            const urlImgage = await loadFromStorage(coverUrl);
            setProductCover(urlImgage);
        } catch (error) {
            console.error("Error loading default image:", error);
            return './src/Images/no-image.png'
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Header/>
            <section className={style.productPage}>
                {/* Product Information */}
                <div className={style.headerInformations}>
                    <img
                        className={style.productImage}
                        src={proudctCover ? proudctCover : product.imgCoverLink ? product.imgCoverLink : ""}
                        alt={`${product.name}_image`}
                    />
                    <div className={style.productInformation}>
                        <>
                            <p className={style.productType}>{product.type}</p>
                            <p className={style.productName}>{product.name}</p>
                            <p className={style.productPrice}>${product.price}</p>
                            <p className={style.productDescription}>{product.description}</p>
                        </>
                        <div className={style.productActionsContent}>
                            <FieldNumber
                                type="number" 
                                min="1" 
                                placeholder="amt" 
                                value={amount} 
                                onChange={(e)=>{setAmount(e.target.value)}}
                            />
                            <ButtonToBuy label={"Buy"} onClick={AddToCart} />
                        </div>
                    </div>
                </div>
                {/* Product Images */}
                <div className={style.imagesContent}>
                    <div className={style.allImagesContent}>
                        <img src="../src/Images/aux_book_1.png" alt={`product_image`} width={'20%'} />
                        <img src="../src/Images/aux_book_1.png" alt={`product_image`} width={'20%'} />
                        <img src="../src/Images/aux_book_1.png" alt={`product_image`} width={'20%'} />
                        <img src="../src/Images/aux_book_1.png" alt={`product_image`} width={'20%'} />
                        <img src="../src/Images/aux_book_1.png" alt={`product_image`} width={'20%'} />
                        <img src="../src/Images/aux_book_1.png" alt={`product_image`} width={'20%'} />
                    </div>
                </div>
                {/* Similar Products */}
                <div className={style.similarProductsContent}>
                    <h2>Similar Products</h2>
                    <div className={style.productsContent}>
                        {
                            allItems ?
                                allItems.map((item, index) => {
                                    if (item){
                                        return <ProdcutCard
                                            key={`Product_Card_${index}`}
                                            item={item}
                                        />
                                    }
                                })
                            :
                            <Loading/>
                        }
                    </div>
                </div>
            </section>
            <Footer/>
        </>
    );
}
