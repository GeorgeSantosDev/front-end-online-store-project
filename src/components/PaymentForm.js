import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import StoreContext from '../context/StoreContext';
import '../styles/PaymentForm.css';

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
    <form className="payment-form-container">
      <h2>Informações do comprador</h2>

      <div className="payment-info-container">
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            placeholder="Nome Completo"
            data-testid="checkout-fullname"
            value={ paymentData.name }
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="cpf">
          <input
            type="text"
            id="cpf"
            name="cpf"
            className="form-control"
            placeholder="CPF"
            data-testid="checkout-cpf"
            value={ paymentData.cpf }
            onChange={ handleChange }
          />
        </label>
      </div>

      <div className="payment-info-container">
        <label htmlFor="email">
          <input
            type="text"
            id="email"
            name="email"
            className="form-control"
            placeholder="Email"
            data-testid="checkout-email"
            value={ paymentData.email }
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="phone">
          <input
            type="text"
            id="phone"
            name="phone"
            className="form-control"
            placeholder="Telefone"
            data-testid="checkout-phone"
            value={ paymentData.phone }
            onChange={ handleChange }
          />
        </label>
      </div>

      <div className="payment-info-container">
        <label htmlFor="address" className="user-address">
          <input
            type="text"
            id="address"
            name="address"
            className="form-control"
            placeholder="Endereço"
            data-testid="checkout-address"
            value={ paymentData.address }
            onChange={ handleChange }
          />
        </label>

        <label htmlFor="cep" className="user-cep">
          <input
            type="text"
            id="cep"
            name="cep"
            className="form-control"
            placeholder="CEP"
            data-testid="checkout-cep"
            value={ paymentData.cep }
            onChange={ handleChange }
          />
        </label>
      </div>

      <div className="payment-info-container">
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
      </div>

      <button
        type="button"
        data-testid="checkout-btn"
        disabled={ isDisabled }
        onClick={ handleClick }
        className="btn btn-success finish-shop-btn"
      >
        Finalizar pedido
      </button>
    </form>
  );
}

export default PaymentForm;
