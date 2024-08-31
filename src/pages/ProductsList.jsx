import { useEffect, useState } from "react";
import { Footer } from "../components/Footer/Footer";
import { Header } from "../components/Header/Header";
import style from "./ProductsList.module.css";
import { ProdcutCard } from "../components/ProdcutCard/ProdcutCard";
import { ButtonListChange } from "../components/Buttons/Buttons";
import { loadProducts } from "../assets/Firebase";
import { Loading } from "../assets/Loading";

export function ProductsList() {
    // Local list navigation
    const MAXTOSHOW = 8;
    const [page, setPage] = useState(0);
    const [pageBtn, setPageBtn] = useState([]);
    const [listPosition, setListPosition] = useState(0);

    // Products
    const [loadedList, setLoadedList] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [products, setProducts] = useState([]);

    const [filter, setFilter] = useState("default");

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

    useEffect(() => {
        if (loadedList && loadedList.length > 0) {
            applyFilter(filter);
        }
    }, [loadedList, filter]);

    const applyFilter = (term) => {
        let toFilter = [...loadedList]; // Clone the list of products

        if (term.toLowerCase() === "lastpost") {
            toFilter = toFilter.sort((a, b) => new Date(b.postDate) - new Date(a.postDate));
        } else if (term.toLowerCase() === "highprice") {
            toFilter = toFilter.sort((a, b) => b.price - a.price);
        } else if (term.toLowerCase() === "lowprice") {
            toFilter = toFilter.sort((a, b) => a.price - b.price);
        }

        setFilteredProducts(toFilter);
        updatePagination(toFilter);
    };

    const updatePagination = (productsList) => {
        const totalPages = Math.ceil(productsList.length / MAXTOSHOW);
        setPage(totalPages);
        const btn = Array.from({ length: totalPages }, (_, i) => i + 1);
        setPageBtn(btn);
        setListPosition(0); // Reset to first page
        showProducts(productsList, 0);
    };

    const showProducts = (productsList, position) => {
        const toShow = productsList.slice(position, position + MAXTOSHOW);
        setProducts(toShow);
    };

    const changePageList = (pageNumber) => {
        const newPosition = (pageNumber - 1) * MAXTOSHOW;
        setListPosition(newPosition);
        showProducts(filteredProducts, newPosition);
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <Header />
            <section className={style.productsList}>
                {/* Header - Filter params */}
                <div className={style.headerContent}>
                    <h2>Albums</h2>
                    <select className={style.selectionButton} value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="default">Default</option>
                        <option value="popularity">Popularity</option>
                        <option value="lastpost">Last post</option>
                        <option value="lowprice">Low price</option>
                        <option value="highprice">High price</option>
                    </select>
                </div>
                {/* Product List */}
                <div className={style.listContent}>
                    {
                        products.length > 0 ?
                            products.map((item, index) => (
                                <ProdcutCard
                                    key={`Product_Card_${index}`}
                                    item={item}
                                    addToCartFunc={() => addItemToCart(item)}
                                />
                            ))
                            :
                            <Loading/>
                    }
                </div>
                {/* List Control */}
                <div className={style.listNavegation}>
                    <p>Page {(listPosition / MAXTOSHOW) + 1} of {page}</p>
                    <div className={style.listNavegationButtons}>
                        {
                            pageBtn.length > 0 ?
                                pageBtn.map((btn, index) => (
                                    <ButtonListChange
                                        key={`ButtonPageN_${index}`}
                                        label={btn}
                                        onClick={() => { changePageList(btn) }}
                                    />
                                ))
                                :
                                <></>
                        }
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}
