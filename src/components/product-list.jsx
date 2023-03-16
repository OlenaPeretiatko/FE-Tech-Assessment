import React, { useState } from 'react';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import StarRating from './star-rating';
import OrderBar from './order-bar';
import './product-list.css';

const ProductList = ({ items = { products: [] } }) => {
  const { products } = items;
  const [isOrderBarOpen, setIsOrderBarOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const toggleModal = (order) => {
    if (order) {
      const existingOrderIndex = cartItems.findIndex(o => o.id === order.id);
      if (existingOrderIndex !== -1) {
        const updatedCartItems = [...cartItems];
        updatedCartItems[existingOrderIndex] =
          { ...cartItems[existingOrderIndex], count: cartItems[existingOrderIndex].count + 1 };
        setCartItems(updatedCartItems);
      } else {
        setCartItems([...cartItems, { ...order, count: 1 }]);
      }
    }
    setIsOrderBarOpen(prevState => !prevState);
  };

  const removeOrder = (id) => {
    const existingOrderIndex = cartItems.findIndex(o => o.id === id);
    if (existingOrderIndex !== -1) {
      const updatedCartItems = [...cartItems];
      if (cartItems[existingOrderIndex].count > 1) {
        updatedCartItems[existingOrderIndex] =
          { ...cartItems[existingOrderIndex], count: cartItems[existingOrderIndex].count - 1 };
      } else {
        updatedCartItems.splice(existingOrderIndex, 1)
      }
      setCartItems(updatedCartItems);
    }
  };

  const handleClose = () => {
    toggleModal(null);
  };

  if (products?.length) {
    return (
      <div className="grid sm:grid-cols-3 gap-4 m-3">
        <div className="col-start-1">
          <div className="background-img-container"
            style={{ backgroundImage: `url(${products[0].imageURLs[2]})` }}>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:col-start-2 sm:col-end-4">
          {products?.map((el, i) => (
            <div key={"product" + i} className="border border-gray-200 product-container">
              <div className="flex justify-center product-img-container">
                <img src={el.imageURLs[0]} alt="product-img" />
              </div>
              <div className="p-2 text-lg font-semibold">
                <div className="">{el.fulhausProductName}</div>
                <StarRating />
                <div className="flex justify-between items-center">
                  <div>${el.retailPrice}</div>
                  <button
                    onClick={() => toggleModal(
                      { id: el._id, name: el.fulhausProductName, price: el.retailPrice, img: el.imageURLs[0], count: 1 }
                    )}
                    className="rounded-3xl bg-gray-200 hover:bg-gray-300 p-2"
                  >
                    <MdOutlineAddShoppingCart className="text-pink" size={20} />
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
        <OrderBar isOpen={isOrderBarOpen} onRequestClose={handleClose} orders={cartItems} onRemoveOrder={removeOrder} />
      </div>
    );
  }
};

export default ProductList;

