import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import StoreContext from '../context/StoreContext';

function PaymentForm() {
  const { setCartItems } = useContext(StoreContext);

  const [paymentData, setPaymentData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    method: '',
  });

  const history = useHistory();

  const handleChange = ({ target: { name, value } }) => {
    setPaymentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = () => {
    setPaymentData({
      name: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
      method: '',
    });
    localStorage.clear();
    setCartItems([]);
    history.push('/');
  };

  const isDisabled = Object.values(paymentData).some((value) => value === '');

  return (
    <form>
      <label htmlFor="name">
        Nome Completo
        <input
          type="text"
          id="name"
          name="name"
          data-testid="checkout-fullname"
          value={ paymentData.name }
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="email">
        Email
        <input
          type="text"
          id="email"
          name="email"
          data-testid="checkout-email"
          value={ paymentData.email }
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="cpf">
        CPF
        <input
          type="text"
          id="cpf"
          name="cpf"
          data-testid="checkout-cpf"
          value={ paymentData.cpf }
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="phone">
        Telefone
        <input
          type="text"
          id="phone"
          name="phone"
          data-testid="checkout-phone"
          value={ paymentData.phone }
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="cep">
        CEP
        <input
          type="text"
          id="cep"
          name="cep"
          data-testid="checkout-cep"
          value={ paymentData.cep }
          onChange={ handleChange }
        />
      </label>

      <label htmlFor="address">
        Endereço
        <input
          type="text"
          id="address"
          name="address"
          data-testid="checkout-address"
          value={ paymentData.address }
          onChange={ handleChange }
        />
      </label>
      <label htmlFor="ticket">
        Boleto
        <input
          type="radio"
          id="ticket"
          data-testid="ticket-payment"
          name="method"
          onChange={ handleChange }
          value="ticket"
          checked={ paymentData.method === 'ticket' }
        />
      </label>

      <label htmlFor="visa">
        Visa
        <input
          type="radio"
          id="visa"
          data-testid="visa-payment"
          name="method"
          onChange={ handleChange }
          value="visa"
          checked={ paymentData.method === 'visa' }
        />
      </label>

      <label htmlFor="master">
        Master
        <input
          type="radio"
          id="master"
          data-testid="master-payment"
          name="method"
          onChange={ handleChange }
          value="master"
          checked={ paymentData.method === 'master' }
        />
      </label>

      <label htmlFor="elo">
        elo
        <input
          type="radio"
          id="elo"
          data-testid="elo-payment"
          name="method"
          onChange={ handleChange }
          value="elo"
          checked={ paymentData.method === 'elo' }
        />
      </label>

      <button
        type="button"
        data-testid="checkout-btn"
        disabled={ isDisabled }
        onClick={ handleClick }
      >
        Finalizar pedido
      </button>
    </form>
  );
}

export default PaymentForm;
