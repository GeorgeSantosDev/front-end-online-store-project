import React from 'react';
import { Redirect } from 'react-router-dom';

const TEL_VALID = 11;
const CEP_VALID = 8;

class Checkout extends React.Component {
  state = {
    products: undefined,
    name: '',
    cpf: '',
    email: '',
    phone: '',
    cep: '',
    address: '',
    payment: '',
    redirect: false,
    fieldInvalid: false,
  }

  componentDidMount = () => {
    this.setState({
      products: JSON.parse(localStorage.getItem('productCard')),
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  verifyField = () => {
    const { name, cpf, email, phone, cep, address, payment } = this.state;
    if (
      ((email.includes('@'))
    && (email.includes('.com'))
    && name.length !== 0
    && name !== ''
    && cpf.length === TEL_VALID
    && phone.length === TEL_VALID
    && cep.length === CEP_VALID
    && address.length !== 0
    && payment.length !== 0)) {
      this.setState({ fieldInvalid: false });
      return false;
    }
    this.setState({ fieldInvalid: true });
    return true;
  }

  clearCart = (event) => {
    event.preventDefault();
    if (this.verifyField()) return;
    this.setState({ fieldInvalid: false }, () => {
      localStorage.removeItem('productCard');
      this.redirectHome();
    });
  }

  redirectHome = () => {
    this.setState({ redirect: true });
  }

  render() {
    const { products, name, email, cpf, phone,
      cep, address, redirect, fieldInvalid } = this.state;
    return (
      <div>
        <section>
          Revisao de produtos
          {products
            ? products.map((product, i) => (
              <div key={ i }>
                <h4>
                  {product.title}
                </h4>
              </div>
            )) : <> </>}
        </section>
        <form className="inputConteiner">
          <label htmlFor="#">
            Nome Completo
            <input
              type="text"
              data-testid="checkout-fullname"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="#">
            CPF
            <input
              type="text"
              data-testid="checkout-cpf"
              name="cpf"
              value={ cpf }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="#">
            Email
            <input
              type="text"
              data-testid="checkout-email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="#">
            Telefone
            <input
              type="text"
              data-testid="checkout-phone"
              name="phone"
              value={ phone }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="#">
            CEP
            <input
              type="text"
              data-testid="checkout-cep"
              name="cep"
              value={ cep }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="#">
            Endereço
            <input
              type="text"
              data-testid="checkout-address"
              name="address"
              value={ address }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="#">
            Complemento
            <input type="text" />
          </label>
          <label htmlFor="#">
            Número
            <input type="text" />
          </label>
          <label htmlFor="#">
            Cidade
            <input type="text" />
          </label>
          <label htmlFor="#">
            CPF
            <input type="text" />
          </label>
          <label htmlFor="#">
            Estado
            <select name="estado" id="estado">
              <option value="AC">AC</option>
              <option value="AL">AL</option>
              <option value="AP">AP</option>
              <option value="AM">AM</option>
              <option value="BA">BA</option>
              <option value="CE">CE</option>
              <option value="DF">DF</option>
              <option value="ES">ES</option>
              <option value="GO">GO</option>
              <option value="MA">MA</option>
              <option value="MG">MG</option>
              <option value="MS">MS</option>
              <option value="MT">MT</option>
              <option value="PA">PA</option>
              <option value="PB">PB</option>
              <option value="PR">PR</option>
              <option value="PE">PE</option>
              <option value="PI">PI</option>
              <option value="RJ">RJ</option>
              <option value="RN">RN</option>
              <option value="RS">RS</option>
              <option value="RO">RO</option>
              <option value="RR">RO</option>
              <option value="SC">SC</option>
              <option value="SE">SE</option>
              <option value="SP">SP</option>
              <option value="TO">TO</option>
            </select>
          </label>
          <section className="pagamento">
            <label htmlFor="#">
              Boleto
              <input
                type="radio"
                name="payment"
                data-testid="ticket-payment"
                value="boleto"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="#">
              Visa
              <input
                type="radio"
                name="payment"
                data-testid="visa-payment"
                value="visa"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="#">
              Master
              <input
                type="radio"
                name="payment"
                data-testid="master-payment"
                value="master"
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="#">
              Elo
              <input
                type="radio"
                name="payment"
                data-testid="elo-payment"
                value="elo"
                onChange={ this.handleChange }
              />
            </label>
          </section>
          <button data-testid="checkout-btn" type="submit" onClick={ this.clearCart }>
            Comprar
          </button>
          {redirect && <Redirect to="/" />}
          {fieldInvalid
            ? (
              <p data-testid="error-msg">
                Campos inválidos
              </p>
            )
            : <> </>}
        </form>
      </div>
    );
  }
}

export default Checkout;
