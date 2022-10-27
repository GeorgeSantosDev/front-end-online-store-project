import React, { useState, useEffect, useContext } from 'react';
import { getLocalStorage } from '../services/storage';
import StoreContext from '../context/StoreContext';
import '../styles/Total.css';

function Total() {
  const [totalToPay, setTotalToPay] = useState(0);
  const { cartItems, warningQuatityChange } = useContext(StoreContext);

  const calculateTotal = () => {
    const products = getLocalStorage('productsAtCart');
    const quantity = getLocalStorage('quantity');

    if (products && quantity) {
      const total = products.reduce((acc, product) => {
        const qtd = quantity.find((item) => item.id === product.id);
        const multiplier = qtd ? qtd.quantity : 1;

        return acc + (product.price * multiplier);
      }, 0);

      setTotalToPay(total);
    } else if (products) {
      const total = products.reduce((acc, product) => acc + product.price, 0);

      setTotalToPay(total);
    }
  };

  useEffect(() => {
    calculateTotal();
  }, [cartItems, warningQuatityChange]);

  return (
    <span className="total">{`Total a pagar: ${totalToPay.toFixed(2)}`}</span>
  );
}

export default Total;
