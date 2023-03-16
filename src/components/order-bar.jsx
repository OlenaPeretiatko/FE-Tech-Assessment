import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { AiOutlineMinus } from 'react-icons/ai'
import './order-bar.css';

Modal.setAppElement('#root');

const OrderBar = ({ isOpen, onRequestClose, orders, onRemoveOrder }) => {
    const allOrders = orders || [];
    const sumTotal = allOrders.reduce((sum, { price, count }) => sum + price * count, 0);

    return (
        <Modal
            isOpen={isOpen}
            contentLabel="My dialog"
            className="modal-panel"
            overlayClassName="overlay-panel"
        >
            <div className="flex flex-col justify-between h-full px-6 py-7">
                <div className="text-4xl font-bold my-5">My Order</div>
                <div className="overflow-auto">
                    {allOrders.length ? allOrders.map((order) => (
                        <div key={order.id} className="flex mb-5 items-center">
                            <img src={order.img} alt="order-img" className="order-img" />
                            <div className="flex flex-col ml-5 w-full text-xl">
                                <p className="font-semibold mb-4">{order.name}</p>
                                <div className="flex justify-between">
                                    <div className="text-grey">${order.price}</div>
                                    <div className="flex items-center">
                                        <div>{order.count}x</div>
                                        <button className="ml-2 rounded-3xl bg-gray-200 hover:bg-gray-300 p-2"
                                            type="button" onClick={() => onRemoveOrder(order.id)}>
                                            <AiOutlineMinus />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) :
                        <div className='text-center text-2xl font-semibold'>
                            Your basket is empty
                        </div>}
                </div>
                <div>
                    <div className="flex justify-between my-6 text-4xl">
                        <p>Total</p>
                        <div>${sumTotal}</div>
                    </div>
                    <button
                        type="button"
                        className="text-xl black-btn p-5 text-center w-full font-sans"
                        onClick={onRequestClose}
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </Modal>
    );
};

OrderBar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    orders: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            img: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            count: PropTypes.number.isRequired,
        }),
    ),
    onRemoveOrder: PropTypes.func.isRequired,
};

OrderBar.defaultProps = {
    orders: [],
};

export default OrderBar;
