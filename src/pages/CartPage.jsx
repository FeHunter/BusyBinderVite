import style from "./CartPage.module.css";
import { Header } from "../components/Header/Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { PaymentForm } from "../components/Forms/PaymentForm/PaymentForm";
import { AdressForm } from "../components/Forms/AdressForm/AdressForm";
import { ButtonToConfirm, ButtonToDelete } from "../components/Buttons/Buttons";
import { DeliveryOptionForm } from "../components/Forms/DeliveryOptionForm/DeliveryOptionForm";
import { Footer } from "../components/Footer/Footer";
import { localStorageRoutes } from "../assets/localStorageRoutes";
import { loadFromStorage, storageLoadRoutes } from "../assets/FBStorage/FirebaseStorageLoad";

export function CartPage() {
  const navigate = useNavigate(); // site navigation
  const [items, setItems] = useState([]);
  const [totalValue, setTotalValue] = useState(0);
  const [isDelivery, setIsDelivery] = useState(true);
  const [imageLinks, setImageLinks] = useState({}); // Estado para armazenar links de imagens
  const DELIVERYFEE = 25;

  // Forms verify
  const [paymentForm, setPaymentForm] = useState(false);
  const [adressForm, setAdressForm] = useState(false);

  useEffect(() => {
    loadCartItems();
  }, []);

  useEffect(() => {
    getTotalValue();
  }, [items, isDelivery]);

  useEffect(() => {
    // Carregar imagens dos produtos quando os itens mudarem
    items.forEach((item) => {
      if (!item.imgCoverLink || item.imgCoverLink === '') {
        loadProductImage(item);
      }
    });
  }, [items]);

  const loadCartItems = () => {
    const loadedItems = JSON.parse(localStorage.getItem(localStorageRoutes.myCart));
    setItems(loadedItems || []);
  };

  async function loadProductImage(item) {
    const coverUrl = `${storageLoadRoutes.productsImages}${item.name + item.id}.png`;
    try {
      const url = await loadFromStorage(coverUrl);
      setImageLinks((prevLinks) => ({ ...prevLinks, [item.id]: url })); // Salva a URL da imagem
    } catch (error) {
      setImageLinks((prevLinks) => ({ ...prevLinks, [item.id]: './src/Images/no-image.png' })); // Imagem padrão
    }
  }

  const getTotalValue = () => {
    let count = 0;
    if (items != null) {
      for (let i = 0; i < items.length; i++) {
        count += parseFloat(items[i].price * items[i].amount);
      }
    }
    if (isDelivery) {
      setTotalValue(count + DELIVERYFEE);
    } else {
      setTotalValue(count);
    }
  };

  const changeAmount = (itemToChange, newAmount) => {
    if (newAmount >= 1) {
      const index = items.findIndex((item) => item.id + item.name === itemToChange.id + itemToChange.name);
      let update = [...items];
      update[index].amount = parseInt(newAmount);
      localStorage.setItem(localStorageRoutes.myCart, JSON.stringify(update));
      setItems(update);
    } else {
      alert("Invalid input, amount cannot be less then 1."); // Change to toastContainer notify
    }
  };

  const removeFromCart = (itemToRemove) => {
    const index = items.findIndex((item) => item.id + item.name === itemToRemove.id + itemToRemove.name);
    let updateItems = [...items];
    updateItems.splice(index, 1);
    setItems(updateItems);
    localStorage.setItem(localStorageRoutes.myCart, JSON.stringify(updateItems));
  };

  return (
    <>
      <Header />
      <section className={style.CartPage}>
        {/* My Order - Cart */}
        <section className={style.sectionContentCart}>
          <p className={style.contentTitle}>
            {" "}
            <i className="fa-solid fa-cart-shopping"></i> My Order
          </p>
          <table className={style.tableCart}>
            <thead>
              <tr>
                <th>Remove</th>
                <th></th>
                <th style={{textAlign: 'left'}}>Item</th>
                <th>Price</th>
                <th title="Amount">Amt</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {items && items.length > 0 ? (
                items.map((item, index) => {
                  const imgSrc = imageLinks[item.id] || item.imgCoverLink || './src/Images/no-image.png';
                  return (
                    <tr key={`tr_item_${index}`} className={style.tableRow}>
                      <td>
                        <ButtonToDelete onClick={() => removeFromCart(item)} />
                      </td>
                      <td>
                        <img src={imgSrc} alt={`${index}_${item.name}_image`} title={`${item.name}`} />
                      </td>
                      <td>{item.name}</td>
                      <td>${item.price}</td>
                      <td>
                        <input
                          style={{ width: '50%', textAlign: 'center' }}
                          type="number"
                          min="1"
                          value={item.amount}
                          onChange={(e) => changeAmount(item, e.target.value)}
                        />
                      </td>
                      <td>${parseFloat(item.price) * parseFloat(item.amount)}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6">Empty cart</td>
                </tr>
              )}
            </tbody>
          </table>
        </section>

        {/* Payment Form */}
        <section className={style.sectionContentPaymentForm}>
          <p className={style.contentTitle}>
            {" "}
            <i className="fa-solid fa-bag-shopping"></i> Payment Informations
          </p>
          <PaymentForm />
        </section>

        {/* Adress Form */}
        <section className={style.sectionContentAdressForm}>
          <p className={style.contentTitle}>
            {" "}
            <i className="fa-solid fa-truck"></i> Delivery adress
          </p>
          <DeliveryOptionForm getOption={(value) => setIsDelivery(value)} />
          {isDelivery ? (
            <AdressForm />
          ) : (
            <div className={style.pickUpContent}>
              <div>
                <p style={{ fontWeight: 'bold' }}>Adress:</p>
                <p style={{ color: 'gray' }}>North end, Winnipeg - Birchwood, St. James, Winnipeg</p>
              </div>
              <br />
              <p>
                Contact me for pick up details, <a href="mailto:">e-mail</a>.
              </p>
            </div>
          )}
        </section>

        {/* Order - Resume */}
        <section className={style.sectionContentOrderResume}>
          <p className={style.contentTitle}>
            {" "}
            <i className="fa-solid fa-bag-shopping"></i> Your Order
          </p>
          <table className={style.OrderResumeTable}>
            <thead style={{ textAlign: "left" }}>
              <tr>
                <th>Product</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items && items.length > 0 ? (
                items.map((item, index) => (
                  <tr key={`table_row_${index}`}>
                    <td style={{ borderBottom: "1px dashed gray" }}>
                      {item.name} x {item.amount}
                    </td>
                    <td style={{ textAlign: "center", borderBottom: "1px dashed gray" }}>
                      ${item.price * item.amount}
                    </td>
                  </tr>
                ))
              ) : (
                <></>
              )}
              {isDelivery ? (
                <tr>
                  <td style={{ borderBottom: "1px dashed gray" }}>Delivery Fee</td>
                  <td style={{ textAlign: "center", borderBottom: "1px dashed gray" }}>
                    ${DELIVERYFEE}
                  </td>
                </tr>
              ) : (
                <></>
              )}
              <tr>
                <td>Total</td>
                <td style={{ textAlign: "center" }}>${totalValue}</td>
              </tr>
            </tbody>
          </table>
          <ButtonToConfirm icon={"Confirm Order"} />
        </section>
      </section>
      <Footer />
    </>
  );
}
